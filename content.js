// ================= 配置区 =================
let USER_CONFIG = { apiUrl: "", apiKey: "", model: "" };
let TARGET_LANGUAGE = "en";
let UI_LANGUAGE = "en";
let CONFIG_READY = false;

const SUPPORTED_TARGET_LANGUAGES = new Set([
    "zh-Hans", "zh-Hant", "en", "ja", "ko", "th", "es", "fr", "de", "pt", "id", "vi"
]);
const SUPPORTED_UI_LANGUAGES = new Set([
    "zh-Hans", "en", "ja", "ko", "th", "es", "fr", "de", "pt", "id", "vi", "ru", "ar", "hi"
]);

// Only skip these titles when translating into Chinese. Matching happens in the
// content script before cache lookup, UI creation, or any request to a model.
const CHINESE_TRANSLATION_BLOCKLIST = [
    "CCP",
    "CPC",
    "Communist Party",
    "Politburo",
    "Regime",
    "Xi Jinping",
    "Mao Zedong",
    "Dalai Lama",
    "Jiang Zemin",
    "Hu Jintao",
    "Tiananmen",
    "June 4",
    "Falun",
    "Cultural Revolution",
    "Protest",
    "Human Rights",
    "Democracy",
    "Censorship",
    "Dictator"
];
const CHINESE_TRANSLATION_BLOCK_PATTERNS = CHINESE_TRANSLATION_BLOCKLIST.map(word =>
    new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
);

const CONTENT_TEXT = {
    en: {
        original: "Original",
        status: "Status",
        unconfiguredTag: "Setup",
        unconfiguredTitle: "Configure the extension",
        unconfiguredStatus: "Not configured",
        queuedTag: "Queue",
        queuedTitle: "Queued...",
        queuedStatus: "Queued",
        translatingTag: "AI",
        translatingTitle: "Translating...",
        translatingStatus: "Translating",
        completedStatus: "Done",
        cachedStatus: "Cached",
        failedPrefix: "Translation failed",
        extension: "Extension updated. Refresh the page.",
        auth: "Invalid key",
        quota: "Quota or rate limit",
        model: "Model may be wrong",
        parse: "Unexpected model response",
        network: "Network or provider error"
    },
    "zh-Hans": {
        original: "原标题",
        status: "状态",
        unconfiguredTag: "未配置",
        unconfiguredTitle: "请配置插件",
        unconfiguredStatus: "未配置",
        queuedTag: "队列",
        queuedTitle: "排队中...",
        queuedStatus: "排队中",
        translatingTag: "AI",
        translatingTitle: "翻译中...",
        translatingStatus: "翻译中",
        completedStatus: "已完成",
        cachedStatus: "已缓存",
        failedPrefix: "翻译失败",
        extension: "插件已更新，请刷新页面",
        auth: "Key 无效",
        quota: "余额不足或被限流",
        model: "模型名可能错误",
        parse: "模型返回格式异常",
        network: "网络或服务商异常"
    }
};

const TARGET_STATUS_TEXT = {
    en: {
        failedPrefix: "Translation failed",
        extension: "Extension updated. Refresh the page.",
        auth: "Invalid key",
        quota: "Quota or rate limit",
        model: "Model may be wrong",
        parse: "Unexpected model response",
        network: "Network or provider error"
    },
    "zh-Hans": {
        failedPrefix: "翻译失败",
        extension: "插件已更新，请刷新页面",
        auth: "Key 无效",
        quota: "余额不足或被限流",
        model: "模型名可能错误",
        parse: "模型返回格式异常",
        network: "网络或服务商异常"
    },
    "zh-Hant": {
        failedPrefix: "翻譯失敗",
        extension: "擴充功能已更新，請重新整理頁面",
        auth: "Key 無效",
        quota: "額度不足或被限流",
        model: "模型名稱可能錯誤",
        parse: "模型回傳格式異常",
        network: "網路或服務商異常"
    },
    ja: {
        failedPrefix: "翻訳失敗",
        extension: "拡張機能が更新されました。ページを再読み込みしてください。",
        auth: "キーが無効です",
        quota: "残高不足またはレート制限",
        model: "モデル名が間違っている可能性があります",
        parse: "モデルの応答形式が異常です",
        network: "ネットワークまたはプロバイダーのエラー"
    },
    ko: {
        failedPrefix: "번역 실패",
        extension: "확장 프로그램이 업데이트되었습니다. 페이지를 새로고침하세요.",
        auth: "Key가 유효하지 않습니다",
        quota: "잔액 부족 또는 속도 제한",
        model: "모델 이름이 잘못되었을 수 있습니다",
        parse: "모델 응답 형식 오류",
        network: "네트워크 또는 제공업체 오류"
    },
    th: {
        failedPrefix: "แปลล้มเหลว",
        extension: "ส่วนขยายอัปเดตแล้ว โปรดรีเฟรชหน้า",
        auth: "Key ไม่ถูกต้อง",
        quota: "โควตาไม่พอหรือถูกจำกัดความเร็ว",
        model: "ชื่อโมเดลอาจไม่ถูกต้อง",
        parse: "รูปแบบคำตอบของโมเดลผิดปกติ",
        network: "เครือข่ายหรือผู้ให้บริการผิดพลาด"
    },
    es: {
        failedPrefix: "Error de traducción",
        extension: "Extensión actualizada. Recarga la página.",
        auth: "Key no válida",
        quota: "Sin cuota o límite de velocidad",
        model: "El modelo puede ser incorrecto",
        parse: "Formato de respuesta inesperado",
        network: "Error de red o proveedor"
    },
    fr: {
        failedPrefix: "Échec de traduction",
        extension: "Extension mise à jour. Actualisez la page.",
        auth: "Clé invalide",
        quota: "Quota insuffisant ou limite atteinte",
        model: "Le nom du modèle est peut-être incorrect",
        parse: "Format de réponse inattendu",
        network: "Erreur réseau ou fournisseur"
    },
    de: {
        failedPrefix: "Übersetzung fehlgeschlagen",
        extension: "Erweiterung aktualisiert. Seite neu laden.",
        auth: "Ungültiger Key",
        quota: "Kein Kontingent oder Ratenlimit",
        model: "Modellname möglicherweise falsch",
        parse: "Unerwartetes Antwortformat",
        network: "Netzwerk- oder Anbieterfehler"
    },
    pt: {
        failedPrefix: "Falha na tradução",
        extension: "Extensão atualizada. Atualize a página.",
        auth: "Key inválida",
        quota: "Sem cota ou limite de taxa",
        model: "O nome do modelo pode estar errado",
        parse: "Formato de resposta inesperado",
        network: "Erro de rede ou provedor"
    },
    id: {
        failedPrefix: "Terjemahan gagal",
        extension: "Ekstensi diperbarui. Segarkan halaman.",
        auth: "Key tidak valid",
        quota: "Kuota habis atau dibatasi",
        model: "Nama model mungkin salah",
        parse: "Format respons model tidak sesuai",
        network: "Kesalahan jaringan atau penyedia"
    },
    vi: {
        failedPrefix: "Dịch thất bại",
        extension: "Tiện ích đã cập nhật. Hãy tải lại trang.",
        auth: "Key không hợp lệ",
        quota: "Hết hạn mức hoặc bị giới hạn tốc độ",
        model: "Tên mô hình có thể sai",
        parse: "Định dạng phản hồi không hợp lệ",
        network: "Lỗi mạng hoặc nhà cung cấp"
    }
};

[
    ["ja", "元のタイトル", "状態", "設定", "拡張機能を設定してください", "キュー", "待機中...", "翻訳中...", "完了", "キャッシュ済み", "翻訳失敗"],
    ["ko", "원본 제목", "상태", "설정", "확장 프로그램을 설정하세요", "대기", "대기 중...", "번역 중...", "완료", "캐시됨", "번역 실패"],
    ["th", "ชื่อเดิม", "สถานะ", "ตั้งค่า", "โปรดตั้งค่าส่วนขยาย", "คิว", "กำลังรอ...", "กำลังแปล...", "เสร็จแล้ว", "แคชแล้ว", "แปลล้มเหลว"],
    ["es", "Original", "Estado", "Config", "Configura la extensión", "Cola", "En cola...", "Traduciendo...", "Listo", "En caché", "Error de traducción"],
    ["fr", "Original", "État", "Config", "Configurez l'extension", "File", "En attente...", "Traduction...", "Terminé", "En cache", "Échec de traduction"],
    ["de", "Original", "Status", "Setup", "Erweiterung konfigurieren", "Warteschlange", "Wartet...", "Übersetzt...", "Fertig", "Cache", "Übersetzung fehlgeschlagen"],
    ["pt", "Original", "Status", "Config", "Configure a extensão", "Fila", "Na fila...", "Traduzindo...", "Concluído", "Em cache", "Falha na tradução"],
    ["id", "Asli", "Status", "Atur", "Konfigurasikan ekstensi", "Antrean", "Mengantre...", "Menerjemahkan...", "Selesai", "Cache", "Terjemahan gagal"],
    ["vi", "Gốc", "Trạng thái", "Cài đặt", "Hãy cấu hình tiện ích", "Hàng đợi", "Đang chờ...", "Đang dịch...", "Xong", "Đã lưu đệm", "Dịch thất bại"],
    ["ru", "Оригинал", "Статус", "Настр.", "Настройте расширение", "Очередь", "В очереди...", "Перевод...", "Готово", "Из кэша", "Ошибка перевода"],
    ["ar", "الأصل", "الحالة", "إعداد", "يرجى إعداد الإضافة", "قائمة", "في الانتظار...", "جار الترجمة...", "تم", "مخزن", "فشل الترجمة"],
    ["hi", "मूल", "स्थिति", "सेटअप", "एक्सटेंशन कॉन्फ़िगर करें", "कतार", "कतार में...", "अनुवाद हो रहा...", "पूर्ण", "कैश", "अनुवाद विफल"]
].forEach(([code, original, status, unconfiguredTag, unconfiguredTitle, queuedTag, queuedTitle, translatingTitle, completedStatus, cachedStatus, failedPrefix]) => {
    CONTENT_TEXT[code] = Object.assign({}, CONTENT_TEXT.en, {
        original,
        status,
        unconfiguredTag,
        unconfiguredTitle,
        unconfiguredStatus: unconfiguredTitle,
        queuedTag,
        queuedTitle,
        queuedStatus: queuedTitle,
        translatingTitle,
        translatingStatus: translatingTitle,
        completedStatus,
        cachedStatus,
        failedPrefix
    });
});

const TAG_LABELS = {
    "科技": { en: "Tech", "zh-Hans": "科技", "zh-Hant": "科技", ja: "テック", ko: "기술", th: "เทค", es: "Tecnología", fr: "Tech", de: "Tech", pt: "Tecnologia", id: "Teknologi", vi: "Công nghệ", ru: "Техно", ar: "تقنية", hi: "टेक" },
    "游戏": { en: "Gaming", "zh-Hans": "游戏", "zh-Hant": "遊戲", ja: "ゲーム", ko: "게임", th: "เกม", es: "Juegos", fr: "Jeux", de: "Gaming", pt: "Jogos", id: "Game", vi: "Game", ru: "Игры", ar: "ألعاب", hi: "गेम" },
    "音乐": { en: "Music", "zh-Hans": "音乐", "zh-Hant": "音樂", ja: "音楽", ko: "음악", th: "เพลง", es: "Música", fr: "Musique", de: "Musik", pt: "Música", id: "Musik", vi: "Âm nhạc", ru: "Музыка", ar: "موسيقى", hi: "संगीत" },
    "教程": { en: "Tutorial", "zh-Hans": "教程", "zh-Hant": "教學", ja: "解説", ko: "튜토리얼", th: "สอน", es: "Tutorial", fr: "Tuto", de: "Tutorial", pt: "Tutorial", id: "Tutorial", vi: "Hướng dẫn", ru: "Обучение", ar: "شرح", hi: "ट्यूटोरियल" },
    "搞笑": { en: "Comedy", "zh-Hans": "搞笑", "zh-Hant": "搞笑", ja: "コメディ", ko: "코미디", th: "ตลก", es: "Comedia", fr: "Humour", de: "Comedy", pt: "Comédia", id: "Komedi", vi: "Hài", ru: "Юмор", ar: "كوميديا", hi: "कॉमेडी" },
    "新闻": { en: "News", "zh-Hans": "新闻", "zh-Hant": "新聞", ja: "ニュース", ko: "뉴스", th: "ข่าว", es: "Noticias", fr: "Actu", de: "News", pt: "Notícias", id: "Berita", vi: "Tin tức", ru: "Новости", ar: "أخبار", hi: "समाचार" },
    "财经": { en: "Finance", "zh-Hans": "财经", "zh-Hant": "財經", ja: "金融", ko: "금융", th: "การเงิน", es: "Finanzas", fr: "Finance", de: "Finanzen", pt: "Finanças", id: "Finansial", vi: "Tài chính", ru: "Финансы", ar: "مال", hi: "वित्त" },
    "生活": { en: "Life", "zh-Hans": "生活", "zh-Hant": "生活", ja: "生活", ko: "생활", th: "ไลฟ์", es: "Vida", fr: "Vie", de: "Leben", pt: "Vida", id: "Hidup", vi: "Đời sống", ru: "Жизнь", ar: "حياة", hi: "जीवन" },
    "体育": { en: "Sports", "zh-Hans": "体育", "zh-Hant": "體育", ja: "スポーツ", ko: "스포츠", th: "กีฬา", es: "Deportes", fr: "Sport", de: "Sport", pt: "Esporte", id: "Olahraga", vi: "Thể thao", ru: "Спорт", ar: "رياضة", hi: "खेल" },
    "影视": { en: "Film", "zh-Hans": "影视", "zh-Hant": "影視", ja: "映像", ko: "영상", th: "หนัง", es: "Cine", fr: "Cinéma", de: "Film", pt: "Cinema", id: "Film", vi: "Phim", ru: "Кино", ar: "أفلام", hi: "फिल्म" },
    "美食": { en: "Food", "zh-Hans": "美食", "zh-Hant": "美食", ja: "料理", ko: "음식", th: "อาหาร", es: "Comida", fr: "Cuisine", de: "Essen", pt: "Comida", id: "Makanan", vi: "Ẩm thực", ru: "Еда", ar: "طعام", hi: "भोजन" },
    "其它": { en: "Other", "zh-Hans": "其它", "zh-Hant": "其他", ja: "その他", ko: "기타", th: "อื่นๆ", es: "Otro", fr: "Autre", de: "Sonstiges", pt: "Outro", id: "Lainnya", vi: "Khác", ru: "Другое", ar: "أخرى", hi: "अन्य" }
};

function getText(key) {
    const pack = CONTENT_TEXT[UI_LANGUAGE] || CONTENT_TEXT.en;
    return pack[key] || CONTENT_TEXT.en[key] || key;
}

function getTargetText(key) {
    const pack = TARGET_STATUS_TEXT[TARGET_LANGUAGE] || TARGET_STATUS_TEXT.en;
    return pack[key] || TARGET_STATUS_TEXT.en[key] || getText(key);
}

function localizeTag(tag) {
    const labels = TAG_LABELS[tag] || TAG_LABELS["其它"];
    return labels[TARGET_LANGUAGE] || labels[UI_LANGUAGE] || labels.en;
}

console.log("🚀 Gary插件 v8.0.2 已启动");

// ================= 持久化翻译缓存 =================
// 设计：目标语言 + 原文 → {tag, translatedTitle, ts} 的 Map，启动时一次从 chrome.storage 加载，
// 命中直接渲染（0 token、0 网络）；写入时 debounce 500ms 落盘。
// LRU：插入时如已存在先 delete 再 set，把最近用的放到 Map 末尾；
// 超过 10000 条时弹出最早的 entry。
const CACHE_LIMIT = 10000;
const translationCache = new Map();
let cacheSaveTimer = null;

function loadCache() {
    chrome.storage.local.get(['translationCache'], (result) => {
        const arr = result.translationCache;
        if (Array.isArray(arr)) {
            arr.forEach(([k, v]) => translationCache.set(k, v));
            console.log(`💾 缓存已加载 ${translationCache.size} 条`);
        }
    });
}

function getCacheKey(text) {
    return `${TARGET_LANGUAGE}\n${text}`;
}

function normalizeCachedResult(value) {
    if (!value) return null;
    const translatedTitle = value.translatedTitle || value.cn;
    if (!translatedTitle) return null;
    return { tag: value.tag || "其它", translatedTitle };
}

function cacheGet(text) {
    const key = getCacheKey(text);
    const v = normalizeCachedResult(translationCache.get(key));
    if (v) {
        // LRU touch：移到末尾
        translationCache.delete(key);
        translationCache.set(key, v);
    }
    return v;
}

function cacheSet(text, result) {
    const key = getCacheKey(text);
    translationCache.delete(key);
    translationCache.set(key, { tag: result.tag, translatedTitle: result.translatedTitle, ts: Date.now() });
    while (translationCache.size > CACHE_LIMIT) {
        const oldest = translationCache.keys().next().value;
        translationCache.delete(oldest);
    }
    scheduleCacheSave();
}

function scheduleCacheSave() {
    if (cacheSaveTimer) clearTimeout(cacheSaveTimer);
    cacheSaveTimer = setTimeout(() => {
        const arr = Array.from(translationCache.entries());
        chrome.storage.local.set({ translationCache: arr });
        cacheSaveTimer = null;
    }, 500);
}

loadCache();
// =================================================

// --- 初始化配置 ---
// v6.2 起每个 provider 单独存配置：providerConfigs[provider] = {apiKey, apiUrl, model}
// 同时兼容 v6.0/6.1 的旧扁平结构 (customApiKey/Url/Model)
// 主开关状态（默认开启）
let ENABLED = true;

function applyConfigFromStorage(result) {
    ENABLED = result.enabled !== false;   // undefined 视为开启
    TARGET_LANGUAGE = SUPPORTED_TARGET_LANGUAGES.has(result.targetLanguage) ? result.targetLanguage : "en";
    UI_LANGUAGE = SUPPORTED_UI_LANGUAGES.has(result.uiLanguage) ? result.uiLanguage : "en";

    const provider = result.selectedProvider;
    const cfg = result.providerConfigs && provider ? result.providerConfigs[provider] : null;

    if (cfg && cfg.apiKey) {
        USER_CONFIG.apiUrl = cfg.apiUrl;
        USER_CONFIG.apiKey = cfg.apiKey;
        USER_CONFIG.model  = cfg.model;
        console.log("✅ 已加载配置 [", provider, "]:", USER_CONFIG.model, ENABLED ? '(开启)' : '(已暂停)');
    } else if (result.customApiKey) {
        // 旧版本回退
        USER_CONFIG.apiUrl = result.customApiUrl;
        USER_CONFIG.apiKey = result.customApiKey;
        USER_CONFIG.model  = result.customModel;
        console.log("✅ 已加载用户配置（旧格式）:", USER_CONFIG.model);
    } else {
        USER_CONFIG.apiUrl = "";
        USER_CONFIG.apiKey = "";
        USER_CONFIG.model = "";
    }
}

function initConfig() {
    chrome.storage.local.get(
        ['enabled', 'providerConfigs', 'selectedProvider', 'customApiUrl', 'customApiKey', 'customModel', 'targetLanguage', 'uiLanguage'],
        (result) => {
            applyConfigFromStorage(result);
            CONFIG_READY = true;
            scheduleProcess();
        }
    );

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace !== 'local') return;
        const shouldResetRenderedTitles = !!changes.targetLanguage;
        // 任意 key 变化时，整体重读，简单稳妥
        chrome.storage.local.get(
            ['enabled', 'providerConfigs', 'selectedProvider', 'customApiUrl', 'customApiKey', 'customModel', 'targetLanguage', 'uiLanguage'],
            (result) => {
                applyConfigFromStorage(result);
                if (shouldResetRenderedTitles) {
                    resetAllRenderedTranslations();
                    scheduleProcess();
                }
            }
        );
    });
}
initConfig();

// --- UI 创建函数 ---
function buildTooltip(originalText, statusText) {
    return `${getText("original")}：${originalText}${statusText ? `\n${getText("status")}：${statusText}` : ""}`;
}

function setBoxTooltip(box, originalText, statusText) {
    box.title = buildTooltip(originalText, statusText);
}

function createSafeBadge(tagText, translatedText, isMainTitle = false, originalText = "", statusText = "") {
    const container = document.createElement('div');
    container.className = 'gary-cn-box';
    container.dataset.garyRole = "translation";
    if (isMainTitle) container.classList.add('gary-main-title-box');
    setBoxTooltip(container, originalText, statusText);

    const tagSpan = document.createElement('span');
    tagSpan.className = 'gary-tag';
    tagSpan.textContent = tagText;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'gary-cn-title';
    titleSpan.textContent = translatedText;

    if (tagText === getText("unconfiguredTag")) titleSpan.style.color = "#d32f2f";

    container.appendChild(tagSpan);
    container.appendChild(titleSpan);

    if (isMainTitle) {
        const originalLine = document.createElement('div');
        originalLine.className = 'gary-original-title';
        originalLine.textContent = originalText;
        container.appendChild(originalLine);
    }

    return container;
}

// --- 🤖 AI 调用：通过 background SW ---
// v7.0 起 fetch 逻辑挪到 background.js，content script 只发消息。
// 好处：避免 YouTube 页面 CSP 拦截、所有 tab 共享一个翻译入口、
//       未来做并发限流和重试都集中在 SW 里。
async function fetchAiTranslation(text) {
    if (!USER_CONFIG.apiKey) return null;
    try {
        const reply = await chrome.runtime.sendMessage({
            type: 'translate',
            text,
            config: {
                apiUrl: USER_CONFIG.apiUrl,
                apiKey: USER_CONFIG.apiKey,
                model:  USER_CONFIG.model,
                targetLanguage: TARGET_LANGUAGE
            }
        });
        if (reply && reply.ok) return reply.result;
        return null;
    } catch (e) {
        console.error("[Gary] SW 通信失败:", e);
        return null;
    }
}

// 渲染辅助函数（批量翻译走相同的成功/失败渲染路径）
function renderStatus(box, tagText, translatedText, statusText) {
    const tag = box.querySelector('.gary-tag');
    const title = box.querySelector('.gary-cn-title');
    if (tag) {
        tag.classList.remove('gary-error');
        tag.textContent = tagText;
    }
    if (title) {
        title.classList.remove('gary-error');
        title.textContent = translatedText;
        title.style.color = "";
    }
    setBoxTooltip(box, box.dataset.garyOriginal || "", statusText);
}

function renderSuccess(box, result) {
    renderStatus(box, localizeTag(result.tag), result.translatedTitle, getText("completedStatus"));
}

function getFriendlyErrorText(error) {
    const type = error && error.type ? error.type : "";
    if (type === "extension") return getTargetText("extension");
    if (type === "auth") return getTargetText("auth");
    if (type === "quota") return getTargetText("quota");
    if (type === "model") return getTargetText("model");
    if (type === "parse" || type === "empty") return getTargetText("parse");
    return getTargetText("network");
}

function makeRuntimeError(error) {
    const message = error && error.message ? error.message : String(error || "");
    if (message.includes("Extension context invalidated")) {
        return { type: "extension", message };
    }
    return { type: "network", message };
}

function renderError(box, error) {
    const tag = box.querySelector('.gary-tag');
    const title = box.querySelector('.gary-cn-title');
    const reason = getFriendlyErrorText(error);
    const failedPrefix = getTargetText("failedPrefix");
    if (tag)   { tag.classList.add('gary-error');   tag.textContent = "❌"; }
    if (title) { title.classList.add('gary-error'); title.textContent = `${failedPrefix}: ${reason}`; }
    setBoxTooltip(box, box.dataset.garyOriginal || "", `${failedPrefix}: ${reason}`);
}

// --- 页面扫描 + 批量翻译 ---
const PRIORITY_VIEWPORT_MARGIN = 320;
let titleNodeIdCounter = 0;

function isNearViewport(el) {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    return rect.bottom >= -PRIORITY_VIEWPORT_MARGIN &&
        rect.top <= window.innerHeight + PRIORITY_VIEWPORT_MARGIN;
}

function getDynamicBatchSize() {
    const model = (USER_CONFIG.model || "").toLowerCase();
    if (!model) return 6;
    if ((model.includes("m2.7") && !model.includes("highspeed")) ||
        model.includes("thinking") ||
        model.includes("reason")) {
        return 4;
    }
    if (model.includes("flash") ||
        model.includes("highspeed") ||
        model.includes("turbo") ||
        model.includes("haiku") ||
        model.includes("deepseek")) {
        return 8;
    }
    return 6;
}

function getTitleText(el) {
    return (el.textContent || el.innerText || "").trim();
}

function getTitleTarget(el) {
    if (el.matches('ytd-watch-metadata h1 yt-formatted-string')) {
        const heading = el.closest('h1') || el;
        return { targetElement: heading, isMainTitle: true };
    }
    const link = el.closest('a');
    return { targetElement: link || el, isMainTitle: false };
}

function ensureTitleNodeId(el) {
    if (!el.dataset.garyNodeId) {
        titleNodeIdCounter++;
        el.dataset.garyNodeId = String(titleNodeIdCounter);
    }
    return el.dataset.garyNodeId;
}

function removeTranslationBoxesForTitle(el, targetElement) {
    const parent = targetElement && targetElement.parentElement;
    if (!parent) return;

    const nodeId = el.dataset.garyNodeId;
    parent.querySelectorAll('.gary-cn-box[data-gary-role="translation"]').forEach(box => {
        if ((nodeId && box.dataset.garyNodeId === nodeId) || box.nextElementSibling === targetElement) {
            box.remove();
        }
    });
}

function resetTitleProcessingState(el, targetElement) {
    removeTranslationBoxesForTitle(el, targetElement);
    el.removeAttribute('data-gary-done');
    el.removeAttribute('data-gary-original');
    el.classList.remove('gary-en-sub');
    targetElement.classList.remove('gary-original-source-hidden');
}

function resetAllRenderedTranslations() {
    document.querySelectorAll('.gary-cn-box[data-gary-role="translation"]').forEach(box => box.remove());
    document.querySelectorAll('[data-gary-done], [data-gary-original], .gary-en-sub, .gary-original-source-hidden').forEach(el => {
        el.removeAttribute('data-gary-done');
        el.removeAttribute('data-gary-original');
        el.classList.remove('gary-en-sub');
        el.classList.remove('gary-original-source-hidden');
    });
}

function getDetectedLanguages(text) {
    const languages = new Set();
    if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(text)) languages.add("ja");
    if (/[\uac00-\ud7af]/.test(text)) languages.add("ko");
    if (/[\u0e00-\u0e7f]/.test(text)) languages.add("th");
    if (/[\u4e00-\u9fff]/.test(text)) languages.add("zh");
    if (/[a-zA-ZÀ-ž]/.test(text)) {
        if (isLikelyEnglishTitle(text)) languages.add("en");
        else languages.add("latin");
    }
    if (/[\u0400-\u04ff]/.test(text)) languages.add("ru");
    if (/[\u0600-\u06ff]/.test(text)) languages.add("ar");
    if (/[\u0900-\u097f]/.test(text)) languages.add("hi");
    return languages;
}

function isLikelyEnglishTitle(text) {
    const latinText = text.replace(/https?:\/\/\S+/g, " ");
    if (!/[a-zA-Z]/.test(latinText)) return false;
    if (/[À-ž]/.test(latinText)) return false;

    const words = latinText.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
    if (words.length === 0) return false;
    const englishMarkers = new Set([
        "a", "an", "and", "are", "as", "at", "be", "but", "by", "can", "did", "do", "does",
        "for", "from", "get", "go", "has", "have", "how", "i", "in", "is", "it", "its", "me",
        "my", "new", "not", "of", "on", "or", "our", "out", "that", "the", "this", "to", "up",
        "we", "what", "when", "where", "why", "with", "you", "your",
        "about", "after", "all", "before", "best", "build", "builds", "built", "change", "changed",
        "changing", "everything", "first", "inside", "into", "just", "last", "made", "make", "makes",
        "more", "most", "news", "over", "review", "use", "used", "using", "video", "without", "work"
    ]);
    return words.length <= 3 || words.some(word => englishMarkers.has(word));
}

function shouldTranslateTitle(text) {
    const languages = getDetectedLanguages(text);
    if (languages.size === 0) return false;

    if ((TARGET_LANGUAGE === "zh-Hans" || TARGET_LANGUAGE === "zh-Hant") &&
        isChineseTitleForTarget(languages)) {
        return false;
    }
    if (languages.size > 1) return true;
    if (languages.has(TARGET_LANGUAGE)) return false;
    return true;
}

function shouldBlockChineseTranslation(text) {
    return (TARGET_LANGUAGE === "zh-Hans" || TARGET_LANGUAGE === "zh-Hant") &&
        CHINESE_TRANSLATION_BLOCK_PATTERNS.some(pattern => pattern.test(text));
}

function isChineseTitleForTarget(languages) {
    return languages.has("zh") &&
        !languages.has("ja") &&
        !languages.has("ko") &&
        !languages.has("th") &&
        !languages.has("ru") &&
        !languages.has("ar") &&
        !languages.has("hi");
}

async function process() {
    if (!CONFIG_READY || !ENABLED) return;
    const titles = document.querySelectorAll('#video-title, #video-title-link, h3 a, ytd-watch-metadata h1 yt-formatted-string');

    const pendingBatch = [];   // 缓存未命中、需要发 API 的项 [{text, box}]

    for (const el of titles) {
        if (el.closest('ytd-comments') || el.closest('ytd-comment-renderer') || el.closest('#comments')) continue;

        const text = getTitleText(el);
        if (!text || text.length < 3) continue;

        const { targetElement, isMainTitle } = getTitleTarget(el);
        const parent = targetElement.parentElement;
        if (!parent) continue;

        if (!el.getAttribute('data-gary-done') && !isNearViewport(targetElement)) continue;

        if (el.getAttribute('data-gary-done')) {
            if (el.dataset.garyOriginal === text) continue;
            resetTitleProcessingState(el, targetElement);
        }

        if (shouldBlockChineseTranslation(text)) {
            el.setAttribute('data-gary-done', 'blocked');
            el.dataset.garyOriginal = text;
            continue;
        }

        if (!shouldTranslateTitle(text)) continue;

        el.setAttribute('data-gary-done', 'true');
        el.dataset.garyOriginal = text;
        const nodeId = ensureTitleNodeId(el);

        const cached = cacheGet(text);

        let tag = getText("unconfiguredTag");
        let translatedText = getText("unconfiguredTitle");
        let statusText = getText("unconfiguredStatus");
        if (cached) {
            tag = localizeTag(cached.tag);
            translatedText = cached.translatedTitle;
            statusText = getText("cachedStatus");
        } else if (USER_CONFIG.apiKey) {
            tag = getText("queuedTag");
            translatedText = getText("queuedTitle");
            statusText = getText("queuedStatus");
        }

        const box = createSafeBadge(tag, translatedText, isMainTitle, text, statusText);
        box.dataset.garyOriginal = text;
        box.dataset.garyNodeId = nodeId;
        try {
            parent.insertBefore(box, targetElement);
            if (isMainTitle) {
                targetElement.classList.add('gary-original-source-hidden');
            } else {
                el.classList.add('gary-en-sub');
            }
        } catch (e) { continue; }

        box.onclick = (e) => {
            e.preventDefault();
            if (!isMainTitle && targetElement.tagName === 'A') targetElement.click();
            else el.click();
        };

        if (cached) continue;                  // 命中缓存：已渲染好
        if (!USER_CONFIG.apiKey) continue;     // 没配置 Key：渲染"未配置"badge 后停下

        pendingBatch.push({ text, box });
    }

    if (pendingBatch.length === 0) return;

    // 按模型动态切批，真正的并发限制在 background SW 统一处理。
    const batchSize = getDynamicBatchSize();
    const chunks = [];
    for (let i = 0; i < pendingBatch.length; i += batchSize) {
        chunks.push(pendingBatch.slice(i, i + batchSize));
    }
    chunks.forEach(translateChunk);
}

async function translateChunk(chunk) {
    let reply;
    chunk.forEach(p => {
        if (p.box.isConnected) renderStatus(p.box, getText("translatingTag"), getText("translatingTitle"), getText("translatingStatus"));
    });
    try {
        reply = await chrome.runtime.sendMessage({
            type: 'translateBatch',
            items: chunk.map(p => p.text),
            config: {
                apiUrl: USER_CONFIG.apiUrl,
                apiKey: USER_CONFIG.apiKey,
                model:  USER_CONFIG.model,
                targetLanguage: TARGET_LANGUAGE
            }
        });
    } catch (e) {
        console.error("[Gary] SW 通信失败:", e);
        const runtimeError = makeRuntimeError(e);
        chunk.forEach(p => {
            if (p.box.isConnected) renderError(p.box, runtimeError);
        });
        return;
    }

    if (!reply || !Array.isArray(reply.results)) {
        chunk.forEach(p => {
            if (p.box.isConnected) renderError(p.box, reply && reply.error);
        });
        return;
    }

    chunk.forEach((p, i) => {
        const result = reply.results[i];
        if (result && result.tag && result.translatedTitle) {
            if (p.box.isConnected) renderSuccess(p.box, result);
            cacheSet(p.text, result);
        } else {
            const itemError = Array.isArray(reply.errors) ? reply.errors[i] : null;
            if (p.box.isConnected) renderError(p.box, itemError || reply.error);
        }
    });
}

// === 触发策略 ===
// 旧版本用 setInterval(process, 1000) 每秒强扫整个 DOM——CPU 浪费 + 易竞态。
// v7.0 改为 MutationObserver 监听 <ytd-app> 子树变化，200ms debounce 后执行 process。
// 这样：(1) 只在真有新视频卡片插入时才触发；(2) 触发更快，不用等下一次 1 秒轮询。
let processScheduled = false;
let processInFlight = false;
function scheduleProcess() {
    if (processScheduled || processInFlight) return;
    processScheduled = true;
    setTimeout(async () => {
        processScheduled = false;
        processInFlight = true;
        try { await process(); }
        finally { processInFlight = false; }
    }, 200);
}

function startObserver() {
    const root = document.querySelector('ytd-app') || document.body;
    if (!root) {
        // YouTube SPA 还没装载好，重试
        setTimeout(startObserver, 200);
        return;
    }
    const observer = new MutationObserver(() => scheduleProcess());
    observer.observe(root, { childList: true, subtree: true });
    window.addEventListener('scroll', scheduleProcess, { passive: true });
    window.addEventListener('resize', scheduleProcess, { passive: true });
    console.log("👁  MutationObserver 已挂载");
    // 首次扫描（处理 observer 挂载之前已经存在的标题）
    scheduleProcess();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
} else {
    startObserver();
}
