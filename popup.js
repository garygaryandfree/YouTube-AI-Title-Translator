// 预设参数库
const PRESETS = {
    deepseek: {
        url: "https://api.deepseek.com/chat/completions",
        model: "deepseek-chat",
        helpUrl: "https://platform.deepseek.com/api_keys",
        helpText: "去 DeepSeek 官网申请"
    },
    openai: {
        url: "https://api.openai.com/v1/chat/completions",
        model: "gpt-4o-mini",
        helpUrl: "https://platform.openai.com/api-keys",
        helpText: "去 OpenAI 官网申请"
    },
    google: {
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        model: "gemini-1.5-flash",
        helpUrl: "https://aistudio.google.com/app/apikey",
        helpText: "去 Google AI Studio 申请"
    }
};

let currentProvider = 'deepseek';

document.addEventListener('DOMContentLoaded', () => {
    const apiUrlInput = document.getElementById('apiUrl');
    const apiKeyInput = document.getElementById('apiKey');
    const modelNameInput = document.getElementById('modelName');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');
    const helpLinkContainer = document.getElementById('help-text');
    
    const cards = {
        deepseek: document.getElementById('card-deepseek'),
        openai: document.getElementById('card-openai'),
        google: document.getElementById('card-google')
    };

    // --- 核心修复：在这里手动添加点击监听，替代 HTML 里的 onclick ---
    cards.deepseek.addEventListener('click', () => selectProvider('deepseek'));
    cards.openai.addEventListener('click', () => selectProvider('openai'));
    cards.google.addEventListener('click', () => selectProvider('google'));
    // -----------------------------------------------------------

    // 初始化：读取配置
    chrome.storage.local.get(['customApiUrl', 'customApiKey', 'customModel', 'selectedProvider'], (result) => {
        if (result.customApiUrl) apiUrlInput.value = result.customApiUrl;
        if (result.customApiKey) apiKeyInput.value = result.customApiKey;
        if (result.customModel) modelNameInput.value = result.customModel;
        
        if (result.selectedProvider) {
            updateUIState(result.selectedProvider);
        } else {
            updateUIState('deepseek');
            apiUrlInput.value = PRESETS.deepseek.url;
            modelNameInput.value = PRESETS.deepseek.model;
        }
    });

    // 切换服务商逻辑
    function selectProvider(provider) {
        updateUIState(provider);
        apiUrlInput.value = PRESETS[provider].url;
        modelNameInput.value = PRESETS[provider].model;
        status.textContent = `已切换为 ${provider} 配置`;
        setTimeout(() => status.textContent = '', 1500);
    };

    function updateUIState(provider) {
        currentProvider = provider;
        
        // 更新卡片高亮
        Object.keys(cards).forEach(key => {
            if (key === provider) {
                cards[key].classList.add('active');
            } else {
                cards[key].classList.remove('active');
            }
        });

        // 更新链接
        const info = PRESETS[provider];
        helpLinkContainer.innerHTML = `没有 Key? <a href="${info.helpUrl}" target="_blank">${info.helpText}</a>`;
    }

    // 保存逻辑
    saveBtn.addEventListener('click', () => {
        const url = apiUrlInput.value.trim();
        const key = apiKeyInput.value.trim();
        const model = modelNameInput.value.trim();

        if (!key) {
            status.textContent = "❌ 必须要填 API Key";
            status.style.color = "#d32f2f";
            apiKeyInput.focus();
            return;
        }

        chrome.storage.local.set({
            customApiUrl: url,
            customApiKey: key,
            customModel: model,
            selectedProvider: currentProvider
        }, () => {
            status.textContent = "✅ 保存成功！请刷新 YouTube";
            status.style.color = "#2e7d32";
            saveBtn.textContent = "已保存";
            setTimeout(() => { saveBtn.textContent = "💾 保存配置"; }, 1500);
        });
    });
});