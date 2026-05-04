// ================= 配置区 =================
let USER_CONFIG = { apiUrl: "", apiKey: "", model: "" };

// 🚫 敏感词黑名单
// 逻辑：标题命中后直接跳过，不发给 API，避免被风控拒绝。
// 注意：使用 \b 单词边界匹配，不再做 substring，避免误杀
//       （比如旧版本的 "Xi" 会误杀 "Mexico/Taxi"，"Party" 会误杀 "Birthday Party"）。
const SENSITIVE_WORDS = [
    // === 1. 政治/政党 ===
    "CCP",
    "CPC",
    "Communist Party",     // 旧版用裸 "Communist"/"Party" 误杀严重，改成完整短语
    "Politburo",
    "Regime",

    // === 2. 敏感人物 ===
    "Xi Jinping",          // 删除了裸 "Xi"（会误杀 Mexico/Taxi/Sixteen 等）
    "Mao Zedong",          // 删除了裸 "Mao"（会误杀 Maori/各种人名）
    "Dalai Lama",
    "Jiang Zemin",
    "Hu Jintao",

    // === 3. 敏感地区 ===
    "Taiwan",
    "Hong Kong",
    "Xinjiang",
    "Tibet",
    "Uyghur",
    "South China Sea",

    // === 4. 敏感事件/概念 ===
    "Tiananmen",
    "June 4",
    "Falun",
    "Cultural Revolution", // 旧版裸 "Revolution" 会误杀 Industrial/Tech/French Revolution
    "Protest",
    "Human Rights",
    "Democracy",
    "Censorship",
    "Dictator"
];

// 预编译为词边界正则，case-insensitive
const SENSITIVE_PATTERNS = SENSITIVE_WORDS.map(w =>
    new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
);
// =========================================

console.log("🚀 Gary插件 V7.0 已启动");

// ================= 持久化翻译缓存 =================
// 设计：原文 → {tag, cn, ts} 的 Map，启动时一次从 chrome.storage 加载，
// 命中直接渲染（0 token、0 网络）；写入时 debounce 500ms 落盘。
// LRU：插入时如已存在先 delete 再 set，把最近用的放到 Map 末尾；
// 超过 10000 条时弹出最早的 entry。
const CACHE_LIMIT = 10000;
const translationCache = new Map();
let cacheSaveTimer = null;

function loadCache() {
    chrome.storage.local.get(['translationCache'], (result) => {
        const arr = result.translationCache;
        if (Array.isArray(arr)) {
            arr.forEach(([k, v]) => translationCache.set(k, v));
            console.log(`💾 缓存已加载 ${translationCache.size} 条`);
        }
    });
}

function cacheGet(text) {
    const v = translationCache.get(text);
    if (v) {
        // LRU touch：移到末尾
        translationCache.delete(text);
        translationCache.set(text, v);
    }
    return v;
}

function cacheSet(text, result) {
    translationCache.delete(text);
    translationCache.set(text, { tag: result.tag, cn: result.cn, ts: Date.now() });
    while (translationCache.size > CACHE_LIMIT) {
        const oldest = translationCache.keys().next().value;
        translationCache.delete(oldest);
    }
    scheduleCacheSave();
}

function scheduleCacheSave() {
    if (cacheSaveTimer) clearTimeout(cacheSaveTimer);
    cacheSaveTimer = setTimeout(() => {
        const arr = Array.from(translationCache.entries());
        chrome.storage.local.set({ translationCache: arr });
        cacheSaveTimer = null;
    }, 500);
}

loadCache();
// =================================================

// --- 初始化配置 ---
// v6.2 起每个 provider 单独存配置：providerConfigs[provider] = {apiKey, apiUrl, model}
// 同时兼容 v6.0/6.1 的旧扁平结构 (customApiKey/Url/Model)
// 主开关状态（默认开启）
let ENABLED = true;

function applyConfigFromStorage(result) {
    ENABLED = result.enabled !== false;   // undefined 视为开启

    const provider = result.selectedProvider;
    const cfg = result.providerConfigs && provider ? result.providerConfigs[provider] : null;

    if (cfg && cfg.apiKey) {
        USER_CONFIG.apiUrl = cfg.apiUrl;
        USER_CONFIG.apiKey = cfg.apiKey;
        USER_CONFIG.model  = cfg.model;
        console.log("✅ 已加载配置 [", provider, "]:", USER_CONFIG.model, ENABLED ? '(开启)' : '(已暂停)');
    } else if (result.customApiKey) {
        // 旧版本回退
        USER_CONFIG.apiUrl = result.customApiUrl;
        USER_CONFIG.apiKey = result.customApiKey;
        USER_CONFIG.model  = result.customModel;
        console.log("✅ 已加载用户配置（旧格式）:", USER_CONFIG.model);
    }
}

function initConfig() {
    chrome.storage.local.get(
        ['enabled', 'providerConfigs', 'selectedProvider', 'customApiUrl', 'customApiKey', 'customModel'],
        applyConfigFromStorage
    );

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace !== 'local') return;
        // 任意 key 变化时，整体重读，简单稳妥
        chrome.storage.local.get(
            ['enabled', 'providerConfigs', 'selectedProvider', 'customApiUrl', 'customApiKey', 'customModel'],
            applyConfigFromStorage
        );
    });
}
initConfig();

// --- UI 创建函数 ---
function createSafeBadge(tagText, cnText, isMainTitle = false) {
    const container = document.createElement('div');
    container.className = 'gary-cn-box';
    if (isMainTitle) { container.style.marginBottom = "8px"; container.style.marginTop = "4px"; }

    const tagSpan = document.createElement('span');
    tagSpan.className = 'gary-tag';
    tagSpan.textContent = tagText;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'gary-cn-title';
    titleSpan.textContent = cnText;
    if (isMainTitle) { titleSpan.style.fontSize = "2.0rem"; titleSpan.style.lineHeight = "1.3"; }

    if (tagText === "未配置") titleSpan.style.color = "#d32f2f";

    container.appendChild(tagSpan);
    container.appendChild(titleSpan);
    return container;
}

// --- 🤖 AI 调用：通过 background SW ---
// v7.0 起 fetch 逻辑挪到 background.js，content script 只发消息。
// 好处：避免 YouTube 页面 CSP 拦截、所有 tab 共享一个翻译入口、
//       未来做并发限流和重试都集中在 SW 里。
async function fetchAiTranslation(text) {
    if (!USER_CONFIG.apiKey) return null;
    try {
        const reply = await chrome.runtime.sendMessage({
            type: 'translate',
            text,
            config: {
                apiUrl: USER_CONFIG.apiUrl,
                apiKey: USER_CONFIG.apiKey,
                model:  USER_CONFIG.model
            }
        });
        if (reply && reply.ok) return reply.result;
        return null;
    } catch (e) {
        console.error("[Gary] SW 通信失败:", e);
        return null;
    }
}

// 渲染辅助函数（批量翻译走相同的成功/失败渲染路径）
function renderSuccess(box, result) {
    const tag = box.querySelector('.gary-tag');
    const title = box.querySelector('.gary-cn-title');
    if (tag) tag.textContent = result.tag;
    if (title) title.textContent = result.cn;
}
function renderError(box) {
    const tag = box.querySelector('.gary-tag');
    const title = box.querySelector('.gary-cn-title');
    if (tag)   { tag.classList.add('gary-error');   tag.textContent = "❌"; }
    if (title) { title.classList.add('gary-error'); title.textContent = "翻译失败（按 F12 看 Console）"; }
    box.title = "请检查 API Key、模型名、余额；或敏感内容被风控";
}

// --- 页面扫描 + 批量翻译 ---
const BATCH_SIZE = 5;

async function process() {
    if (!ENABLED) return;
    const titles = document.querySelectorAll('#video-title, #video-title-link, h3 a, ytd-watch-metadata h1 yt-formatted-string');

    const pendingBatch = [];   // 缓存未命中、需要发 API 的项 [{text, box}]

    for (const el of titles) {
        if (el.getAttribute('data-gary-done')) continue;
        if (el.closest('ytd-comments') || el.closest('ytd-comment-renderer') || el.closest('#comments')) continue;

        const text = el.innerText.trim();
        if (!text || text.length < 3) continue;

        if (SENSITIVE_PATTERNS.some(re => re.test(text))) {
            el.setAttribute('data-gary-done', 'blocked');
            continue;
        }

        const hasJapanese = /[぀-ヿㇰ-ㇿ]/.test(text);
        const hasKorean   = /[가-힯]/.test(text);
        const hasThai     = /[฀-๿]/.test(text);
        const hasEnglish  = /[a-zA-Z]/.test(text);
        const hasChinese  = /[一-龥]/.test(text);

        let shouldTranslate = false;
        if (hasJapanese || hasKorean || hasThai) shouldTranslate = true;
        else if (hasChinese) shouldTranslate = false;
        else if (hasEnglish) shouldTranslate = true;
        if (!shouldTranslate) continue;

        el.setAttribute('data-gary-done', 'true');

        let targetElement = el;
        let isMainTitle = false;
        if (el.matches('ytd-watch-metadata h1 yt-formatted-string')) {
            isMainTitle = true;
        } else {
            const link = el.closest('a');
            if (link) targetElement = link;
        }
        const parent = targetElement.parentElement;
        if (!parent) continue;

        const cached = cacheGet(text);

        let tag = "未配置", cn = "请配置插件";
        if (cached) { tag = cached.tag; cn = cached.cn; }
        else if (USER_CONFIG.apiKey) { tag = "AI"; cn = "翻译中..."; }

        const box = createSafeBadge(tag, cn, isMainTitle);
        try {
            parent.insertBefore(box, targetElement);
            el.classList.add('gary-en-sub');
        } catch (e) { continue; }

        box.onclick = (e) => {
            e.preventDefault();
            if (!isMainTitle && targetElement.tagName === 'A') targetElement.click();
            else el.click();
        };

        if (cached) continue;                  // 命中缓存：已渲染好
        if (!USER_CONFIG.apiKey) continue;     // 没配置 Key：渲染"未配置"badge 后停下

        pendingBatch.push({ text, box });
    }

    if (pendingBatch.length === 0) return;

    // 切成 5 条/批，并行送给 SW 批量翻译
    const chunks = [];
    for (let i = 0; i < pendingBatch.length; i += BATCH_SIZE) {
        chunks.push(pendingBatch.slice(i, i + BATCH_SIZE));
    }
    await Promise.all(chunks.map(translateChunk));
}

async function translateChunk(chunk) {
    let reply;
    try {
        reply = await chrome.runtime.sendMessage({
            type: 'translateBatch',
            items: chunk.map(p => p.text),
            config: {
                apiUrl: USER_CONFIG.apiUrl,
                apiKey: USER_CONFIG.apiKey,
                model:  USER_CONFIG.model
            }
        });
    } catch (e) {
        console.error("[Gary] SW 通信失败:", e);
        chunk.forEach(p => renderError(p.box));
        return;
    }

    if (!reply || !reply.ok || !Array.isArray(reply.results)) {
        chunk.forEach(p => renderError(p.box));
        return;
    }

    chunk.forEach((p, i) => {
        const result = reply.results[i];
        if (result && result.tag && result.cn) {
            renderSuccess(p.box, result);
            cacheSet(p.text, result);
        } else {
            renderError(p.box);
        }
    });
}

// === 触发策略 ===
// 旧版本用 setInterval(process, 1000) 每秒强扫整个 DOM——CPU 浪费 + 易竞态。
// v7.0 改为 MutationObserver 监听 <ytd-app> 子树变化，200ms debounce 后执行 process。
// 这样：(1) 只在真有新视频卡片插入时才触发；(2) 触发更快，不用等下一次 1 秒轮询。
let processScheduled = false;
let processInFlight = false;
function scheduleProcess() {
    if (processScheduled || processInFlight) return;
    processScheduled = true;
    setTimeout(async () => {
        processScheduled = false;
        processInFlight = true;
        try { await process(); }
        finally { processInFlight = false; }
    }, 200);
}

function startObserver() {
    const root = document.querySelector('ytd-app') || document.body;
    if (!root) {
        // YouTube SPA 还没装载好，重试
        setTimeout(startObserver, 200);
        return;
    }
    const observer = new MutationObserver(() => scheduleProcess());
    observer.observe(root, { childList: true, subtree: true });
    console.log("👁  MutationObserver 已挂载");
    // 首次扫描（处理 observer 挂载之前已经存在的标题）
    scheduleProcess();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
} else {
    startObserver();
}