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
const CUSTOM_MODEL_VALUE = "__custom_model__";

const PRESETS = {
    openai: {
        url: "https://api.openai.com/v1/chat/completions",
        helpUrl: "https://platform.openai.com/api-keys",
        helpText: "去 OpenAI 官网申请",
        models: [
            { id: "gpt-5.5",      label: "GPT-5.5（旗舰）" },
            { id: "gpt-5.4-mini", label: "GPT-5.4 Mini（推荐）" },
            { id: "gpt-5.4",      label: "GPT-5.4" }
        ]
    },
    google: {
        url: "https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
        helpUrl: "https://aistudio.google.com/app/apikey",
        helpText: "去 Google AI Studio 申请",
        models: [
            { id: "gemini-3-pro-preview",   label: "Gemini 3 Pro Preview（最强）" },
            { id: "gemini-3-flash-preview", label: "Gemini 3 Flash Preview（推荐）" },
            { id: "gemini-2.5-flash",       label: "Gemini 2.5 Flash（稳定）" }
        ]
    },
    anthropic: {
        url: "https://api.anthropic.com/v1/messages",
        helpUrl: "https://console.anthropic.com/settings/keys",
        helpText: "去 Claude Console 申请",
        models: [
            { id: "claude-opus-4-7",   label: "Claude Opus 4.7（最强）" },
            { id: "claude-opus-4-6",   label: "Claude Opus 4.6" },
            { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6（推荐）" },
            { id: "claude-haiku-4-5",  label: "Claude Haiku 4.5（快）" }
        ]
    },
    deepseek: {
        url: "https://api.deepseek.com/chat/completions",
        helpUrl: "https://platform.deepseek.com/api_keys",
        helpText: "去 DeepSeek 官网申请",
        models: [
            { id: "deepseek-v4-flash", label: "V4 Flash（推荐，便宜快）" },
            { id: "deepseek-v4-pro",   label: "V4 Pro（更强）" },
            { id: "deepseek-chat",     label: "V3 Chat（兼容旧 Key）" }
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
            { id: "MiniMax-M2.5",           label: "M2.5（兼容）" }
        ]
    },
    zhipu: {
        url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
        helpUrl: "https://bigmodel.cn/usercenter/proj-mgmt/apikeys",
        helpText: "去智谱开放平台申请",
        models: [
            { id: "glm-5.1",       label: "GLM-5.1（推荐）" },
            { id: "glm-5.1-flash", label: "GLM-5.1 Flash（快）" },
            { id: "glm-4.6",       label: "GLM-4.6（稳定）" }
        ]
    },
    kimi: {
        url: "https://api.moonshot.cn/v1/chat/completions",
        helpUrl: "https://platform.kimi.com/console/api-keys",
        helpText: "去 Kimi 开放平台申请",
        models: [
            { id: "kimi-k2.6",          label: "Kimi K2.6（推荐）" },
            { id: "kimi-k2.6-turbo",    label: "Kimi K2.6 Turbo（快）" },
            { id: "kimi-k2.6-thinking", label: "Kimi K2.6 Thinking（推理）" }
        ]
    },
    // 自定义 OpenAI 兼容端点：让用户自己填 base URL 和 model 名，
    // 立刻能用 OpenRouter / SiliconFlow / 火山方舟 / 本地 Ollama / LM Studio 等。
    // 第一次保存某个新域名时会触发 chrome.permissions.request 弹一个原生权限框。
    custom: {
        url: "",
        helpUrl: "https://github.com/garygaryandfree/YouTube-AI-Title-Translator#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AB%AF%E7%82%B9",
        helpText: "查看自定义端点说明",
        models: []   // 空数组：UI 上显示自定义 URL / 模型名输入框
    }
};

let currentProvider = 'openai';

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
    const manualModelSection = document.getElementById('manualModelSection');
    const manualModelNameSlot = document.getElementById('manualModelNameSlot');
    const customMainSettings = document.getElementById('customMainSettings');
    const customApiUrlSlot  = document.getElementById('customApiUrlSlot');
    const customModelNameSlot = document.getElementById('customModelNameSlot');
    const apiUrlGroup       = document.getElementById('apiUrlGroup');
    const modelNameGroup    = document.getElementById('modelNameGroup');
    const apiKeyVisibility  = document.getElementById('apiKeyVisibility');

    const cards = {
        openai:   document.getElementById('card-openai'),
        google:   document.getElementById('card-google'),
        anthropic: document.getElementById('card-anthropic'),
        deepseek: document.getElementById('card-deepseek'),
        minimax:  document.getElementById('card-minimax'),
        zhipu:    document.getElementById('card-zhipu'),
        kimi:     document.getElementById('card-kimi'),
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

    // 切换模型版本：同步写入隐藏的 url / model 输入框，保存时统一读取
    modelSelect.addEventListener('change', () => {
        const modelId = modelSelect.value;
        const isManualModel = modelId === CUSTOM_MODEL_VALUE;
        const cfg = providerConfigs[currentProvider] || {};
        const savedManualModel = cfg.model && !isPresetModel(currentProvider, cfg.model) ? cfg.model : "";
        modelNameInput.value = isManualModel ? savedManualModel : modelId;
        apiUrlInput.value    = buildUrl(currentProvider, modelNameInput.value);
        updateModelNamePlacement(currentProvider, isManualModel);
    });

    modelNameInput.addEventListener('input', () => {
        if (currentProvider !== 'custom' && modelSelect.value === CUSTOM_MODEL_VALUE) {
            apiUrlInput.value = buildUrl(currentProvider, modelNameInput.value.trim());
        }
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

            const provider = PRESETS[result.selectedProvider] ? result.selectedProvider : 'openai';
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

    }

    function isPresetModel(provider, modelId) {
        const info = PRESETS[provider];
        return !!(info && info.models.some(m => m.id === modelId));
    }

    function updateModelNamePlacement(provider, showManualModel) {
        const isCustom = provider === 'custom';
        manualModelSection.style.display = !isCustom && showManualModel ? 'block' : 'none';

        if (isCustom) {
            customModelNameSlot.appendChild(modelNameGroup);
            return;
        }

        manualModelNameSlot.appendChild(modelNameGroup);
        if (showManualModel) {
            modelNameInput.focus();
            setStatus("请输入该服务商支持的模型 ID", "#69717f");
        }
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
        manualModelSection.style.display = 'none';
        apiUrlInput.placeholder = isCustom
            ? "例如：https://openrouter.ai/api/v1/chat/completions"
            : "";
        modelNameInput.placeholder = isCustom
            ? "例如：openai/gpt-5.4-mini、anthropic/claude-sonnet-4"
            : "填写服务商支持的模型 ID";

        if (!isCustom) {
            apiUrlGroup.remove();
            manualModelNameSlot.appendChild(modelNameGroup);
        }

        if (isCustom) {
            customApiUrlSlot.appendChild(apiUrlGroup);
            updateModelNamePlacement(provider, false);
        }

        modelSelect.innerHTML = '';

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

        const customModelOpt = document.createElement('option');
        customModelOpt.value = CUSTOM_MODEL_VALUE;
        customModelOpt.textContent = "其他（手动输入模型名）";
        if (preferredModelId && !matched) {
            customModelOpt.selected = true;
        }
        modelSelect.appendChild(customModelOpt);

        updateModelNamePlacement(provider, !!(preferredModelId && !matched));
    }

    function isLocalHttpEndpoint(u) {
        return u.protocol === 'http:' && (
            u.hostname === 'localhost' ||
            u.hostname === '127.0.0.1' ||
            u.hostname === '[::1]'
        );
    }

    function validateCustomEndpoint(url) {
        let u;
        try {
            u = new URL(url);
        } catch (e) {
            return { ok: false, message: "API Endpoint 格式不正确" };
        }

        if (u.protocol !== 'https:' && !isLocalHttpEndpoint(u)) {
            return {
                ok: false,
                message: "自定义端点必须使用 HTTPS；本机 localhost 调试可使用 HTTP"
            };
        }

        return { ok: true, url: u };
    }

    // 自定义端点保存前：申请该域名的 host_permissions
    async function ensureHostPermission(parsedUrl) {
        try {
            const origin = `${parsedUrl.protocol}//${parsedUrl.hostname}/*`;
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
            const endpoint = validateCustomEndpoint(url);
            if (!endpoint.ok) {
                setStatus(endpoint.message, "#d92d20");
                apiUrlInput.focus();
                return;
            }
            const granted = await ensureHostPermission(endpoint.url);
            if (!granted) {
                setStatus("未授予该域名访问权限，无法调用", "#d92d20");
                return;
            }
        } else if (!model) {
            setStatus("请填写模型名称，或从模型版本中选择一个预设", "#d92d20");
            modelNameInput.focus();
            return;
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
