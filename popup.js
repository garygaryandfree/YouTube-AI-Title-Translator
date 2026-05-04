if (!globalThis.chrome || !globalThis.chrome.storage || !globalThis.chrome.storage.local) {
    const previewStore = {};
    globalThis.chrome = {
        storage: {
            local: {
                get(keys, callback) {
                    const result = {};
                    (Array.isArray(keys) ? keys : Object.keys(keys || {})).forEach(key => {
                        if (Object.prototype.hasOwnProperty.call(previewStore, key)) {
                            result[key] = previewStore[key];
                        }
                    });
                    callback(result);
                },
                set(values, callback) {
                    Object.assign(previewStore, values);
                    if (callback) callback();
                }
            }
        },
        permissions: {
            request() {
                return Promise.resolve(true);
            }
        }
    };
}

// 预设参数库：每个 provider 配一个 url 模板 + 模型列表
// Gemini 的 url 含 {MODEL} 占位符，保存时按所选模型替换
const PRESETS = {
    deepseek: {
        url: "https://api.deepseek.com/chat/completions",
        helpUrl: "https://platform.deepseek.com/api_keys",
        helpText: "去 DeepSeek 官网申请",
        models: [
            { id: "deepseek-v4-flash", label: "V4 Flash（推荐，便宜快）" },
            { id: "deepseek-v4-pro",   label: "V4 Pro（更强，贵）" },
            { id: "deepseek-chat",     label: "V3 chat（旧版，兼容）" },
            { id: "deepseek-reasoner", label: "R1 reasoner（旧版，兼容）" }
        ]
    },
    openai: {
        url: "https://api.openai.com/v1/chat/completions",
        helpUrl: "https://platform.openai.com/api-keys",
        helpText: "去 OpenAI 官网申请",
        models: [
            { id: "gpt-4o-mini",  label: "4o-mini（性价比首选）" },
            { id: "gpt-4o",       label: "4o（更准但贵 10x）" },
            { id: "gpt-4.1-mini", label: "4.1-mini" }
        ]
    },
    google: {
        url: "https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
        helpUrl: "https://aistudio.google.com/app/apikey",
        helpText: "去 Google AI Studio 申请",
        models: [
            { id: "gemini-2.5-flash", label: "2.5 Flash（推荐）" },
            { id: "gemini-2.5-pro",   label: "2.5 Pro（贵）" },
            { id: "gemini-1.5-flash", label: "1.5 Flash（旧）" }
        ]
    },
    minimax: {
        // OpenAI 兼容端点
        url: "https://api.minimaxi.com/v1/chat/completions",
        helpUrl: "https://platform.minimaxi.com/user-center/basic-information/interface-key",
        helpText: "去 MiniMax 开放平台申请",
        // M2.7 是推理模型（带 <think> 链，慢），highspeed 才适合标题翻译这种短任务
        models: [
            { id: "MiniMax-M2.7-highspeed", label: "M2.7 高速（推荐，标题翻译用这个）" },
            { id: "MiniMax-M2.7",           label: "M2.7（推理模型，慢但更准）" },
            { id: "MiniMax-M2.5",           label: "M2.5" },
            { id: "MiniMax-M2.1",           label: "M2.1（旧版）" }
        ]
    },
    // 自定义 OpenAI 兼容端点：让用户自己填 base URL 和 model 名，
    // 立刻能用 OpenRouter / SiliconFlow / 火山方舟 / 本地 Ollama / LM Studio 等。
    // 第一次保存某个新域名时会触发 chrome.permissions.request 弹一个原生权限框。
    custom: {
        url: "",
        helpUrl: "https://github.com/garygaryandfree/YouTube-AI-Title-Translator#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AB%AF%E7%82%B9",
        helpText: "查看自定义端点说明",
        models: []   // 空数组：UI 上显示"请在下方高级设置填写"占位
    }
};

let currentProvider = 'deepseek';

function buildUrl(provider, modelId) {
    const tpl = PRESETS[provider].url;
    return tpl.includes('{MODEL}') ? tpl.replace('{MODEL}', modelId) : tpl;
}

document.addEventListener('DOMContentLoaded', () => {
    const apiUrlInput       = document.getElementById('apiUrl');
    const apiKeyInput       = document.getElementById('apiKey');
    const modelNameInput    = document.getElementById('modelName');
    const modelSelect       = document.getElementById('modelSelect');
    const saveBtn           = document.getElementById('saveBtn');
    const status            = document.getElementById('status');
    const helpLinkContainer = document.getElementById('help-text');
    const masterToggle      = document.getElementById('masterToggle');
    const modelSection      = document.getElementById('modelSection');
    const customMainSettings = document.getElementById('customMainSettings');
    const customApiUrlSlot  = document.getElementById('customApiUrlSlot');
    const customModelNameSlot = document.getElementById('customModelNameSlot');
    const advancedSettings  = document.getElementById('advancedSettings');
    const advancedContent   = document.getElementById('advancedContent');
    const apiUrlGroup       = document.getElementById('apiUrlGroup');
    const modelNameGroup    = document.getElementById('modelNameGroup');
    const apiKeyVisibility  = document.getElementById('apiKeyVisibility');

    const cards = {
        deepseek: document.getElementById('card-deepseek'),
        openai:   document.getElementById('card-openai'),
        google:   document.getElementById('card-google'),
        minimax:  document.getElementById('card-minimax'),
        custom:   document.getElementById('card-custom')
    };

    // 内存里的「按 provider 分别存」配置；从 storage 加载，Save 时写回
    let providerConfigs = {};

    // 主开关：默认开启，切换立即落盘
    function setSaveButtonLabel(label) {
        saveBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <path d="M17 21v-8H7v8"></path>
                <path d="M7 3v5h8"></path>
            </svg>
            ${label}
        `;
    }

    function setStatus(message, color) {
        status.textContent = message;
        status.style.color = color || "";
    }

    chrome.storage.local.get(['enabled'], (result) => {
        masterToggle.checked = result.enabled !== false;   // undefined 视为 true
    });
    masterToggle.addEventListener('change', () => {
        chrome.storage.local.set({ enabled: masterToggle.checked });
        setStatus(
            masterToggle.checked ? "翻译已开启，刷新 YouTube 后生效" : "翻译已暂停",
            masterToggle.checked ? "#1d9a57" : "#69717f"
        );
        setTimeout(() => setStatus(""), 2000);
    });

    Object.keys(cards).forEach(p => {
        cards[p].addEventListener('click', () => selectProvider(p));
        cards[p].addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectProvider(p);
            }
        });
    });

    if (apiKeyVisibility) {
        apiKeyVisibility.addEventListener('click', () => {
            const shouldShow = apiKeyInput.type === 'password';
            apiKeyInput.type = shouldShow ? 'text' : 'password';
            apiKeyVisibility.setAttribute('aria-pressed', shouldShow ? 'true' : 'false');
            apiKeyVisibility.title = shouldShow ? '隐藏 API Key' : '显示 API Key';
        });
    }

    // 切换模型版本：同步写入高级设置里的 url / model 输入框
    modelSelect.addEventListener('change', () => {
        const modelId = modelSelect.value;
        modelNameInput.value = modelId;
        apiUrlInput.value    = buildUrl(currentProvider, modelId);
    });

    // 初始化：读取已保存配置（含旧版本扁平结构的迁移）
    chrome.storage.local.get(
        ['providerConfigs', 'selectedProvider', 'customApiUrl', 'customApiKey', 'customModel'],
        (result) => {
            providerConfigs = result.providerConfigs || {};

            // 旧版本（v6.0/6.1）只有一份 customApiKey/Url/Model，迁移到对应 provider 名下
            if (!result.providerConfigs && result.customApiKey && result.selectedProvider) {
                providerConfigs[result.selectedProvider] = {
                    apiKey: result.customApiKey,
                    apiUrl: result.customApiUrl,
                    model:  result.customModel
                };
            }

            const provider = result.selectedProvider || 'deepseek';
            hydrateForm(provider);
        }
    );

    // 把指定 provider 的存储配置渲染到表单
    function hydrateForm(provider) {
        const cfg     = providerConfigs[provider] || {};
        // 自定义 provider 没有预设模型，从 cfg 读，没有就空字符串
        const presetFirst = PRESETS[provider].models[0];
        const modelId = cfg.model || (presetFirst ? presetFirst.id : '');

        updateUIState(provider, modelId);
        apiKeyInput.value    = cfg.apiKey || '';
        modelNameInput.value = modelId;
        apiUrlInput.value    = cfg.apiUrl || (provider === 'custom' ? '' : buildUrl(provider, modelId));

        // 自定义模式下把 URL / 模型名放到主区，避免 Key 和必填项上下割裂
        if (advancedSettings) advancedSettings.open = false;
    }

    // 切换 provider：用那个 provider 自己存过的 key/url/model 重新填表
    function selectProvider(provider) {
        hydrateForm(provider);
        const hasKey = !!(providerConfigs[provider] && providerConfigs[provider].apiKey);
        setStatus(hasKey
            ? `已切换为 ${provider}，已读取保存的 Key`
            : `已切换为 ${provider}，还未配置 Key`);
        setTimeout(() => setStatus(""), 1800);
    }

    function updateUIState(provider, preferredModelId) {
        currentProvider = provider;

        Object.keys(cards).forEach(key => {
            cards[key].classList.toggle('active', key === provider);
            cards[key].setAttribute('aria-pressed', key === provider ? 'true' : 'false');
        });

        const info = PRESETS[provider];
        helpLinkContainer.innerHTML =
            `没有 Key? <a href="${info.helpUrl}" target="_blank" rel="noopener noreferrer">${info.helpText}</a>`;

        const isCustom = provider === 'custom';
        modelSection.style.display = isCustom ? 'none' : '';
        customMainSettings.style.display = isCustom ? 'block' : 'none';
        advancedSettings.style.display = isCustom ? 'none' : '';
        apiUrlInput.placeholder = isCustom
            ? "例如：https://openrouter.ai/api/v1/chat/completions"
            : "";
        modelNameInput.placeholder = isCustom
            ? "例如：openai/gpt-4o-mini、deepseek/deepseek-chat"
            : "";

        if (isCustom) {
            customApiUrlSlot.appendChild(apiUrlGroup);
            customModelNameSlot.appendChild(modelNameGroup);
        } else {
            advancedContent.appendChild(apiUrlGroup);
            advancedContent.appendChild(modelNameGroup);
        }

        // 重建模型下拉
        modelSelect.innerHTML = '';

        // 自定义 provider 隐藏下拉，但仍保留一个占位 option，避免切回时状态丢失
        if (info.models.length === 0) {
            const opt = document.createElement('option');
            opt.value       = preferredModelId || '';
            opt.textContent = preferredModelId
                ? `${preferredModelId}（自定义）`
                : "（请填写自定义模型名）";
            opt.selected = true;
            modelSelect.appendChild(opt);
            return;
        }

        let matched = false;
        info.models.forEach(m => {
            const opt = document.createElement('option');
            opt.value       = m.id;
            opt.textContent = m.label;
            if (preferredModelId && m.id === preferredModelId) {
                opt.selected = true;
                matched = true;
            }
            modelSelect.appendChild(opt);
        });
        // 如果用户在高级设置里手填了一个非预设模型，保留为"自定义"选项
        if (preferredModelId && !matched) {
            const opt = document.createElement('option');
            opt.value       = preferredModelId;
            opt.textContent = `${preferredModelId}（自定义）`;
            opt.selected    = true;
            modelSelect.appendChild(opt);
        }
    }

    // 自定义端点保存前：申请该域名的 host_permissions
    async function ensureHostPermission(url) {
        try {
            const u = new URL(url);
            const origin = `${u.protocol}//${u.hostname}/*`;
            return await chrome.permissions.request({ origins: [origin] });
        } catch (e) {
            console.error("[Gary] URL 解析失败:", e);
            return false;
        }
    }

    saveBtn.addEventListener('click', async () => {
        const url   = apiUrlInput.value.trim();
        const key   = apiKeyInput.value.trim();
        const model = modelNameInput.value.trim();

        if (!key) {
            setStatus("必须填写 API Key", "#d92d20");
            apiKeyInput.focus();
            return;
        }

        // 自定义端点：URL 和 model 也必填，并申请该域名访问权限
        if (currentProvider === 'custom') {
            if (!url || !model) {
                setStatus("自定义端点需要填写 URL 和模型名", "#d92d20");
                return;
            }
            const granted = await ensureHostPermission(url);
            if (!granted) {
                setStatus("未授予该域名访问权限，无法调用", "#d92d20");
                return;
            }
        }

        // 只更新当前 provider 那一项，其它 provider 的配置原样保留
        providerConfigs[currentProvider] = { apiKey: key, apiUrl: url, model: model };

        chrome.storage.local.set({
            providerConfigs,
            selectedProvider: currentProvider,
            // 同步写一份扁平字段，方便老版 content.js 兼容（升级后可移除）
            customApiUrl:     url,
            customApiKey:     key,
            customModel:      model
        }, () => {
            setStatus("保存成功，请刷新 YouTube 页面", "#1d9a57");
            setSaveButtonLabel("已保存");
            setTimeout(() => { setSaveButtonLabel("保存设置"); }, 1500);
        });
    });
});
