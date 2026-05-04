// === Background Service Worker ===
// 负责发起 AI 翻译请求。content script 通过 sendMessage 把要翻译的文本和配置
// 传过来，SW 完成 HTTP 调用 + JSON 解析后回传结果。
//
// 为什么挪到 SW：
// 1) MV3 推荐做法，避免被 YouTube 页面 CSP 拦截 fetch
// 2) 所有 tab 共享一个翻译入口，方便后续做并发限制和重试
// 3) Network panel 里的请求归属为扩展，不污染 youtube.com 的网络面板

const TAG_ENUM = ["科技", "游戏", "音乐", "教程", "搞笑", "新闻", "财经", "生活", "体育", "影视", "美食", "其它"];

// 同 content.js 里的实现：括号计数提取首个完整闭合 JSON 对象，
// 处理 (1) 双 JSON 重复 (2) 散文包围 (3) 字符串内含 } 等病态返回
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

async function fetchAiTranslation(text, config) {
    if (!config || !config.apiKey) return null;

    const promptText = `Translate this YouTube title to simplified Chinese (Mandarin). Keep it catchy. Reply with EXACTLY ONE JSON object, no markdown, no prose, no repetition: {"tag":"<one of: ${TAG_ENUM.join("/")}>","cn":"中文标题"}. The "tag" MUST be one of those 12 categories, choose the closest match. Original: "${text}"`;

    let raw = "";
    let response;

    try {
        const isGoogle = config.apiUrl.includes("googleapis.com");

        if (isGoogle) {
            const urlWithKey = `${config.apiUrl}?key=${config.apiKey}`;
            response = await fetch(urlWithKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 2000,
                        responseMimeType: "application/json"
                    }
                })
            });
        } else {
            response = await fetch(config.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{
                        role: "system",
                        content: "You are a translator. Reply with exactly one JSON object and nothing else. Never repeat your output."
                    }, {
                        role: "user",
                        content: promptText
                    }],
                    temperature: 0.3,
                    max_tokens: 2000,
                    max_completion_tokens: 2000
                })
            });
        }

        const data = await response.json();
        if (!response.ok) {
            console.error("[Gary BG] API 返回错误", response.status, data);
            return null;
        }

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
            console.error("[Gary BG] 模型返回空内容", data);
            return null;
        }

        // 剥推理模型的 <think> 块（含被截断未闭合）+ markdown 围栏，
        // 再走括号计数提取首个完整 JSON
        const cleaned = raw
            .replace(/<think>[\s\S]*?<\/think>/g, "")
            .replace(/<think>[\s\S]*$/, "")
            .replace(/```json|```/g, "");
        const jsonStr = extractFirstJsonObject(cleaned);
        if (!jsonStr) {
            console.error("[Gary BG] 响应里找不到 JSON 对象。原文:", text, "模型返回:", raw);
            return null;
        }
        return JSON.parse(jsonStr);

    } catch (e) {
        console.error("[Gary BG] 翻译失败:", e, "原文:", text, "模型返回:", raw || "(无)");
    }
    return null;
}

// === 批量翻译：一次 prompt 翻多条，节省调用数和握手开销 ===
// 让模型返回 {"items":[{"i":0,"tag":"..","cn":".."}, ...]}，按 i 字段对齐回原数组。
// 这种"包一层 object"的设计比裸数组更稳健——可继续复用 extractFirstJsonObject。
async function fetchAiTranslationBatch(items, config) {
    if (!config || !config.apiKey) return items.map(() => null);
    if (items.length === 0) return [];

    const numbered = items.map((t, i) => ({ i, t }));
    const promptText = `Translate each YouTube title below to simplified Chinese (Mandarin). Keep titles catchy.
Return EXACTLY ONE JSON object: {"items":[{"i":<index>,"tag":"<category>","cn":"<中文标题>"},...]}
The "tag" of each item MUST be one of: ${TAG_ENUM.join("/")}. Choose the closest match.
The output array length MUST equal input length, and "i" MUST match input "i".
No markdown fence, no prose, no repetition.
Input: ${JSON.stringify(numbered)}`;

    let raw = "";
    let response;

    try {
        const isGoogle = config.apiUrl.includes("googleapis.com");

        if (isGoogle) {
            const urlWithKey = `${config.apiUrl}?key=${config.apiKey}`;
            response = await fetch(urlWithKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 4000,   // 批量需要更大上限
                        responseMimeType: "application/json"
                    }
                })
            });
        } else {
            response = await fetch(config.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{
                        role: "system",
                        content: "You are a translator. Reply with exactly one JSON object and nothing else."
                    }, {
                        role: "user",
                        content: promptText
                    }],
                    temperature: 0.3,
                    max_tokens: 4000,
                    max_completion_tokens: 4000
                })
            });
        }

        const data = await response.json();
        if (!response.ok) {
            console.error("[Gary BG] 批量 API 错误", response.status, data);
            return items.map(() => null);
        }

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
            console.error("[Gary BG] 批量返回空内容", data);
            return items.map(() => null);
        }

        const cleaned = raw
            .replace(/<think>[\s\S]*?<\/think>/g, "")
            .replace(/<think>[\s\S]*$/, "")
            .replace(/```json|```/g, "");
        const jsonStr = extractFirstJsonObject(cleaned);
        if (!jsonStr) {
            console.error("[Gary BG] 批量响应没找到 JSON 对象。模型返回:", raw);
            return items.map(() => null);
        }

        const parsed = JSON.parse(jsonStr);
        const arr = Array.isArray(parsed) ? parsed : parsed.items;
        if (!Array.isArray(arr)) {
            console.error("[Gary BG] 批量响应 items 不是数组:", parsed);
            return items.map(() => null);
        }

        // 按 i 对齐：模型返回顺序不一定保证，用索引匹配；缺失项 → null（会渲染 ❌）
        return items.map((_, idx) => {
            const found = arr.find(r => r && r.i === idx);
            if (found && found.tag && found.cn) {
                return { tag: found.tag, cn: found.cn };
            }
            return null;
        });

    } catch (e) {
        console.error("[Gary BG] 批量翻译失败:", e, "条数:", items.length, "模型返回:", raw || "(无)");
        return items.map(() => null);
    }
}

// === Message handler ===
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.type === 'translate') {
        fetchAiTranslation(msg.text, msg.config)
            .then(result => sendResponse({ ok: !!result, result }))
            .catch(e => sendResponse({ ok: false, error: String(e) }));
        return true;
    }
    if (msg && msg.type === 'translateBatch') {
        fetchAiTranslationBatch(msg.items, msg.config)
            .then(results => sendResponse({ ok: true, results }))
            .catch(e => sendResponse({ ok: false, error: String(e) }));
        return true;
    }
});

console.log("🚀 Gary BG SW 启动");
