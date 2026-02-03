// ================= 配置区 =================
let USER_CONFIG = { apiUrl: "", apiKey: "", model: "" };

// 🚫 敏感词黑名单 (关键修改：换成了英文！)
// 逻辑：只要英文标题里包含这些词，就不发给 API，直接忽略。
const SENSITIVE_WORDS = [
    // === 1. 核心政治/政党 (建议保留) ===
    "CCP",              // 中国共产党 (英文缩写)
    "CPC",              // 中国共产党 (官方英文缩写)
    "Communist",        // 共产主义/共产党
    "Party",            // 政党 (通常指代党派)
    "Regime",           // 政权 (西方媒体常含贬义)
    "Politburo",        // 政治局

    // === 2. 敏感人物 (建议保留) ===
    "Xi Jinping",       // 习近平
    "Xi",               // 习 (姓氏单独出现也可能触发)
    "Mao",              // 毛泽东
    "Mao Zedong",       // 毛泽东 (全名)
    "Dalai Lama",       // 达赖喇嘛
    "Jiang Zemin",      // 江泽民
    "Hu Jintao",        // 胡锦涛

    // === 3. 敏感地区/地缘政治 (DeepSeek 风控高发区) ===
    "Taiwan",           // 台湾 (极易触发风控)
    "Hong Kong",        // 香港 (涉及政治/抗议时易触发)
    "Xinjiang",         // 新疆 (涉及人权时易触发)
    "Tibet",            // 西藏
    "Uyghur",           // 维吾尔
    "South China Sea",  // 南海

    // === 4. 敏感事件/概念 (建议保留) ===
    "Tiananmen",        // 天安门 (涉及六四)
    "June 4",           // 六四
    "Falun",            // 法轮功
    "Revolution",       // 革命 (如文革 Cultural Revolution)
    "Protest",          // 抗议/游行
    "Human Rights",     // 人权
    "Democracy",        // 民主
    "Censorship",       // 审查
    "Dictator",         // 独裁者
];
// =========================================

console.log("🚀 Gary插件 V6.0 (三合一全能版) 已启动！");

// --- 初始化配置 ---
function initConfig() {
    chrome.storage.local.get(['customApiUrl', 'customApiKey', 'customModel'], (result) => {
        if (result.customApiKey) {
            USER_CONFIG.apiUrl = result.customApiUrl;
            USER_CONFIG.apiKey = result.customApiKey;
            USER_CONFIG.model = result.customModel;
            console.log("✅ 已加载用户配置:", USER_CONFIG.model);
        }
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local') {
            if (changes.customApiUrl) USER_CONFIG.apiUrl = changes.customApiUrl.newValue;
            if (changes.customApiKey) USER_CONFIG.apiKey = changes.customApiKey.newValue;
            if (changes.customModel) USER_CONFIG.model = changes.customModel.newValue;
        }
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

// --- 🤖 AI 调用核心 (支持 Google & OpenAI/DeepSeek) ---
async function fetchAiTranslation(text) {
    if (!USER_CONFIG.apiKey) return null;

    try {
        let response;
        // 判断是不是 Google 的 API
        const isGoogle = USER_CONFIG.apiUrl.includes("googleapis.com");

        if (isGoogle) {
            // === Google Gemini 特殊逻辑 ===
            const urlWithKey = `${USER_CONFIG.apiUrl}?key=${USER_CONFIG.apiKey}`;
            response = await fetch(urlWithKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a translator. Translate this YouTube title to simplified Chinese (Mandarin). Keep it catchy. Return strictly JSON format: {"tag": "Category(2-4 chars)", "cn": "Chinese Title"}. Original Title: "${text}"`
                        }]
                    }]
                })
            });
        } else {
            // === DeepSeek / OpenAI 通用逻辑 ===
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
                        content: "You are a translator. Translate the YouTube title to simplified Chinese (Mandarin). Keep it catchy. Return strictly JSON format: {\"tag\": \"Category(2-4 chars)\", \"cn\": \"Chinese Title\"}."
                    }, {
                        role: "user",
                        content: `Original Title: "${text}"`
                    }],
                    temperature: 1.3,
                    response_format: { type: "json_object" }
                })
            });
        }

        const data = await response.json();

        // 解析返回结果
        let raw = "";
        if (isGoogle) {
            // Google 返回格式
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                raw = data.candidates[0].content.parts[0].text;
            }
        } else {
            // OpenAI 返回格式
            if (data.choices && data.choices[0] && data.choices[0].message) {
                raw = data.choices[0].message.content;
            }
        }

        if (!raw) return null;
        raw = raw.replace(/```json|```/g, "").trim();
        return JSON.parse(raw);

    } catch (e) {
        // console.error(e); 
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

        // 敏感词拦截
        if (SENSITIVE_WORDS.some(w => text.toLowerCase().includes(w.toLowerCase()))) {
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
            if (result) {
                const newTag = box.querySelector('.gary-tag');
                const newTitle = box.querySelector('.gary-cn-title');
                if(newTag) newTag.textContent = result.tag;
                if(newTitle) newTitle.textContent = result.cn;
            } else {
                box.remove();
                el.classList.remove('gary-en-sub');
            }
        }
    }
}

setInterval(process, 1000);
process();