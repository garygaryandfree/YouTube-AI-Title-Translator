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

    Object.keys(cards).forEach(p => {
        cards[p].addEventListener('click', () => selectProvider(p));
    });

    // 切换模型版本：同步写入高级设置里的 url / model 输入框
    modelSelect.addEventListener('change', () => {
        const modelId = modelSelect.value;
        modelNameInput.value = modelId;
        apiUrlInput.value    = buildUrl(currentProvider, modelId);
    });

    // 初始化：读取已保存配置
    chrome.storage.local.get(
        ['customApiUrl', 'customApiKey', 'customModel', 'selectedProvider'],
        (result) => {
            const provider = result.selectedProvider || 'deepseek';
            updateUIState(provider, result.customModel);

            apiKeyInput.value = result.customApiKey || '';
            // 高级设置里的 url / model 优先用已保存值；否则按预设填默认
            apiUrlInput.value    = result.customApiUrl || buildUrl(provider, modelSelect.value);
            modelNameInput.value = result.customModel  || modelSelect.value;
        }
    );

    // 切换 provider：刷新卡片高亮、帮助链接、模型下拉，并重置高级输入
    function selectProvider(provider) {
        updateUIState(provider, null);
        const firstId = PRESETS[provider].models[0].id;
        modelNameInput.value = firstId;
        apiUrlInput.value    = buildUrl(provider, firstId);
        status.textContent   = `已切换为 ${provider} 配置`;
        setTimeout(() => status.textContent = '', 1500);
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

        chrome.storage.local.set({
            customApiUrl:     url,
            customApiKey:     key,
            customModel:      model,
            selectedProvider: currentProvider
        }, () => {
            status.textContent = "✅ 保存成功！请刷新 YouTube";
            status.style.color = "#2e7d32";
            saveBtn.textContent = "已保存";
            setTimeout(() => { saveBtn.textContent = "💾 保存配置"; }, 1500);
        });
    });
});
