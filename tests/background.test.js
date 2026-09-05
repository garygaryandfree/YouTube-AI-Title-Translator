const test = require('node:test');
const assert = require('node:assert/strict');

// background.js 顶层会注册 chrome.runtime.onMessage，先打桩再 require
globalThis.chrome = { runtime: { onMessage: { addListener() {} } } };
const bg = require('../background.js');

// ---------- JSON 解析器（病态模型输出） ----------

test('parseSingleTranslationFromText: 纯 JSON 对象', () => {
    const r = bg.parseSingleTranslationFromText('{"tag":"科技","translatedTitle":"你好世界"}');
    assert.deepEqual(r, { tag: '科技', translatedTitle: '你好世界' });
});

test('parseSingleTranslationFromText: markdown 围栏', () => {
    const r = bg.parseSingleTranslationFromText('```json\n{"tag":"游戏","translatedTitle":"这个游戏太好玩了"}\n```');
    assert.equal(r.translatedTitle, '这个游戏太好玩了');
    assert.equal(r.tag, '游戏');
});

test('parseSingleTranslationFromText: 散文包围 + think 标签', () => {
    const raw = '<think>用户在测试我</think>Sure! Here you go: {"tag":"音乐","translatedTitle":"新歌发布"} Hope this helps!';
    const r = bg.parseSingleTranslationFromText(raw);
    assert.equal(r.translatedTitle, '新歌发布');
    assert.equal(r.tag, '音乐');
});

test('parseSingleTranslationFromText: 双 JSON 重复也能取到一个有效结果', () => {
    const raw = '{"tag":"科技","translatedTitle":"甲"}{"tag":"科技","translatedTitle":"甲"}';
    const r = bg.parseSingleTranslationFromText(raw);
    assert.equal(r.translatedTitle, '甲');
});

test('parseSingleTranslationFromText: 备用字段名', () => {
    assert.equal(bg.parseSingleTranslationFromText('{"translated_title":"hola","category":"影视"}').translatedTitle, 'hola');
    assert.equal(bg.parseSingleTranslationFromText('{"cn":"你好"}').translatedTitle, '你好');
});

test('parseSingleTranslationFromText: 非法 tag 归一为 其它', () => {
    const r = bg.parseSingleTranslationFromText('{"tag":"体育新闻","translatedTitle":"x"}');
    assert.equal(r.tag, '其它');
});

test('parseSingleTranslationFromText: 完全无 JSON 返回 null', () => {
    assert.equal(bg.parseSingleTranslationFromText('I cannot translate this.'), null);
});

test('parseBatchTranslationsFromText: items 包装 + 乱序按 i 对齐', () => {
    const raw = '{"items":[{"i":1,"tag":"游戏","translatedTitle":"乙"},{"i":0,"tag":"科技","translatedTitle":"甲"}]}';
    const arr = bg.parseBatchTranslationsFromText(raw, 2);
    assert.equal(bg.findBatchResult(arr, 0).translatedTitle, '甲');
    assert.equal(bg.findBatchResult(arr, 1).translatedTitle, '乙');
});

test('parseBatchTranslationsFromText: 裸数组 + 位置兜底', () => {
    const arr = bg.parseBatchTranslationsFromText('[{"translatedTitle":"甲"},{"translatedTitle":"乙"}]', 2);
    assert.equal(bg.findBatchResult(arr, 0).translatedTitle, '甲');
    assert.equal(bg.findBatchResult(arr, 1).translatedTitle, '乙');
});

test('parseBatchTranslationsFromText: 数字键对象', () => {
    const arr = bg.parseBatchTranslationsFromText('{"0":{"translatedTitle":"甲"},"1":{"translatedTitle":"乙"}}', 2);
    assert.equal(bg.findBatchResult(arr, 0).translatedTitle, '甲');
    assert.equal(bg.findBatchResult(arr, 1).translatedTitle, '乙');
});

test('parseBatchTranslationsFromText: 垃圾输入返回 null', () => {
    assert.equal(bg.parseBatchTranslationsFromText('totally broken', 2), null);
});

// ---------- 错误分类 ----------

test('classifyApiError: 状态码与正文优先级', () => {
    assert.equal(bg.classifyApiError(401, {}).type, 'auth');
    assert.equal(bg.classifyApiError(403, {}).type, 'auth');
    assert.equal(bg.classifyApiError(429, {}).type, 'quota');
    assert.equal(bg.classifyApiError(402, {}).type, 'quota');
    assert.equal(bg.classifyApiError(404, {}).type, 'model');
    assert.equal(bg.classifyApiError(500, {}).type, 'service');
    // 正文里的 "invalid api key" 优先于 400 → model 的判定
    assert.equal(bg.classifyApiError(400, { error: { message: 'invalid api key provided' } }).type, 'auth');
});

test('classifyApiError: 400 只有明确指向模型才归为模型错误', () => {
    assert.equal(bg.classifyApiError(400, { error: { message: 'Model Not Exist' } }).type, 'model');
    // 参数类 400（如 max_tokens 不被支持）不该误导成"模型名可能错误"
    assert.equal(bg.classifyApiError(400, { error: { message: 'Unsupported parameter: max_tokens' } }).type, 'service');
});

// ---------- 请求体构造（OpenAI 兼容性回归） ----------

test('buildChatCompletionsBody: api.openai.com 只发 max_completion_tokens，不发 max_tokens/temperature', () => {
    const body = bg.buildChatCompletionsBody(
        { apiUrl: 'https://api.openai.com/v1/chat/completions', model: 'gpt-5.5' },
        'prompt', 500, 'system'
    );
    assert.equal(body.max_completion_tokens, 500);
    assert.ok(!('max_tokens' in body), 'gpt-5/o 系列对 max_tokens 直接 400');
    assert.ok(!('temperature' in body), 'reasoning 模型拒绝自定义 temperature');
});

test('buildChatCompletionsBody: OpenAI 兼容服务保持 max_tokens + temperature', () => {
    const body = bg.buildChatCompletionsBody(
        { apiUrl: 'https://api.deepseek.com/chat/completions', model: 'deepseek-chat' },
        'prompt', 500, 'system'
    );
    assert.equal(body.max_tokens, 500);
    assert.equal(body.temperature, 0.3);
    assert.ok(!('max_completion_tokens' in body));
    assert.ok(!('thinking' in body), 'V3 系列 deepseek-chat 不发思考开关');
});

test('buildChatCompletionsBody: DeepSeek V4 官方接口关闭思考模式', () => {
    const body = bg.buildChatCompletionsBody(
        { apiUrl: 'https://api.deepseek.com/chat/completions', model: 'deepseek-v4-flash' },
        'prompt', 500, 'system'
    );
    assert.deepEqual(body.thinking, { type: 'disabled' });
    assert.equal(body.max_tokens, 500);
    assert.equal(body.temperature, 0.3);
    assert.ok(!('max_completion_tokens' in body));

    // 自定义端点即使模型同名也不发未知参数，避免严格服务端 400
    const custom = bg.buildChatCompletionsBody(
        { apiUrl: 'https://example.com/v1/chat/completions', model: 'deepseek-v4-flash' },
        'prompt', 500, 'system'
    );
    assert.ok(!('thinking' in custom));
});

// ---------- 并发队列 ----------

test('enqueueTranslation: 并发上限为 3 且全部 resolve', async () => {
    let running = 0;
    let maxRunning = 0;
    const tasks = Array.from({ length: 8 }, () => bg.enqueueTranslation(async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await new Promise(r => setTimeout(r, 10));
        running--;
        return { ok: true };
    }));
    const replies = await Promise.all(tasks);
    assert.equal(maxRunning, 3);
    assert.ok(replies.every(r => r.ok));
});

test('enqueueTranslation: 任务抛异常也会 resolve（不会挂起队列）', async () => {
    const reply = await bg.enqueueTranslation(async () => { throw new Error('boom'); });
    assert.equal(reply.ok, false);
    assert.equal(reply.error.type, 'network');
});

// ---------- 批量翻译 + 去重（stub fetch 端到端） ----------

const TEST_CONFIG = {
    apiUrl: 'https://api.deepseek.com/chat/completions',
    apiKey: 'test-key',
    model: 'deepseek-chat',
    targetLanguage: 'zh-Hans'
};

function stubFetch(t, handler) {
    const calls = [];
    const original = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
        calls.push({ url, options });
        return handler(JSON.parse(options.body), calls.length);
    };
    t.after(() => { globalThis.fetch = original; });
    return calls;
}

function chatReply(content) {
    return { ok: true, status: 200, json: async () => ({ choices: [{ message: { content } }] }) };
}

test('fetchAiTranslationBatchDedup: 重复文本只发一次请求且结果对齐', async (t) => {
    const calls = stubFetch(t, () => chatReply(JSON.stringify({
        items: [
            { i: 0, tag: '科技', translatedTitle: '你好' },
            { i: 1, tag: '游戏', translatedTitle: '世界' }
        ]
    })));
    const reply = await bg.fetchAiTranslationBatchDedup(['Hello', 'Hello', 'World'], TEST_CONFIG);
    assert.equal(calls.length, 1, '重复文本应去重为一次批量请求');
    assert.equal(reply.ok, true);
    assert.deepEqual(reply.results.map(r => r && r.translatedTitle), ['你好', '你好', '世界']);
});

test('fetchAiTranslationBatchDedup: 批量缺项时单条重试补齐', async (t) => {
    const calls = stubFetch(t, (body) => {
        const prompt = body.messages[1].content;
        if (prompt.includes('Input:')) {
            // 批量只回 i:0，缺 i:1
            return chatReply(JSON.stringify({ items: [{ i: 0, tag: '科技', translatedTitle: '甲' }] }));
        }
        // 单条重试
        return chatReply(JSON.stringify({ tag: '音乐', translatedTitle: '乙' }));
    });
    const reply = await bg.fetchAiTranslationBatchDedup(['Title A', 'Title B'], TEST_CONFIG);
    assert.equal(calls.length, 2);
    assert.deepEqual(reply.results.map(r => r && r.translatedTitle), ['甲', '乙']);
    assert.equal(reply.ok, true);
});

test('fetchAiTranslationBatchDedup: 单条批量解析失败时单条重试补齐', async (t) => {
    const calls = stubFetch(t, (body) => {
        const prompt = body.messages[1].content;
        if (prompt.includes('Input:')) {
            // 批量返回垃圾文本，整体解析失败
            return chatReply('抱歉，我无法完成这个请求');
        }
        // 单条重试返回合法 JSON
        return chatReply(JSON.stringify({ tag: '科技', translatedTitle: '甲' }));
    });
    const reply = await bg.fetchAiTranslationBatchDedup(['Title A'], TEST_CONFIG);
    assert.equal(calls.length, 2, '单条批量失败后应再发起一次单条重试');
    assert.equal(reply.ok, true);
    assert.deepEqual(reply.results.map(r => r && r.translatedTitle), ['甲']);
});

test('fetchAiTranslationBatchDedup: 网络失败重试一次后报错但不挂起', async (t) => {
    const calls = stubFetch(t, () => { throw new Error('socket hangup'); });
    const reply = await bg.fetchAiTranslationBatchDedup(['Title A'], TEST_CONFIG);
    assert.equal(calls.length, 4, '批量 2 次尝试 + 单条重试 2 次尝试（fetchWithTimeout 各重试一次）');
    assert.equal(reply.ok, false);
    assert.deepEqual(reply.results, [null]);
    assert.equal(reply.error.type, 'network');
});

test('fetchAiTranslationBatchDedup: HTTP 429 归类为 quota', async (t) => {
    const calls = stubFetch(t, () => ({ ok: false, status: 429, json: async () => ({ error: { message: 'rate limit' } }) }));
    const reply = await bg.fetchAiTranslationBatchDedup(['Title A'], TEST_CONFIG);
    assert.equal(reply.ok, false);
    assert.equal(reply.error.type, 'quota');
    assert.equal(calls.length, 1, 'quota 不可恢复，不触发单条重试');
});

test('fetchAiTranslationBatchDedup: 缺 apiKey 直接 auth 错误，不发请求', async (t) => {
    const calls = stubFetch(t, () => { throw new Error('should not be called'); });
    const reply = await bg.fetchAiTranslationBatchDedup(['Title A'], { model: 'm' });
    assert.equal(calls.length, 0);
    assert.equal(reply.error.type, 'auth');
});
