// === Background Service Worker ===
// 负责发起 AI 翻译请求。content script 通过 sendMessage 把要翻译的文本和配置
// 传过来，SW 完成 HTTP 调用 + JSON 解析后回传结果。
//
// 为什么挪到 SW：
// 1) MV3 推荐做法，避免被 YouTube 页面 CSP 拦截 fetch
// 2) 所有 tab 共享一个翻译入口，方便后续做并发限制和重试
// 3) Network panel 里的请求归属为扩展，不污染 youtube.com 的网络面板

const TAG_ENUM = ["科技", "游戏", "音乐", "教程", "搞笑", "新闻", "财经", "生活", "体育", "影视", "美食", "其它"];
const TAG_GUIDE = [
    "科技: gadgets, AI, software, engineering, science, product launches",
    "游戏: video games, game streamers, esports, game reviews",
    "音乐: songs, albums, concerts, instruments, music creators",
    "教程: how-to, step-by-step guides, courses, explainers with a teaching intent",
    "搞笑: comedy, pranks, memes, humorous clips",
    "新闻: current events, politics, public affairs, major global or local updates",
    "财经: business, economy, investing, markets, companies, money",
    "生活: travel, family, relationships, daily routines, personal stories, general lifestyle",
    "体育: sports matches, athletes, fitness competitions, sports analysis",
    "影视: movies, TV, anime, trailers, actors, film criticism",
    "美食: cooking, restaurants, recipes, food reviews",
    "其它: unclear, mixed, or none of the above"
].join("; ");
const SYSTEM_PROMPT = "You are a precise YouTube title translator. Reply with exactly one JSON object and nothing else.";
const MAX_CONCURRENT_TRANSLATIONS = 3;
const translationQueue = [];
let activeTranslations = 0;
const inflightTextResults = new Map();

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

function extractJsonObjectCandidates(s) {
    const candidates = [];
    for (let start = s.indexOf('{'); start >= 0; start = s.indexOf('{', start + 1)) {
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
                if (depth === 0) {
                    candidates.push(s.slice(start, i + 1));
                    break;
                }
            }
        }
    }
    return candidates;
}

function getApiType(config) {
    const apiUrl = config && config.apiUrl ? config.apiUrl : "";
    if (apiUrl.includes("googleapis.com")) return "google";
    if (apiUrl.includes("anthropic.com")) return "anthropic";
    return "openai-compatible";
}

function extractTextFromResponse(data, apiType) {
    if (apiType === "google") {
        return data && data.candidates && data.candidates[0] && data.candidates[0].content
            ? data.candidates[0].content.parts[0].text
            : "";
    }
    if (apiType === "anthropic") {
        const textBlock = data && Array.isArray(data.content)
            ? data.content.find(part => part && part.type === "text" && part.text)
            : null;
        return textBlock ? textBlock.text : "";
    }
    return data && data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : "";
}

function normalizeTag(tag) {
    return TAG_ENUM.includes(tag) ? tag : "其它";
}

function normalizeTranslationResult(result) {
    if (!result) return null;
    const cn = result.cn || result.title || result.translation || result.text || result.zh || result.chinese;
    if (!cn) return null;
    return { tag: normalizeTag(result.tag || result.category || result.type), cn: String(cn).trim() };
}

function extractBatchArray(parsed, expectedLength) {
    if (Array.isArray(parsed)) return parsed;
    if (!parsed || typeof parsed !== "object") return null;

    const directArray = parsed.items || parsed.results || parsed.translations || parsed.data;
    if (Array.isArray(directArray)) return directArray;

    if (parsed.item && typeof parsed.item === "object") return [parsed.item];
    if (parsed.result && typeof parsed.result === "object" && !Array.isArray(parsed.result)) return [parsed.result];
    if (parsed.translation && typeof parsed.translation === "object") return [parsed.translation];

    const numericEntries = Object.keys(parsed)
        .filter(key => /^\d+$/.test(key) && parsed[key] && typeof parsed[key] === "object")
        .sort((a, b) => Number(a) - Number(b))
        .map(key => Object.assign({ i: Number(key) }, parsed[key]));
    if (numericEntries.length > 0) return numericEntries;

    if (expectedLength === 1 && (parsed.cn || parsed.tag)) return [parsed];
    return null;
}

function findBatchResult(arr, idx) {
    return arr.find(r => r && (r.i === idx || r.index === idx || r.id === idx || r.idx === idx)) || arr[idx];
}

function parseSingleTranslationFromText(raw) {
    const cleaned = raw
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .replace(/```json|```/g, "");
    const searchTexts = [cleaned, raw];

    for (const text of searchTexts) {
        const candidates = extractJsonObjectCandidates(text);
        for (let i = candidates.length - 1; i >= 0; i--) {
            try {
                const result = normalizeTranslationResult(JSON.parse(candidates[i]));
                if (result) return result;
            } catch (e) {}
        }
    }
    return null;
}

function parseBatchTranslationsFromText(raw, expectedLength) {
    const cleaned = raw
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .replace(/```json|```/g, "");
    const searchTexts = [cleaned, raw];

    for (const text of searchTexts) {
        const candidates = extractJsonObjectCandidates(text);
        for (let i = candidates.length - 1; i >= 0; i--) {
            try {
                const parsed = JSON.parse(candidates[i]);
                const arr = extractBatchArray(parsed, expectedLength);
                if (Array.isArray(arr)) {
                    return arr;
                }
            } catch (e) {}
        }
    }
    return null;
}

function makeError(type, message, detail) {
    return { type, message, detail };
}

function classifyApiError(status, data) {
    const raw = JSON.stringify(data || {});
    const lower = raw.toLowerCase();
    if (status === 401 || status === 403 || lower.includes("invalid api key") || lower.includes("unauthorized")) {
        return makeError("auth", "Key 无效", { status, data });
    }
    if (status === 402 || status === 429 || lower.includes("quota") || lower.includes("balance") || lower.includes("rate limit")) {
        return makeError("quota", "余额不足或被限流", { status, data });
    }
    if (status === 400 || status === 404 || lower.includes("model") || lower.includes("not found")) {
        return makeError("model", "模型名可能错误", { status, data });
    }
    return makeError("service", "网络或服务商异常", { status, data });
}

function getFallbackErrorForMissingItem(batchReply) {
    return batchReply && batchReply.error
        ? batchReply.error
        : makeError("parse", "模型返回格式异常");
}

function enqueueTranslation(work) {
    return new Promise((resolve) => {
        translationQueue.push({ work, resolve });
        drainTranslationQueue();
    });
}

function drainTranslationQueue() {
    while (activeTranslations < MAX_CONCURRENT_TRANSLATIONS && translationQueue.length > 0) {
        const task = translationQueue.shift();
        activeTranslations++;
        task.work()
            .then(task.resolve)
            .catch(error => task.resolve({ ok: false, error: makeError("network", "网络或服务商异常", String(error)) }))
            .finally(() => {
                activeTranslations--;
                drainTranslationQueue();
            });
    }
}

function getRequestKey(text, config) {
    config = config || {};
    return [config.apiUrl || "", config.model || "", text].join("\n");
}

function buildChatCompletionsBody(config, promptText, maxTokens, systemPrompt) {
    const body = {
        model: config.model,
        messages: [{
            role: "system",
            content: systemPrompt
        }, {
            role: "user",
            content: promptText
        }],
        temperature: 0.3,
        max_tokens: maxTokens
    };

    // OpenAI 新模型使用 max_completion_tokens；多数 OpenAI 兼容服务只认 max_tokens。
    if (config.apiUrl.includes("api.openai.com")) {
        body.max_completion_tokens = maxTokens;
    }

    return body;
}

async function readJsonResponse(response) {
    try {
        return await response.json();
    } catch (e) {
        return { error: { message: "Response is not valid JSON" } };
    }
}

async function fetchAiTranslation(text, config) {
    if (!config || !config.apiKey) {
        return { ok: false, error: makeError("auth", "Key 无效") };
    }

    const promptText = `Translate this YouTube title to simplified Chinese (Mandarin). Keep it natural, accurate, and readable as a Chinese title.
Return EXACTLY ONE JSON object, no markdown, no prose, no repetition: {"tag":"<one of: ${TAG_ENUM.join("/")}>","cn":"中文标题"}.
Tag rules: ${TAG_GUIDE}.
Choose the core topic of the title. Do not classify by a single incidental word. If uncertain or mixed, use 生活 or 其它.
Original: ${JSON.stringify(text)}`;

    let raw = "";
    let response;

    try {
        const apiType = getApiType(config);

        if (apiType === "google") {
            const urlWithKey = `${config.apiUrl}?key=${config.apiKey}`;
            response = await fetch(urlWithKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 500,
                        responseMimeType: "application/json"
                    }
                })
            });
        } else if (apiType === "anthropic") {
            response = await fetch(config.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": config.apiKey,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({
                    model: config.model,
                    system: SYSTEM_PROMPT,
                    messages: [{
                        role: "user",
                        content: promptText
                    }],
                    temperature: 0.3,
                    max_tokens: 500
                })
            });
        } else {
            response = await fetch(config.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.apiKey}`
                },
                body: JSON.stringify(buildChatCompletionsBody(
                    config,
                    promptText,
                    500,
                    SYSTEM_PROMPT
                ))
            });
        }

        const data = await readJsonResponse(response);
        if (!response.ok) {
            console.error("[Gary BG] API 返回错误", response.status, data);
            return { ok: false, error: classifyApiError(response.status, data) };
        }

        raw = extractTextFromResponse(data, apiType);

        if (!raw) {
            console.error("[Gary BG] 模型返回空内容", data);
            return { ok: false, error: makeError("empty", "网络或服务商异常", data) };
        }

        const result = parseSingleTranslationFromText(raw);
        if (!result) {
            console.error("[Gary BG] 响应里找不到 JSON 对象。原文:", text, "模型返回:", raw);
            return { ok: false, error: makeError("parse", "网络或服务商异常", raw) };
        }
        return { ok: true, result };

    } catch (e) {
        console.error("[Gary BG] 翻译失败:", e, "原文:", text, "模型返回:", raw || "(无)");
    }
    return { ok: false, error: makeError("network", "网络或服务商异常") };
}

// === 批量翻译：一次 prompt 翻多条，节省调用数和握手开销 ===
// 让模型返回 {"items":[{"i":0,"tag":"..","cn":".."}, ...]}，按 i 字段对齐回原数组。
// 这种"包一层 object"的设计比裸数组更稳健——可继续复用 extractFirstJsonObject。
async function fetchAiTranslationBatch(items, config) {
    if (!config || !config.apiKey) {
        return { ok: false, results: items.map(() => null), error: makeError("auth", "Key 无效") };
    }
    if (items.length === 0) return { ok: true, results: [] };

    const numbered = items.map((t, i) => ({ i, t }));
    const maxTokens = Math.min(1200, 180 + items.length * 90);
    const promptText = `Translate each YouTube title below to simplified Chinese (Mandarin). Keep titles natural, accurate, and readable as Chinese titles.
Return EXACTLY ONE JSON object: {"items":[{"i":<index>,"tag":"<category>","cn":"<中文标题>"},...]}
The "tag" of each item MUST be one of: ${TAG_ENUM.join("/")}.
Tag rules: ${TAG_GUIDE}.
Choose each title's core topic. Do not classify by a single incidental word. If uncertain or mixed, use 生活 or 其它.
The output array length MUST equal input length, and "i" MUST match input "i".
No markdown fence, no prose, no repetition.
Input: ${JSON.stringify(numbered)}`;

    let raw = "";
    let response;

    try {
        const apiType = getApiType(config);

        if (apiType === "google") {
            const urlWithKey = `${config.apiUrl}?key=${config.apiKey}`;
            response = await fetch(urlWithKey, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: maxTokens,
                        responseMimeType: "application/json"
                    }
                })
            });
        } else if (apiType === "anthropic") {
            response = await fetch(config.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": config.apiKey,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({
                    model: config.model,
                    system: "You are a translator. Reply with exactly one JSON object and nothing else.",
                    messages: [{
                        role: "user",
                        content: promptText
                    }],
                    temperature: 0.3,
                    max_tokens: maxTokens
                })
            });
        } else {
            response = await fetch(config.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${config.apiKey}`
                },
                body: JSON.stringify(buildChatCompletionsBody(
                    config,
                    promptText,
                    maxTokens,
                    SYSTEM_PROMPT
                ))
            });
        }

        const data = await readJsonResponse(response);
        if (!response.ok) {
            console.error("[Gary BG] 批量 API 错误", response.status, data);
            const error = classifyApiError(response.status, data);
            return { ok: false, results: items.map(() => null), error };
        }

        raw = extractTextFromResponse(data, apiType);
        if (!raw) {
            console.error("[Gary BG] 批量返回空内容", data);
            return { ok: false, results: items.map(() => null), error: makeError("empty", "网络或服务商异常", data) };
        }

        const arr = parseBatchTranslationsFromText(raw, items.length);
        if (!Array.isArray(arr)) {
            console.error("[Gary BG] 批量响应没找到 JSON 对象。模型返回:", raw);
            return { ok: false, results: items.map(() => null), error: makeError("parse", "网络或服务商异常", raw) };
        }

        // 按 i 对齐：模型返回顺序不一定保证，用索引匹配；缺失项 → null（会渲染 ❌）
        const results = items.map((_, idx) => {
            const found = findBatchResult(arr, idx);
            return normalizeTranslationResult(found);
        });
        return { ok: true, results };

    } catch (e) {
        console.error("[Gary BG] 批量翻译失败:", e, "条数:", items.length, "模型返回:", raw || "(无)");
        return { ok: false, results: items.map(() => null), error: makeError("network", "网络或服务商异常", String(e)) };
    }
}

async function fetchAiTranslationBatchDedup(items, config) {
    const promises = [];
    const uniqueItems = [];
    const uniqueKeys = [];
    const localSeen = new Map();

    items.forEach((text, index) => {
        const key = getRequestKey(text, config);
        if (localSeen.has(key)) {
            promises[index] = localSeen.get(key);
            return;
        }
        if (inflightTextResults.has(key)) {
            const promise = inflightTextResults.get(key);
            localSeen.set(key, promise);
            promises[index] = promise;
            return;
        }
        let resolveDeferred;
        const promise = new Promise(resolve => { resolveDeferred = resolve; });
        inflightTextResults.set(key, promise);
        localSeen.set(key, promise);
        promises[index] = promise;
        uniqueItems.push(text);
        uniqueKeys.push({ key, resolve: resolveDeferred });
    });

    if (uniqueItems.length > 0) {
        enqueueTranslation(async () => {
            const batchReply = await fetchAiTranslationBatch(uniqueItems, config);
            const resolvedItems = batchReply.results ? batchReply.results.slice() : uniqueItems.map(() => null);
            const itemErrors = uniqueItems.map((_, i) => {
                return resolvedItems[i] ? null : getFallbackErrorForMissingItem(batchReply);
            });

            const missingIndexes = resolvedItems
                .map((result, i) => result ? -1 : i)
                .filter(i => i >= 0);

            if (missingIndexes.length > 0 && uniqueItems.length > 1) {
                await Promise.all(missingIndexes.map(async (i) => {
                    const retry = await fetchAiTranslation(uniqueItems[i], config);
                    if (retry && retry.ok && retry.result) {
                        resolvedItems[i] = retry.result;
                        itemErrors[i] = null;
                    } else {
                        itemErrors[i] = retry && retry.error ? retry.error : itemErrors[i];
                    }
                }));
            }

            uniqueKeys.forEach((entry, i) => {
                const result = resolvedItems[i] || null;
                const itemError = result ? null : itemErrors[i];
                entry.resolve({ result, error: itemError });
                inflightTextResults.delete(entry.key);
            });
            return {
                ok: resolvedItems.some(Boolean),
                results: resolvedItems,
                errors: itemErrors,
                error: itemErrors.find(Boolean) || null
            };
        });
    }

    const settled = await Promise.all(promises);
    const results = settled.map(item => item && item.result ? item.result : null);
    const errors = settled.map(item => item && item.error ? item.error : null);
    const firstError = settled.find(item => item && item.error);
    return {
        ok: results.some(Boolean),
        results,
        errors,
        error: firstError ? firstError.error : null
    };
}

async function fetchAiTranslationQueued(text, config) {
    const reply = await fetchAiTranslationBatchDedup([text], config);
    return {
        ok: !!(reply.results && reply.results[0]),
        result: reply.results ? reply.results[0] : null,
        error: reply.error
    };
}

// === Message handler ===
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.type === 'translate') {
        fetchAiTranslationQueued(msg.text, msg.config)
            .then(reply => sendResponse(reply))
            .catch(e => sendResponse({ ok: false, error: String(e) }));
        return true;
    }
    if (msg && msg.type === 'translateBatch') {
        fetchAiTranslationBatchDedup(msg.items, msg.config)
            .then(reply => sendResponse(reply))
            .catch(e => sendResponse({ ok: false, error: String(e) }));
        return true;
    }
});

console.log("🚀 Gary BG SW 启动");
