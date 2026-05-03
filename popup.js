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
        models: [
            { id: "MiniMax-M2.7",           label: "M2.7（推荐，最新）" },
            { id: "MiniMax-M2.7-highspeed", label: "M2.7 高速（更快、更便宜）" },
            { id: "MiniMax-M2.5",           label: "M2.5" },
            { id: "MiniMax-M2.1",           label: "M2.1（旧版）" }
        ]
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

    const cards = {
        deepseek: document.getElementById('card-deepseek'),
        openai:   document.getElementById('card-openai'),
        google:   document.getElementById('card-google'),
        minimax:  document.getElementById('card-minimax')
    };

    // 内存里的「按 provider 分别存」配置；从 storage 加载，Save 时写回
    let providerConfigs = {};

    Object.keys(cards).forEach(p => {
        cards[p].addEventListener('click', () => selectProvider(p));
    });

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
        const modelId = cfg.model || PRESETS[provider].models[0].id;

        updateUIState(provider, modelId);
        apiKeyInput.value    = cfg.apiKey || '';
        modelNameInput.value = modelId;
        apiUrlInput.value    = cfg.apiUrl || buildUrl(provider, modelId);
    }

    // 切换 provider：用那个 provider 自己存过的 key/url/model 重新填表
    function selectProvider(provider) {
        hydrateForm(provider);
        const hasKey = !!(providerConfigs[provider] && providerConfigs[provider].apiKey);
        status.textContent = hasKey
            ? `已切换为 ${provider}（含已保存 Key）`
            : `已切换为 ${provider}（未配置 Key）`;
        setTimeout(() => status.textContent = '', 1800);
    }

    function updateUIState(provider, preferredModelId) {
        currentProvider = provider;

        Object.keys(cards).forEach(key => {
            cards[key].classList.toggle('active', key === provider);
        });

        const info = PRESETS[provider];
        helpLinkContainer.innerHTML =
            `没有 Key? <a href="${info.helpUrl}" target="_blank" rel="noopener noreferrer">${info.helpText}</a>`;

        // 重建模型下拉
        modelSelect.innerHTML = '';
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

    saveBtn.addEventListener('click', () => {
        const url   = apiUrlInput.value.trim();
        const key   = apiKeyInput.value.trim();
        const model = modelNameInput.value.trim();

        if (!key) {
            status.textContent = "❌ 必须要填 API Key";
            status.style.color = "#d32f2f";
            apiKeyInput.focus();
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
            status.textContent = "✅ 保存成功！请刷新 YouTube";
            status.style.color = "#2e7d32";
            saveBtn.textContent = "已保存";
            setTimeout(() => { saveBtn.textContent = "💾 保存配置"; }, 1500);
        });
    });
});
