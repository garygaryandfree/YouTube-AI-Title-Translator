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

console.log("🚀 Gary插件 V6.2 已启动");

// --- 初始化配置 ---
// v6.2 起每个 provider 单独存配置：providerConfigs[provider] = {apiKey, apiUrl, model}
// 同时兼容 v6.0/6.1 的旧扁平结构 (customApiKey/Url/Model)
function applyConfigFromStorage(result) {
    const provider = result.selectedProvider;
    const cfg = result.providerConfigs && provider ? result.providerConfigs[provider] : null;

    if (cfg && cfg.apiKey) {
        USER_CONFIG.apiUrl = cfg.apiUrl;
        USER_CONFIG.apiKey = cfg.apiKey;
        USER_CONFIG.model  = cfg.model;
        console.log("✅ 已加载配置 [", provider, "]:", USER_CONFIG.model);
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
        ['providerConfigs', 'selectedProvider', 'customApiUrl', 'customApiKey', 'customModel'],
        applyConfigFromStorage
    );

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace !== 'local') return;
        // 任意 key 变化时，整体重读，简单稳妥
        chrome.storage.local.get(
            ['providerConfigs', 'selectedProvider', 'customApiUrl', 'customApiKey', 'customModel'],
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

// 提取响应文本里的第一个完整闭合 JSON 对象。
// 用括号计数（且字符串内的 } 不计数），处理三类病态返回：
//   1) "{...}{...}"  —— MiniMax M2.7 偶发把 JSON 输出两遍
//   2) "前言... {...} 结尾..."  —— 模型加散文/解释
//   3) `{ "cn": "}" }`  —— 字符串里含 }，不能被误判为对象结束
function extractFirstJsonObject(s) {
    const start = s.indexOf('{');
    if (start < 0) return null;
    let depth = 0, inStr = false, escape = false;
    for (let i = start; i < s.length; i++) {
        const c = s[i];
        if (escape) { escape = false; continue; }
        if (c === '\\') { escape = true; continue; }
        if (c === '"') { inStr = !inStr; continue; }
        if (inStr) continue;
        if (c === '{') depth++;
        else if (c === '}') {
            depth--;
            if (depth === 0) return s.slice(start, i + 1);
        }
    }
    return null;
}

// --- 🤖 AI 调用核心 ---
// 注意：去掉了 response_format: {type:"json_object"}，因为 MiniMax 等 OpenAI 兼容
//       端点不一定支持，发了反而会被 4xx 拒绝。改用 prompt 强约束 + 容错解析。
async function fetchAiTranslation(text) {
    if (!USER_CONFIG.apiKey) return null;

    const promptText = `You are a translator. Translate this YouTube title to simplified Chinese (Mandarin). Keep it catchy. Reply with EXACTLY ONE JSON object, no markdown, no prose, no repetition: {"tag":"中文分类(2-4字)","cn":"中文标题"}. Original: "${text}"`;

    let raw = "";
    let response;

    try {
        const isGoogle = USER_CONFIG.apiUrl.includes("googleapis.com");

        if (isGoogle) {
            const urlWithKey = `${USER_CONFIG.apiUrl}?key=${USER_CONFIG.apiKey}`;
            response = await fetch(urlWithKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 100,
                        responseMimeType: "application/json"
                    }
                })
            });
        } else {
            // OpenAI 兼容端点：DeepSeek / OpenAI / MiniMax 共用
            response = await fetch(USER_CONFIG.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${USER_CONFIG.apiKey}`
                },
                body: JSON.stringify({
                    model: USER_CONFIG.model,
                    messages: [{
                        role: "system",
                        content: "You are a translator. Reply with exactly one JSON object and nothing else. Never repeat your output."
                    }, {
                        role: "user",
                        content: promptText
                    }],
                    temperature: 0.3,
                    // 留 2000 token 是为了照顾 MiniMax M2.7 等推理模型——
                    // 它们会先输出 <think>...</think> 思考块再给 JSON，token 不够会卡死在思考中
                    max_tokens: 2000,
                    max_completion_tokens: 2000   // MiniMax 文档用的字段名
                })
            });
        }

        const data = await response.json();

        if (!response.ok) {
            console.error("[Gary] API 返回错误", response.status, data);
            return null;
        }

        // 提取响应文本
        if (isGoogle) {
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                raw = data.candidates[0].content.parts[0].text;
            }
        } else {
            if (data.choices && data.choices[0] && data.choices[0].message) {
                raw = data.choices[0].message.content;
            }
        }

        if (!raw) {
            console.error("[Gary] 模型返回空内容", data);
            return null;
        }

        // 推理模型（如 MiniMax M2.7、DeepSeek reasoner）会先输出 <think>...</think>
        // 思考块再给最终答案，要先剥掉，包括被截断的未闭合 think
        const cleaned = raw
            .replace(/<think>[\s\S]*?<\/think>/g, "")  // 完整闭合
            .replace(/<think>[\s\S]*$/, "")            // 被截断没闭合
            .replace(/```json|```/g, "");
        const jsonStr = extractFirstJsonObject(cleaned);
        if (!jsonStr) {
            console.error("[Gary] 响应里找不到 JSON 对象。原文:", text, "模型返回:", raw);
            return null;
        }
        return JSON.parse(jsonStr);

    } catch (e) {
        console.error("[Gary] 翻译失败:", e, "原文:", text, "模型返回:", raw || "(无)");
    }
    return null;
}

// --- 页面扫描逻辑 ---
async function process() {
    const titles = document.querySelectorAll('#video-title, #video-title-link, h3 a, ytd-watch-metadata h1 yt-formatted-string');

    for (const el of titles) {
        if (el.getAttribute('data-gary-done')) continue;
        if (el.closest('ytd-comments') || el.closest('ytd-comment-renderer') || el.closest('#comments')) continue;

        const text = el.innerText.trim();
        if (!text || text.length < 3) continue;

        // 敏感词拦截（词边界匹配，避免 substring 误杀）
        if (SENSITIVE_PATTERNS.some(re => re.test(text))) {
            el.setAttribute('data-gary-done', 'blocked');
            continue;
        }

        // 语言判断
        const hasJapanese = /[\u3040-\u30ff\u31f0-\u31ff]/.test(text);
        const hasKorean = /[\uac00-\ud7af]/.test(text);
        const hasThai = /[\u0e00-\u0e7f]/.test(text);
        const hasEnglish = /[a-zA-Z]/.test(text);
        const hasChinese = /[\u4e00-\u9fa5]/.test(text);

        let shouldTranslate = false;
        if (hasJapanese || hasKorean || hasThai) shouldTranslate = true;
        else if (hasChinese) shouldTranslate = false;
        else if (hasEnglish) shouldTranslate = true;

        if (!shouldTranslate) continue;

        el.setAttribute('data-gary-done', 'true');

        // 插入位置
        let targetElement = el; 
        let isMainTitle = false;
        if (el.matches('ytd-watch-metadata h1 yt-formatted-string')) {
            isMainTitle = true;
            targetElement = el; 
        } else {
            const link = el.closest('a');
            if (link) targetElement = link;
        }

        const parent = targetElement.parentElement;
        if (!parent) continue;

        // UI 渲染
        let tag = "未配置"; 
        let cn = "请配置插件"; 
        if (USER_CONFIG.apiKey) { tag = "AI"; cn = "翻译中..."; }

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

        if (USER_CONFIG.apiKey) {
            const result = await fetchAiTranslation(text);
            const newTag = box.querySelector('.gary-tag');
            const newTitle = box.querySelector('.gary-cn-title');
            if (result) {
                if (newTag) newTag.textContent = result.tag;
                if (newTitle) newTitle.textContent = result.cn;
            } else {
                // 失败时不再静默 remove —— 改为显式报错，避免"几秒后变回英文"的迷惑
                if (newTag) {
                    newTag.classList.add('gary-error');
                    newTag.textContent = "❌";
                }
                if (newTitle) {
                    newTitle.classList.add('gary-error');
                    newTitle.textContent = "翻译失败（按 F12 看 Console）";
                }
                box.title = "请检查 API Key、模型名、余额；或敏感内容被风控";
            }
        }
    }
}

setInterval(process, 1000);
process();