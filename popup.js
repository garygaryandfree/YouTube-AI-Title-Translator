if (!globalThis.chrome || !globalThis.chrome.storage || !globalThis.chrome.storage.local) {
    const previewStore = {};
    globalThis.chrome = {
        storage: {
            local: {
                get(keys, callback) {
                    const result = {};
                    if (Array.isArray(keys)) {
                        keys.forEach(key => {
                            if (Object.prototype.hasOwnProperty.call(previewStore, key)) result[key] = previewStore[key];
                        });
                    } else if (keys && typeof keys === "object") {
                        Object.keys(keys).forEach(key => {
                            result[key] = Object.prototype.hasOwnProperty.call(previewStore, key)
                                ? previewStore[key]
                                : keys[key];
                        });
                    }
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
        },
        runtime: {
            lastError: null,
            sendMessage(message, callback) {
                if (callback) callback({ ok: false, errorCode: "preview" });
            }
        }
    };
}

const CUSTOM_MODEL_VALUE = "__custom_model__";
const DEFAULT_UI_LANGUAGE = "en";
const DEFAULT_TARGET_LANGUAGE = "en";

const UI_LANGUAGES = [
    { code: "zh-Hans", nativeName: "简体中文", shortName: "ZH", htmlLang: "zh-CN", dir: "ltr" },
    { code: "en", nativeName: "English", shortName: "EN", htmlLang: "en", dir: "ltr" },
    { code: "ja", nativeName: "日本語", shortName: "JA", htmlLang: "ja", dir: "ltr" },
    { code: "ko", nativeName: "한국어", shortName: "KO", htmlLang: "ko", dir: "ltr" },
    { code: "th", nativeName: "ไทย", shortName: "TH", htmlLang: "th", dir: "ltr" },
    { code: "es", nativeName: "Español", shortName: "ES", htmlLang: "es", dir: "ltr" },
    { code: "fr", nativeName: "Français", shortName: "FR", htmlLang: "fr", dir: "ltr" },
    { code: "de", nativeName: "Deutsch", shortName: "DE", htmlLang: "de", dir: "ltr" },
    { code: "pt", nativeName: "Português", shortName: "PT", htmlLang: "pt", dir: "ltr" },
    { code: "id", nativeName: "Bahasa Indonesia", shortName: "ID", htmlLang: "id", dir: "ltr" },
    { code: "vi", nativeName: "Tiếng Việt", shortName: "VI", htmlLang: "vi", dir: "ltr" },
    { code: "ru", nativeName: "Русский", shortName: "RU", htmlLang: "ru", dir: "ltr" },
    { code: "ar", nativeName: "العربية", shortName: "AR", htmlLang: "ar", dir: "rtl" },
    { code: "hi", nativeName: "हिन्दी", shortName: "HI", htmlLang: "hi", dir: "ltr" }
];

const TARGET_LANGUAGES = [
    { code: "zh-Hans", nativeName: "简体中文", englishName: "Simplified Chinese" },
    { code: "zh-Hant", nativeName: "繁體中文", englishName: "Traditional Chinese" },
    { code: "en", nativeName: "English", englishName: "English" },
    { code: "ja", nativeName: "日本語", englishName: "Japanese" },
    { code: "ko", nativeName: "한국어", englishName: "Korean" },
    { code: "th", nativeName: "ไทย", englishName: "Thai" },
    { code: "es", nativeName: "Español", englishName: "Spanish" },
    { code: "fr", nativeName: "Français", englishName: "French" },
    { code: "de", nativeName: "Deutsch", englishName: "German" },
    { code: "pt", nativeName: "Português", englishName: "Portuguese" },
    { code: "id", nativeName: "Bahasa Indonesia", englishName: "Indonesian" },
    { code: "vi", nativeName: "Tiếng Việt", englishName: "Vietnamese" }
];

const UI_TEXT = {
    en: {
        appTitle: "AI Title Translator",
        brandSubtitle: "AI model settings",
        quickActions: "Quick actions",
        openDocs: "Open project docs",
        masterLabel: "Translation",
        masterDesc: "Automatically translate YouTube video titles",
        languageTitle: "1. Translation language",
        uiLanguageLabel: "Interface language",
        targetLanguageLabel: "Translate titles into",
        providerTitle: "2. Choose AI provider",
        modelTitle: "3. Model settings",
        modelVersionLabel: "Model version",
        providerCustom: "Custom",
        customEndpointLabel: "Custom endpoint",
        apiEndpointLabel: "API endpoint",
        modelNameLabel: "Model name",
        apiKeyPlaceholder: "Paste your API key...",
        toggleKey: "Show or hide API Key",
        saveSettings: "Save settings",
        testConfig: "Test configuration",
        testingConfig: "Testing current configuration...",
        testPassed: "Configuration works. Sample translation received.",
        testFailed: "Test failed. Check the key, model, endpoint, or provider quota.",
        previewTestUnavailable: "Configuration test only works from the installed extension popup, not a file preview.",
        saved: "Saved",
        feedback: "Feedback",
        supportDeveloper: "Support developer",
        localKeyChip: "API Key stays local",
        originalChip: "Original title preserved",
        customAiChip: "Custom AI setup",
        deepseekRecommended: "REC",
        privacyNote: "v8.0.2 | Stored only in this browser. No data is uploaded to the developer.",
        noKey: "No key?",
        helpOpenAI: "Get one from OpenAI",
        helpGoogle: "Get one from Google AI Studio",
        helpAnthropic: "Get one from Claude Console",
        helpDeepSeek: "Get one from DeepSeek API Platform",
        helpMiniMax: "Get one from MiniMax API Platform",
        helpZhipu: "Get one from Z.AI",
        helpKimi: "Get one from Kimi API Platform",
        helpCustom: "View custom endpoint guide",
        enabled: "Translation is on. Refresh YouTube to apply.",
        paused: "Translation paused",
        switchedSaved: "Switched to {provider}. Saved key loaded.",
        switchedNoKey: "Switched to {provider}. No key configured yet.",
        manualModelHint: "Enter a model ID supported by this provider",
        customModelOption: "Other model (enter manually)",
        customModelEmpty: "(enter custom model name)",
        customModelSuffix: "custom",
        endpointInvalid: "API endpoint format is invalid",
        endpointHttps: "Custom endpoints must use HTTPS. Localhost debugging may use HTTP.",
        customRequired: "Custom endpoint needs URL and model name",
        permissionDenied: "Host permission was not granted",
        keyRequired: "API Key is required",
        modelRequired: "Choose a model version or enter a model name",
        savedRefresh: "Saved. Refresh YouTube to apply.",
        languageSaved: "Interface language saved",
        apiUrlPlaceholder: "Example: https://openrouter.ai/api/v1/chat/completions",
        customModelPlaceholder: "Example: openai/gpt-5.4-mini or anthropic/claude-sonnet-4",
        manualModelPlaceholder: "Enter a supported model ID",
        tierFlagship: "flagship",
        tierRecommended: "recommended",
        tierStable: "stable",
        tierFast: "fast",
        tierStrong: "stronger",
        tierCheapFast: "recommended, low cost and fast",
        tierReasoning: "reasoning model, slower but more accurate",
        tierCompatible: "compatible"
    },
    "zh-Hans": {
        appTitle: "YouTube 标题翻译",
        brandSubtitle: "AI 模型配置中心",
        quickActions: "快捷操作",
        openDocs: "打开项目说明",
        masterLabel: "翻译开关",
        masterDesc: "在 YouTube 页面上自动翻译视频标题",
        languageTitle: "1. 翻译语言",
        uiLanguageLabel: "界面语言",
        targetLanguageLabel: "将标题翻译成",
        providerTitle: "2. 选择 AI 服务商",
        modelTitle: "3. 模型配置",
        modelVersionLabel: "模型版本",
        providerCustom: "自定义",
        customEndpointLabel: "自定义接口",
        apiEndpointLabel: "API 接口地址",
        modelNameLabel: "模型名称",
        apiKeyPlaceholder: "粘贴你的密钥...",
        toggleKey: "显示或隐藏 API Key",
        saveSettings: "保存设置",
        testConfig: "测试配置",
        testingConfig: "正在测试当前配置...",
        testPassed: "配置可用，已收到示例翻译结果",
        testFailed: "测试失败，请检查 Key、模型、接口地址或服务商额度",
        previewTestUnavailable: "配置测试只能在已安装扩展的弹窗中运行，不能在 file 预览页中运行。",
        saved: "已保存",
        feedback: "反馈建议",
        supportDeveloper: "支持开发者",
        localKeyChip: "API Key 本地保存",
        originalChip: "原始标题保留",
        customAiChip: "可自定义 AI 配置",
        deepseekRecommended: "推荐",
        privacyNote: "v8.0.2 | 仅在当前浏览器本地存储，不会上传任何数据。",
        noKey: "没有 Key?",
        helpOpenAI: "去 OpenAI 官网申请",
        helpGoogle: "去 Google AI Studio 申请",
        helpAnthropic: "去 Claude Console 申请",
        helpDeepSeek: "去 DeepSeek API 平台申请",
        helpMiniMax: "去 MiniMax 国际平台申请",
        helpZhipu: "去 Z.AI 国际平台申请",
        helpKimi: "去 Kimi 国际平台申请",
        helpCustom: "查看自定义端点说明",
        enabled: "翻译已开启，刷新 YouTube 后生效",
        paused: "翻译已暂停",
        switchedSaved: "已切换为 {provider}，已读取保存的 Key",
        switchedNoKey: "已切换为 {provider}，还未配置 Key",
        manualModelHint: "请输入该服务商支持的模型 ID",
        customModelOption: "其他（手动输入模型名）",
        customModelEmpty: "（请填写自定义模型名）",
        customModelSuffix: "自定义",
        endpointInvalid: "API Endpoint 格式不正确",
        endpointHttps: "自定义端点必须使用 HTTPS；本机 localhost 调试可使用 HTTP",
        customRequired: "自定义端点需要填写 URL 和模型名",
        permissionDenied: "未授予该域名访问权限，无法调用",
        keyRequired: "必须填写 API Key",
        modelRequired: "请填写模型名称，或从模型版本中选择一个预设",
        savedRefresh: "保存成功，请刷新 YouTube 页面",
        languageSaved: "界面语言已保存",
        apiUrlPlaceholder: "例如：https://openrouter.ai/api/v1/chat/completions",
        customModelPlaceholder: "例如：openai/gpt-5.4-mini、anthropic/claude-sonnet-4",
        manualModelPlaceholder: "填写服务商支持的模型 ID",
        tierFlagship: "旗舰",
        tierRecommended: "推荐",
        tierStable: "稳定",
        tierFast: "快",
        tierStrong: "更强",
        tierCheapFast: "推荐，便宜快",
        tierReasoning: "推理模型，慢但更准",
        tierCompatible: "兼容旧 Key"
    }
};

[
    ["ja", "AI タイトル翻訳", "AI モデル設定", "インターフェース言語", "タイトルの翻訳先", "保存", "保存しました"],
    ["ko", "AI 제목 번역", "AI 모델 설정", "인터페이스 언어", "제목 번역 대상", "저장", "저장됨"],
    ["th", "แปลชื่อด้วย AI", "การตั้งค่าโมเดล AI", "ภาษาของส่วนขยาย", "แปลชื่อเป็น", "บันทึก", "บันทึกแล้ว"],
    ["es", "Traductor de títulos con IA", "Configuración del modelo de IA", "Idioma de la interfaz", "Traducir títulos a", "Guardar", "Guardado"],
    ["fr", "Traducteur de titres IA", "Paramètres du modèle IA", "Langue de l'interface", "Traduire les titres en", "Enregistrer", "Enregistré"],
    ["de", "KI-Titelübersetzer", "KI-Modell-Einstellungen", "Sprache der Oberfläche", "Titel übersetzen in", "Speichern", "Gespeichert"],
    ["pt", "Tradutor de títulos com IA", "Configurações do modelo de IA", "Idioma da interface", "Traduzir títulos para", "Salvar", "Salvo"],
    ["id", "Penerjemah Judul AI", "Pengaturan model AI", "Bahasa antarmuka", "Terjemahkan judul ke", "Simpan", "Tersimpan"],
    ["vi", "Dịch tiêu đề AI", "Cài đặt mô hình AI", "Ngôn ngữ giao diện", "Dịch tiêu đề sang", "Lưu", "Đã lưu"],
    ["ru", "AI-переводчик заголовков", "Настройки модели AI", "Язык интерфейса", "Переводить заголовки на", "Сохранить", "Сохранено"],
    ["ar", "مترجم العناوين بالذكاء الاصطناعي", "إعدادات نموذج الذكاء الاصطناعي", "لغة الواجهة", "ترجمة العناوين إلى", "حفظ", "تم الحفظ"],
    ["hi", "AI शीर्षक अनुवादक", "AI मॉडल सेटिंग", "इंटरफ़ेस भाषा", "शीर्षक का अनुवाद", "सहेजें", "सहेजा गया"]
].forEach(([code, appTitle, brandSubtitle, uiLanguageLabel, targetLanguageLabel, saveSettings, saved]) => {
    UI_TEXT[code] = Object.assign({}, UI_TEXT.en, {
        appTitle,
        brandSubtitle,
        uiLanguageLabel,
        targetLanguageLabel,
        saveSettings,
        saved
    });
});

Object.assign(UI_TEXT.ja, {
    masterLabel: "翻訳", masterDesc: "YouTube 動画タイトルを自動翻訳", languageTitle: "1. 翻訳言語",
    providerTitle: "2. AI プロバイダーを選択", modelTitle: "3. モデル設定", modelVersionLabel: "モデルバージョン",
    providerCustom: "カスタム", customEndpointLabel: "カスタムエンドポイント", apiEndpointLabel: "API エンドポイント",
    modelNameLabel: "モデル名", apiKeyPlaceholder: "API キーを貼り付け...", feedback: "フィードバック",
    supportDeveloper: "開発者を支援", privacyNote: "v8.0.2 | このブラウザ内にのみ保存され、開発者へデータは送信されません。",
    noKey: "キーがありませんか?", languageSaved: "言語設定を保存しました", savedRefresh: "保存しました。YouTube を更新してください。"
});
Object.assign(UI_TEXT.ko, {
    masterLabel: "번역", masterDesc: "YouTube 동영상 제목 자동 번역", languageTitle: "1. 번역 언어",
    providerTitle: "2. AI 제공업체 선택", modelTitle: "3. 모델 설정", modelVersionLabel: "모델 버전",
    providerCustom: "사용자 지정", customEndpointLabel: "사용자 지정 엔드포인트", apiEndpointLabel: "API 엔드포인트",
    modelNameLabel: "모델 이름", apiKeyPlaceholder: "API 키 붙여넣기...", feedback: "피드백",
    supportDeveloper: "개발자 지원", privacyNote: "v8.0.2 | 이 브라우저에만 저장되며 개발자에게 데이터가 업로드되지 않습니다.",
    noKey: "키가 없나요?", languageSaved: "언어 설정 저장됨", savedRefresh: "저장됨. YouTube를 새로고침하세요."
});
Object.assign(UI_TEXT.th, {
    masterLabel: "การแปล", masterDesc: "แปลชื่อวิดีโอ YouTube อัตโนมัติ", languageTitle: "1. ภาษาแปล",
    providerTitle: "2. เลือกผู้ให้บริการ AI", modelTitle: "3. ตั้งค่าโมเดล", modelVersionLabel: "เวอร์ชันโมเดล",
    providerCustom: "กำหนดเอง", customEndpointLabel: "เอนด์พอยต์กำหนดเอง", apiEndpointLabel: "เอนด์พอยต์ API",
    modelNameLabel: "ชื่อโมเดล", apiKeyPlaceholder: "วาง API Key...", feedback: "ข้อเสนอแนะ",
    supportDeveloper: "สนับสนุนนักพัฒนา", privacyNote: "v8.0.2 | บันทึกเฉพาะในเบราว์เซอร์นี้ ไม่มีการอัปโหลดข้อมูลให้ผู้พัฒนา",
    noKey: "ยังไม่มี Key?", languageSaved: "บันทึกภาษาสำเร็จ", savedRefresh: "บันทึกแล้ว โปรดรีเฟรช YouTube"
});
Object.assign(UI_TEXT.es, {
    masterLabel: "Traducción", masterDesc: "Traduce automáticamente títulos de YouTube", languageTitle: "1. Idioma de traducción",
    providerTitle: "2. Elegir proveedor de IA", modelTitle: "3. Ajustes del modelo", modelVersionLabel: "Versión del modelo",
    providerCustom: "Personalizado", customEndpointLabel: "Endpoint personalizado", apiEndpointLabel: "Endpoint API",
    modelNameLabel: "Nombre del modelo", apiKeyPlaceholder: "Pega tu API Key...", feedback: "Comentarios",
    supportDeveloper: "Apoyar al desarrollador", privacyNote: "v8.0.2 | Se guarda solo en este navegador. No se suben datos al desarrollador.",
    noKey: "¿No tienes key?", languageSaved: "Idioma guardado", savedRefresh: "Guardado. Actualiza YouTube para aplicar."
});
Object.assign(UI_TEXT.fr, {
    masterLabel: "Traduction", masterDesc: "Traduit automatiquement les titres YouTube", languageTitle: "1. Langue de traduction",
    providerTitle: "2. Choisir le fournisseur IA", modelTitle: "3. Paramètres du modèle", modelVersionLabel: "Version du modèle",
    providerCustom: "Personnalisé", customEndpointLabel: "Endpoint personnalisé", apiEndpointLabel: "Endpoint API",
    modelNameLabel: "Nom du modèle", apiKeyPlaceholder: "Collez votre clé API...", feedback: "Retour",
    supportDeveloper: "Soutenir le développeur", privacyNote: "v8.0.2 | Stocké uniquement dans ce navigateur. Aucune donnée n'est envoyée au développeur.",
    noKey: "Pas de clé?", languageSaved: "Langue enregistrée", savedRefresh: "Enregistré. Actualisez YouTube."
});
Object.assign(UI_TEXT.de, {
    masterLabel: "Übersetzung", masterDesc: "YouTube-Videotitel automatisch übersetzen", languageTitle: "1. Übersetzungssprache",
    providerTitle: "2. KI-Anbieter wählen", modelTitle: "3. Modelleinstellungen", modelVersionLabel: "Modellversion",
    providerCustom: "Benutzerdefiniert", customEndpointLabel: "Eigener Endpunkt", apiEndpointLabel: "API-Endpunkt",
    modelNameLabel: "Modellname", apiKeyPlaceholder: "API Key einfügen...", feedback: "Feedback",
    supportDeveloper: "Entwickler unterstützen", privacyNote: "v8.0.2 | Nur in diesem Browser gespeichert. Keine Daten werden an den Entwickler hochgeladen.",
    noKey: "Kein Key?", languageSaved: "Sprache gespeichert", savedRefresh: "Gespeichert. YouTube aktualisieren."
});
Object.assign(UI_TEXT.pt, {
    masterLabel: "Tradução", masterDesc: "Traduz automaticamente títulos do YouTube", languageTitle: "1. Idioma de tradução",
    providerTitle: "2. Escolher provedor de IA", modelTitle: "3. Configurações do modelo", modelVersionLabel: "Versão do modelo",
    providerCustom: "Personalizado", customEndpointLabel: "Endpoint personalizado", apiEndpointLabel: "Endpoint da API",
    modelNameLabel: "Nome do modelo", apiKeyPlaceholder: "Cole sua API Key...", feedback: "Feedback",
    supportDeveloper: "Apoiar desenvolvedor", privacyNote: "v8.0.2 | Salvo apenas neste navegador. Nenhum dado é enviado ao desenvolvedor.",
    noKey: "Sem key?", languageSaved: "Idioma salvo", savedRefresh: "Salvo. Atualize o YouTube."
});
Object.assign(UI_TEXT.id, {
    masterLabel: "Terjemahan", masterDesc: "Terjemahkan judul video YouTube otomatis", languageTitle: "1. Bahasa terjemahan",
    providerTitle: "2. Pilih penyedia AI", modelTitle: "3. Pengaturan model", modelVersionLabel: "Versi model",
    providerCustom: "Kustom", customEndpointLabel: "Endpoint kustom", apiEndpointLabel: "Endpoint API",
    modelNameLabel: "Nama model", apiKeyPlaceholder: "Tempel API Key...", feedback: "Masukan",
    supportDeveloper: "Dukung pengembang", privacyNote: "v8.0.2 | Hanya disimpan di browser ini. Tidak ada data yang diunggah ke pengembang.",
    noKey: "Belum punya key?", languageSaved: "Bahasa disimpan", savedRefresh: "Tersimpan. Segarkan YouTube."
});
Object.assign(UI_TEXT.vi, {
    masterLabel: "Dịch", masterDesc: "Tự động dịch tiêu đề video YouTube", languageTitle: "1. Ngôn ngữ dịch",
    providerTitle: "2. Chọn nhà cung cấp AI", modelTitle: "3. Cài đặt mô hình", modelVersionLabel: "Phiên bản mô hình",
    providerCustom: "Tùy chỉnh", customEndpointLabel: "Endpoint tùy chỉnh", apiEndpointLabel: "Endpoint API",
    modelNameLabel: "Tên mô hình", apiKeyPlaceholder: "Dán API Key...", feedback: "Phản hồi",
    supportDeveloper: "Ủng hộ nhà phát triển", privacyNote: "v8.0.2 | Chỉ lưu trong trình duyệt này. Không tải dữ liệu lên nhà phát triển.",
    noKey: "Chưa có key?", languageSaved: "Đã lưu ngôn ngữ", savedRefresh: "Đã lưu. Hãy làm mới YouTube."
});
Object.assign(UI_TEXT.ru, {
    masterLabel: "Перевод", masterDesc: "Автоматически переводить заголовки YouTube", languageTitle: "1. Язык перевода",
    providerTitle: "2. Выберите AI-провайдера", modelTitle: "3. Настройки модели", modelVersionLabel: "Версия модели",
    providerCustom: "Свой", customEndpointLabel: "Свой endpoint", apiEndpointLabel: "API endpoint",
    modelNameLabel: "Имя модели", apiKeyPlaceholder: "Вставьте API Key...", feedback: "Обратная связь",
    supportDeveloper: "Поддержать разработчика", privacyNote: "v8.0.2 | Хранится только в этом браузере. Данные не отправляются разработчику.",
    noKey: "Нет key?", languageSaved: "Язык сохранен", savedRefresh: "Сохранено. Обновите YouTube."
});
Object.assign(UI_TEXT.ar, {
    masterLabel: "الترجمة", masterDesc: "ترجمة عناوين YouTube تلقائيا", languageTitle: "1. لغة الترجمة",
    providerTitle: "2. اختر مزود الذكاء الاصطناعي", modelTitle: "3. إعدادات النموذج", modelVersionLabel: "إصدار النموذج",
    providerCustom: "مخصص", customEndpointLabel: "نقطة نهاية مخصصة", apiEndpointLabel: "نقطة نهاية API",
    modelNameLabel: "اسم النموذج", apiKeyPlaceholder: "الصق API Key...", feedback: "ملاحظات",
    supportDeveloper: "دعم المطور", privacyNote: "v8.0.2 | يتم الحفظ في هذا المتصفح فقط. لا يتم رفع أي بيانات إلى المطور.",
    noKey: "لا تملك Key؟", languageSaved: "تم حفظ اللغة", savedRefresh: "تم الحفظ. حدّث YouTube."
});
Object.assign(UI_TEXT.hi, {
    masterLabel: "अनुवाद", masterDesc: "YouTube वीडियो शीर्षक अपने आप अनुवाद करें", languageTitle: "1. अनुवाद भाषा",
    providerTitle: "2. AI प्रदाता चुनें", modelTitle: "3. मॉडल सेटिंग", modelVersionLabel: "मॉडल संस्करण",
    providerCustom: "कस्टम", customEndpointLabel: "कस्टम endpoint", apiEndpointLabel: "API endpoint",
    modelNameLabel: "मॉडल नाम", apiKeyPlaceholder: "API Key पेस्ट करें...", feedback: "फ़ीडबैक",
    supportDeveloper: "डेवलपर का समर्थन करें", privacyNote: "v8.0.2 | केवल इसी ब्राउज़र में संग्रहीत। डेवलपर को कोई डेटा अपलोड नहीं होता।",
    noKey: "Key नहीं है?", languageSaved: "भाषा सेटिंग सहेजी गई", savedRefresh: "सहेजा गया। YouTube रीफ़्रेश करें।"
});

const PRESETS = {
    openai: {
        url: "https://api.openai.com/v1/chat/completions",
        helpUrl: "https://platform.openai.com/api-keys",
        helpKey: "helpOpenAI",
        models: [
            { id: "gpt-5.5", tier: "tierFlagship" },
            { id: "gpt-5.4-mini", tier: "tierRecommended" },
            { id: "gpt-5.4", tier: "" }
        ]
    },
    google: {
        url: "https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
        helpUrl: "https://aistudio.google.com/app/apikey",
        helpKey: "helpGoogle",
        models: [
            { id: "gemini-3.5-flash", tier: "tierRecommended" },
            { id: "gemini-3-pro-preview", tier: "tierFlagship" },
            { id: "gemini-3-flash-preview", tier: "tierRecommended" },
            { id: "gemini-2.5-flash", tier: "tierStable" }
        ]
    },
    anthropic: {
        url: "https://api.anthropic.com/v1/messages",
        helpUrl: "https://console.anthropic.com/settings/keys",
        helpKey: "helpAnthropic",
        models: [
            { id: "claude-opus-4-7", tier: "tierFlagship" },
            { id: "claude-opus-4-6", tier: "" },
            { id: "claude-sonnet-4-6", tier: "tierRecommended" },
            { id: "claude-haiku-4-5", tier: "tierFast" }
        ]
    },
    deepseek: {
        url: "https://api.deepseek.com/chat/completions",
        helpUrl: "https://platform.deepseek.com/api_keys",
        helpKey: "helpDeepSeek",
        models: [
            { id: "deepseek-v4-flash", tier: "tierCheapFast" },
            { id: "deepseek-v4-pro", tier: "tierStrong" },
            { id: "deepseek-chat", tier: "tierCompatible" }
        ]
    },
    minimax: {
        url: "https://api.minimax.io/v1/chat/completions",
        helpUrl: "https://platform.minimax.io/user-center/basic-information/interface-key",
        helpKey: "helpMiniMax",
        models: [
            { id: "MiniMax-M2.7-highspeed", tier: "tierRecommended" },
            { id: "MiniMax-M2.7", tier: "tierReasoning" },
            { id: "MiniMax-M2.5", tier: "tierCompatible" }
        ]
    },
    zhipu: {
        url: "https://api.z.ai/api/paas/v4/chat/completions",
        helpUrl: "https://z.ai/manage-apikey/apikey-list",
        helpKey: "helpZhipu",
        models: [
            { id: "glm-5.1", tier: "tierRecommended" },
            { id: "glm-5.1-flash", tier: "tierFast" },
            { id: "glm-4.6", tier: "tierStable" }
        ]
    },
    kimi: {
        url: "https://api.moonshot.ai/v1/chat/completions",
        helpUrl: "https://platform.kimi.ai/console/api-keys",
        helpKey: "helpKimi",
        models: [
            { id: "kimi-k2.6", tier: "tierRecommended" },
            { id: "kimi-k2.6-turbo", tier: "tierFast" },
            { id: "kimi-k2.6-thinking", tier: "tierReasoning" }
        ]
    },
    custom: {
        url: "",
        helpUrl: "https://github.com/garygaryandfree/YouTube-AI-Title-Translator#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AB%AF%E7%82%B9",
        helpKey: "helpCustom",
        models: []
    }
};

let currentProvider = "openai";
let uiLanguage = DEFAULT_UI_LANGUAGE;
let targetLanguage = DEFAULT_TARGET_LANGUAGE;

function buildUrl(provider, modelId) {
    const tpl = PRESETS[provider].url;
    return tpl.includes("{MODEL}") ? tpl.replace("{MODEL}", modelId) : tpl;
}

function getLocale() {
    return UI_TEXT[uiLanguage] || UI_TEXT.en;
}

function t(key, replacements) {
    let value = getLocale()[key] || UI_TEXT.en[key] || key;
    if (replacements) {
        Object.keys(replacements).forEach(name => {
            value = value.replace(`{${name}}`, replacements[name]);
        });
    }
    return value;
}

function getLanguageMeta(code) {
    return UI_LANGUAGES.find(item => item.code === code) || UI_LANGUAGES.find(item => item.code === DEFAULT_UI_LANGUAGE);
}

function populateLanguageSelect(select, languages, selectedCode, useShortName) {
    select.innerHTML = "";
    languages.forEach(language => {
        const option = document.createElement("option");
        option.value = language.code;
        option.textContent = useShortName ? language.shortName : language.nativeName;
        option.title = language.nativeName;
        option.selected = language.code === selectedCode;
        select.appendChild(option);
    });
}

function getModelLabel(model) {
    if (!model.tier) return model.id;
    return `${model.id} (${t(model.tier)})`;
}

document.addEventListener("DOMContentLoaded", () => {
    const apiUrlInput = document.getElementById("apiUrl");
    const apiKeyInput = document.getElementById("apiKey");
    const modelNameInput = document.getElementById("modelName");
    const modelSelect = document.getElementById("modelSelect");
    const saveBtn = document.getElementById("saveBtn");
    const testBtn = document.getElementById("testBtn");
    const status = document.getElementById("status");
    const helpLinkContainer = document.getElementById("help-text");
    const masterToggle = document.getElementById("masterToggle");
    const uiLanguageSelect = document.getElementById("uiLanguageSelect");
    const targetLanguageSelect = document.getElementById("targetLanguageSelect");
    const modelSection = document.getElementById("modelSection");
    const manualModelSection = document.getElementById("manualModelSection");
    const manualModelNameSlot = document.getElementById("manualModelNameSlot");
    const customMainSettings = document.getElementById("customMainSettings");
    const customApiUrlSlot = document.getElementById("customApiUrlSlot");
    const customModelNameSlot = document.getElementById("customModelNameSlot");
    const apiUrlGroup = document.getElementById("apiUrlGroup");
    const modelNameGroup = document.getElementById("modelNameGroup");
    const apiKeyVisibility = document.getElementById("apiKeyVisibility");

    const cards = {
        openai: document.getElementById("card-openai"),
        google: document.getElementById("card-google"),
        anthropic: document.getElementById("card-anthropic"),
        deepseek: document.getElementById("card-deepseek"),
        minimax: document.getElementById("card-minimax"),
        zhipu: document.getElementById("card-zhipu"),
        kimi: document.getElementById("card-kimi"),
        custom: document.getElementById("card-custom")
    };

    let providerConfigs = {};

    function setSaveButtonLabel(label) {
        saveBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <path d="M17 21v-8H7v8"></path>
                <path d="M7 3v5h8"></path>
            </svg>
            <span>${label}</span>
        `;
    }

    function setStatus(message, color) {
        status.textContent = message;
        status.style.color = color || "";
    }

    function buildCurrentConfig() {
        return {
            apiUrl: apiUrlInput.value.trim(),
            apiKey: apiKeyInput.value.trim(),
            model: modelNameInput.value.trim(),
            targetLanguage
        };
    }

    function validateCurrentConfig() {
        const cfg = buildCurrentConfig();
        if (!cfg.apiKey) {
            setStatus(t("keyRequired"), "#d92d20");
            apiKeyInput.focus();
            return null;
        }

        if (currentProvider === "custom") {
            if (!cfg.apiUrl || !cfg.model) {
                setStatus(t("customRequired"), "#d92d20");
                return null;
            }
            const endpoint = validateCustomEndpoint(cfg.apiUrl);
            if (!endpoint.ok) {
                setStatus(endpoint.message, "#d92d20");
                apiUrlInput.focus();
                return null;
            }
        } else if (!cfg.model) {
            setStatus(t("modelRequired"), "#d92d20");
            modelNameInput.focus();
            return null;
        }

        if (currentProvider !== "custom") {
            cfg.apiUrl = buildUrl(currentProvider, cfg.model);
        }

        return cfg;
    }

    function applyI18n() {
        const meta = getLanguageMeta(uiLanguage);
        document.documentElement.lang = meta.htmlLang;
        document.documentElement.dir = meta.dir;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        document.querySelectorAll("[data-i18n-attr]").forEach(el => {
            el.dataset.i18nAttr.split(";").forEach(pair => {
                const [attr, key] = pair.split(":");
                if (attr && key) el.setAttribute(attr, t(key));
            });
        });
        apiUrlInput.placeholder = currentProvider === "custom" ? t("apiUrlPlaceholder") : "";
        modelNameInput.placeholder = currentProvider === "custom" ? t("customModelPlaceholder") : t("manualModelPlaceholder");
        setSaveButtonLabel(t("saveSettings"));
        updateProviderHelp(currentProvider);
        rebuildModelSelect(currentProvider, modelNameInput.value);
    }

    function updateProviderHelp(provider) {
        const info = PRESETS[provider];
        helpLinkContainer.innerHTML =
            `${t("noKey")} <a href="${info.helpUrl}" target="_blank" rel="noopener noreferrer">${t(info.helpKey)}</a>`;
    }

    function rebuildModelSelect(provider, preferredModelId) {
        const info = PRESETS[provider];
        modelSelect.innerHTML = "";

        if (info.models.length === 0) {
            const opt = document.createElement("option");
            opt.value = preferredModelId || "";
            opt.textContent = preferredModelId
                ? `${preferredModelId} (${t("customModelSuffix")})`
                : t("customModelEmpty");
            opt.selected = true;
            modelSelect.appendChild(opt);
            return;
        }

        let matched = false;
        info.models.forEach(model => {
            const opt = document.createElement("option");
            opt.value = model.id;
            opt.textContent = getModelLabel(model);
            if (preferredModelId && model.id === preferredModelId) {
                opt.selected = true;
                matched = true;
            }
            modelSelect.appendChild(opt);
        });

        const customModelOpt = document.createElement("option");
        customModelOpt.value = CUSTOM_MODEL_VALUE;
        customModelOpt.textContent = t("customModelOption");
        if (preferredModelId && !matched) customModelOpt.selected = true;
        modelSelect.appendChild(customModelOpt);
    }

    function updateModelNamePlacement(provider, showManualModel) {
        const isCustom = provider === "custom";
        manualModelSection.style.display = !isCustom && showManualModel ? "block" : "none";

        if (isCustom) {
            customModelNameSlot.appendChild(modelNameGroup);
            return;
        }

        manualModelNameSlot.appendChild(modelNameGroup);
        if (showManualModel) {
            modelNameInput.focus();
            setStatus(t("manualModelHint"), "#69717f");
        }
    }

    function updateUIState(provider, preferredModelId) {
        currentProvider = provider;

        Object.keys(cards).forEach(key => {
            cards[key].classList.toggle("active", key === provider);
            cards[key].setAttribute("aria-pressed", key === provider ? "true" : "false");
        });

        updateProviderHelp(provider);

        const isCustom = provider === "custom";
        modelSection.style.display = isCustom ? "none" : "";
        customMainSettings.style.display = isCustom ? "block" : "none";
        manualModelSection.style.display = "none";
        apiUrlInput.placeholder = isCustom ? t("apiUrlPlaceholder") : "";
        modelNameInput.placeholder = isCustom ? t("customModelPlaceholder") : t("manualModelPlaceholder");

        if (!isCustom) {
            apiUrlGroup.remove();
            manualModelNameSlot.appendChild(modelNameGroup);
        } else {
            customApiUrlSlot.appendChild(apiUrlGroup);
            updateModelNamePlacement(provider, false);
        }

        rebuildModelSelect(provider, preferredModelId);
        updateModelNamePlacement(provider, !!(preferredModelId && !isPresetModel(provider, preferredModelId)));
    }

    function hydrateForm(provider) {
        const cfg = providerConfigs[provider] || {};
        const presetFirst = PRESETS[provider].models[0];
        const modelId = cfg.model || (presetFirst ? presetFirst.id : "");

        updateUIState(provider, modelId);
        apiKeyInput.value = cfg.apiKey || "";
        modelNameInput.value = modelId;
        apiUrlInput.value = cfg.apiUrl || (provider === "custom" ? "" : buildUrl(provider, modelId));
    }

    function isPresetModel(provider, modelId) {
        const info = PRESETS[provider];
        return !!(info && info.models.some(model => model.id === modelId));
    }

    function selectProvider(provider) {
        hydrateForm(provider);
        const hasKey = !!(providerConfigs[provider] && providerConfigs[provider].apiKey);
        setStatus(t(hasKey ? "switchedSaved" : "switchedNoKey", { provider }));
        setTimeout(() => setStatus(""), 1800);
    }

    function isLocalHttpEndpoint(u) {
        return u.protocol === "http:" && (
            u.hostname === "localhost" ||
            u.hostname === "127.0.0.1" ||
            u.hostname === "[::1]"
        );
    }

    function validateCustomEndpoint(url) {
        let u;
        try {
            u = new URL(url);
        } catch (e) {
            return { ok: false, message: t("endpointInvalid") };
        }

        if (u.protocol !== "https:" && !isLocalHttpEndpoint(u)) {
            return { ok: false, message: t("endpointHttps") };
        }

        return { ok: true, url: u };
    }

    async function ensureHostPermission(parsedUrl) {
        try {
            const origin = `${parsedUrl.protocol}//${parsedUrl.hostname}/*`;
            return await chrome.permissions.request({ origins: [origin] });
        } catch (e) {
            console.error("[Gary] URL parse failed:", e);
            return false;
        }
    }

    function saveLanguageSettings(showStatus) {
        chrome.storage.local.set({ uiLanguage, targetLanguage }, () => {
            if (showStatus) {
                setStatus(t("languageSaved"), "#1d9a57");
                setTimeout(() => setStatus(""), 1600);
            }
        });
    }

    populateLanguageSelect(uiLanguageSelect, UI_LANGUAGES, uiLanguage);
    populateLanguageSelect(targetLanguageSelect, TARGET_LANGUAGES, targetLanguage);
    applyI18n();

    chrome.storage.local.get(
        {
            enabled: true,
            providerConfigs: null,
            selectedProvider: "openai",
            customApiUrl: "",
            customApiKey: "",
            customModel: "",
            uiLanguage: DEFAULT_UI_LANGUAGE,
            targetLanguage: DEFAULT_TARGET_LANGUAGE
        },
        (result) => {
            uiLanguage = UI_TEXT[result.uiLanguage] ? result.uiLanguage : DEFAULT_UI_LANGUAGE;
            targetLanguage = TARGET_LANGUAGES.some(item => item.code === result.targetLanguage)
                ? result.targetLanguage
                : DEFAULT_TARGET_LANGUAGE;
            providerConfigs = result.providerConfigs || {};

            if (!result.providerConfigs && result.customApiKey && result.selectedProvider) {
                providerConfigs[result.selectedProvider] = {
                    apiKey: result.customApiKey,
                    apiUrl: result.customApiUrl,
                    model: result.customModel
                };
            }

            masterToggle.checked = result.enabled !== false;
            populateLanguageSelect(uiLanguageSelect, UI_LANGUAGES, uiLanguage);
            populateLanguageSelect(targetLanguageSelect, TARGET_LANGUAGES, targetLanguage);
            applyI18n();

            const provider = PRESETS[result.selectedProvider] ? result.selectedProvider : "openai";
            hydrateForm(provider);
        }
    );

    masterToggle.addEventListener("change", () => {
        chrome.storage.local.set({ enabled: masterToggle.checked });
        setStatus(masterToggle.checked ? t("enabled") : t("paused"), masterToggle.checked ? "#1d9a57" : "#69717f");
        setTimeout(() => setStatus(""), 2000);
    });

    uiLanguageSelect.addEventListener("change", () => {
        uiLanguage = UI_TEXT[uiLanguageSelect.value] ? uiLanguageSelect.value : DEFAULT_UI_LANGUAGE;
        populateLanguageSelect(uiLanguageSelect, UI_LANGUAGES, uiLanguage);
        applyI18n();
        saveLanguageSettings(true);
    });

    targetLanguageSelect.addEventListener("change", () => {
        targetLanguage = TARGET_LANGUAGES.some(item => item.code === targetLanguageSelect.value)
            ? targetLanguageSelect.value
            : DEFAULT_TARGET_LANGUAGE;
        saveLanguageSettings(true);
    });

    Object.keys(cards).forEach(provider => {
        cards[provider].addEventListener("click", () => selectProvider(provider));
        cards[provider].addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectProvider(provider);
            }
        });
    });

    if (apiKeyVisibility) {
        apiKeyVisibility.addEventListener("click", () => {
            const shouldShow = apiKeyInput.type === "password";
            apiKeyInput.type = shouldShow ? "text" : "password";
            apiKeyVisibility.setAttribute("aria-pressed", shouldShow ? "true" : "false");
        });
    }

    modelSelect.addEventListener("change", () => {
        const modelId = modelSelect.value;
        const isManualModel = modelId === CUSTOM_MODEL_VALUE;
        const cfg = providerConfigs[currentProvider] || {};
        const savedManualModel = cfg.model && !isPresetModel(currentProvider, cfg.model) ? cfg.model : "";
        modelNameInput.value = isManualModel ? savedManualModel : modelId;
        apiUrlInput.value = buildUrl(currentProvider, modelNameInput.value);
        updateModelNamePlacement(currentProvider, isManualModel);
    });

    modelNameInput.addEventListener("input", () => {
        if (currentProvider !== "custom" && modelSelect.value === CUSTOM_MODEL_VALUE) {
            apiUrlInput.value = buildUrl(currentProvider, modelNameInput.value.trim());
        }
    });

    saveBtn.addEventListener("click", async () => {
        const cfg = validateCurrentConfig();
        if (!cfg) return;

        if (currentProvider === "custom") {
            const endpoint = validateCustomEndpoint(cfg.apiUrl);
            if (!endpoint.ok) {
                setStatus(endpoint.message, "#d92d20");
                apiUrlInput.focus();
                return;
            }
            const granted = await ensureHostPermission(endpoint.url);
            if (!granted) {
                setStatus(t("permissionDenied"), "#d92d20");
                return;
            }
        }

        providerConfigs[currentProvider] = { apiKey: cfg.apiKey, apiUrl: cfg.apiUrl, model: cfg.model };

        chrome.storage.local.set({
            providerConfigs,
            selectedProvider: currentProvider,
            targetLanguage,
            uiLanguage,
            customApiUrl: cfg.apiUrl,
            customApiKey: cfg.apiKey,
            customModel: cfg.model
        }, () => {
            setStatus(t("savedRefresh"), "#1d9a57");
            setSaveButtonLabel(t("saved"));
            setTimeout(() => setSaveButtonLabel(t("saveSettings")), 1500);
        });
    });

    if (testBtn) {
        testBtn.addEventListener("click", () => {
            const cfg = validateCurrentConfig();
            if (!cfg) return;

            testBtn.disabled = true;
            setStatus(t("testingConfig"), "#69717f");

            chrome.runtime.sendMessage({
                type: "translate",
                text: "How global creators explain AI tools",
                config: cfg
            }, (reply) => {
                testBtn.disabled = false;
                if (chrome.runtime.lastError) {
                    setStatus(chrome.runtime.lastError.message || t("testFailed"), "#d92d20");
                    return;
                }

                if (reply && reply.ok && reply.result && reply.result.translatedTitle) {
                    setStatus(t("testPassed"), "#1d9a57");
                } else if (reply && reply.errorCode === "preview") {
                    setStatus(t("previewTestUnavailable"), "#69717f");
                } else {
                    setStatus(t("testFailed"), "#d92d20");
                }
            });
        });
    }
});
