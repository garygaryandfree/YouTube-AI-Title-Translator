# AI Title Translator - عناوين YouTube ثنائية اللغة بالذكاء الاصطناعي

[![GitHub stars](https://img.shields.io/github/stars/GaryGaryyy/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/GaryGaryyy/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/network)
[![GitHub issues](https://img.shields.io/github/issues/GaryGaryyy/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

<p align="center">
  <a href="README.md">简体中文</a> |
  <a href="README.en.md">English</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.id.md">Bahasa Indonesia</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.hi.md">हिन्दी</a>
</p>

إضافة Chrome تترجم عناوين فيديوهات YouTube بالذكاء الاصطناعي: يحل العنوان المترجم مكان العنوان الأصلي مباشرة، بينما يبقى العنوان الأصلي بحجم أصغر أسفله. تقارن بين العنوانين أثناء التصفح، فتحكم سريعا على موضوع الفيديو، وتتعلم أيضا كيف تُصاغ العناوين الحقيقية بلغات أخرى. مجانية ومفتوحة المصدر، ولا تُحفظ مفاتيح API Key والإعدادات إلا في متصفحك أنت.

## أحدث التحديثات (v8.0.3)

- **تعمل بدون API Key**: عندما لا يكون أي Key مهيأ، تتحول الإضافة تلقائيا إلى الترجمة على الجهاز المدمجة في Chrome 138+، فتبدأ دون أي تكلفة
- **إعادة المحاولة بالنقر عند فشل الترجمة**: تظهر العناوين الفاشلة بتنبيه أحمر، ونقرة واحدة عليها تعيد ترجمتها
- **إصلاح خطأ «Unexpected model response» الذي يسببه وضع التفكير في DeepSeek V4**: تُفعّل نماذج V4 وضع التفكير افتراضيا، وكانت سلسلة الاستدلال تستنفد حصة الإخراج فيُقتطع JSON؛ وقد عُطّل وضع التفكير الآن لنماذج V4
- أُضيف إلى النافذة المنبثقة (popup) زر مسح ذاكرة الترجمة المؤقتة مع عرض عدد العناصر؛ وتظهر نقطة خضراء على بطاقة المزود الذي حُفظ مفتاحه؛ وعند اختبار الإعدادات تُعرض ترجمة نموذجية مباشرة
- أُضيفت 12 لغة توطين جديدة، ليصل عدد لغات الواجهة إلى 14 لغة

## الميزات الأساسية

| الميزة | الوصف |
|------|------|
| الترجمة والأصل جنبا إلى جنب | تظهر الترجمة كعنوان رئيسي، ويبقى العنوان الأصلي أسفلها، لتسهيل التصفح السريع وتعلم اللغة |
| ترجمة AI سياقية | ليست استبدالا كلمة بكلمة، بل تفهم النكات والنبرة والاختصارات وصيغ العناوين المثيرة للنقر |
| وسوم المحتوى | توليد تلقائي لوسوم مثل تقنية وأخبار وموسيقى ومال، فتعرف نوع الفيديو قبل أن تقرر فتحه |
| ترجمة بين لغات متعددة | التعرف التلقائي على لغات المصدر الشائعة، والترجمة إلى 12 لغة هدف؛ وتُتخطى تلقائيا العناوين المكتوبة أصلا بلغة الهدف |
| تعدد مزودي AI | مدمج DeepSeek وOpenAI وGemini وClaude وMiniMax وZ.AI وKimi، مع دعم نقاط نهاية مخصصة متوافقة مع OpenAI |
| ترجمة مدمجة بدون Key | عند عدم تهيئة أي Key تُستخدم أداة Translator المدمجة في Chrome: تعمل على الجهاز، ومجانية، ولا تُرفع النصوص |
| تخزين مؤقت محلي وخصوصية | تُخزن الترجمات محليا لتجنب الطلبات المكررة؛ ولا تُحفظ مفاتيح API Key والإعدادات إلا في المتصفح الحالي |

## عرض توضيحي

| الإنجليزية -> اليابانية | الإنجليزية -> الكورية |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| الإنجليزية -> التايلاندية | الإنجليزية -> الإسبانية |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| الصينية -> الإنجليزية | الصينية -> الفرنسية |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| الصينية -> الألمانية | الصينية -> البرتغالية |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| الصينية -> الإندونيسية | الصينية -> الفيتنامية |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## البدء السريع

### الطريقة الأولى: Chrome Web Store (موصى بها)

[انقر للانتقال إلى Chrome Web Store والتثبيت](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### الطريقة الثانية: التثبيت في وضع المطور

1. افتح [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases)، وحمّل أحدث ملف zip وافك ضغطه.
2. أدخل `chrome://extensions/` في شريط عنوان Chrome، وفعّل «وضع المطور» (Developer Mode) في أعلى الزاوية.
3. انقر «Load unpacked» (تحميل إضافة غير مضغوطة)، واختر المجلد بعد فك الضغط.

بعد التثبيت انقر أيقونة الإضافة في شريط أدوات المتصفح: اختر أولا لغة الهدف (`Translate titles into`)، ثم اختر مزود AI والصق API Key، وبعد الحفظ حدّث صفحة YouTube. يمكنك أيضا الاستخدام مباشرة بدون Key؛ راجع قسم «الترجمة المدمجة» أدناه.

## شرح الإعدادات

![واجهة إعدادات الإضافة](screenshots/v8.0.1/config-ui.png)

| المنطقة | الوظيفة |
|------|------|
| `Interface language` (لغة الواجهة) | لغة عرض واجهة الإعدادات (14 لغة)، لا تؤثر في صفحة YouTube ولا في لغة الترجمة الهدف |
| مفتاح `Translation` (الترجمة) | تشغيل الترجمة التلقائية للعناوين في صفحات YouTube أو إيقافها؛ وعند الإيقاف تُزال الترجمات المعروضة من الصفحة |
| `Translate titles into` (ترجمة العناوين إلى) | لغة الهدف لترجمة العناوين، والافتراضية هي الإنجليزية |
| `Choose AI provider` (اختر مزود الذكاء الاصطناعي) | اختيار مزود AI؛ الافتراضي والموصى به هو DeepSeek، وتظهر نقطة خضراء في الزاوية السفلية من بطاقة المزود الذي حُفظ مفتاحه |
| `Model settings` (إعدادات النموذج) | اختيار إصدار النموذج، أو اختيار «Other» (أخرى) لإدخال معرّف النموذج يدويا |
| `API Key` | المفتاح الذي حصلت عليه من المزود المعني، يُحفظ محليا فقط |
| `Custom endpoint` (نقطة نهاية مخصصة) | للاتصال بخدمات متوافقة مثل OpenRouter وSiliconFlow وVolcengine Ark وOllama وLM Studio |
| `Save settings` (حفظ) | حفظ الإعدادات، ويُنصح بتحديث صفحة YouTube بعد الحفظ |
| `Test configuration` | اختبار صلاحية الإعدادات الحالية؛ عند النجاح تُعرض ترجمة نموذجية مباشرة، وعند الفشل يظهر السبب (Key غير صالح / الرصيد غير كاف / اسم النموذج خاطئ / مشكلة في الشبكة) |
| `Clear translation cache` | مسح ذاكرة الترجمة المؤقتة المحلية (مع عرض عدد العناصر الحالية)؛ الذاكرة مميزة حسب لغة الهدف، فتبديل اللغات لا يؤثر في بعضها |

## لا تملك API Key؟ استخدم الترجمة المدمجة

عندما لا يكون أي Key مهيأ، تحاول الإضافة تلقائيا استخدام Translator / LanguageDetector المدمجين في Chrome 138+: تتم الترجمة على جهازك، دون رفع أي نص ودون أي تكلفة. أما أزواج اللغات التي لا يدعمها الجهاز فتظهر لها رسالة إرشاد «يرجى إعداد الإضافة»، وبعد تهيئة Key لأي مزود AI يمكن ترجمة جميع اللغات المدعومة.

الترجمة المدمجة لا تملك قدرة تصنيف وسوم المحتوى، لذا يظهر في موضع الوسم «على الجهاز / On-device».

## المزودون والنماذج وAPI Key

| المزود | النماذج المدمجة | رابط طلب Key |
|--------|----------|--------------|
| DeepSeek (موصى به) | `deepseek-v4-flash`، `deepseek-v4-pro`، `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`، `gpt-5.4-mini`، `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`، `gemini-3-pro-preview`، `gemini-3-flash-preview`، `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`، `claude-opus-4-6`، `claude-sonnet-4-6`، `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`، `MiniMax-M2.7`، `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`، `glm-5.1-flash`، `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`، `kimi-k2.6-turbo`، `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

الإضافة نفسها مجانية؛ أما المزودون فيحاسبون حسب استهلاك API وفقا لقواعد منصاتهم.

### نقطة النهاية المخصصة (Custom endpoint)

اختيار `Custom` يتيح الاتصال بأي خدمة متوافقة مع صيغة OpenAI Chat Completions، ويلزم ملء:

- `API Endpoint`: عنوان الواجهة الكامل، مثل `https://openrouter.ai/api/v1/chat/completions`
- `Model name`: معرّف النموذج الذي يطلبه المزود، مثل `openai/gpt-5.4-mini`
- `API Key`: مفتاح المزود المعني

عند حفظ نطاق جديد لأول مرة يعرض Chrome تأكيدا للإذن، وهو ضروري لكي تصل الإضافة إلى ذلك المزود مباشرة. يجب أن تستخدم نقاط النهاية المخصصة HTTPS (باستثناء تصحيح `localhost` على الجهاز).

## اللغات المدعومة

**لغات الهدف (12 لغة)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**لغات الواجهة (14 لغة)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**لغات المصدر**: لا حاجة للاختيار؛ تتعرف الإضافة تلقائيا على لغات العناوين الشائعة مثل الإنجليزية والصينية واليابانية والكورية والتايلاندية والإسبانية والفرنسية والألمانية والبرتغالية والإندونيسية والفيتنامية والروسية والعربية والهندية.

## الخصوصية والبيانات

```text
API Key / لغة الهدف / لغة الواجهة / إعدادات المزود -> التخزين المحلي في Chrome
نص العنوان                                        -> يُرسل فقط إلى مزود AI الذي اخترته بنفسك
                                                  -> لا يمر عبر خوادم المطور
```

الإضافة لا تجمع أي بيانات: تُكتب الإعدادات في التخزين المحلي للمتصفح الحالي، ويُرسل نص العنوان مباشرة إلى المزود الذي هيأته لغرض الترجمة. وعند استخدام الترجمة المدمجة لا يغادر النص جهازك.

## دليل المطور

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

فعّل وضع المطور في `chrome://extensions/`، واختر «Load unpacked» ثم حدد مجلد المشروع. بعد تعديل الشيفرة انقر زر التحديث على بطاقة الإضافة، ثم حدّث صفحة YouTube لتسري التغييرات.

تشغيل الاختبارات (Node 18+، بدون تبعيات خارجية):

```bash
npm test
```

التقنيات: Manifest V3 (Content Script + Background Service Worker)، وHTML/CSS/JS أصيلة، وChrome Storage Local API، دون أي خطوة بناء.

## الملاحظات والدعم

- الإبلاغ عن الأخطاء واقتراح الميزات: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- التواصل عبر البريد: garyzhang345@gmail.com

## الترخيص

هذا المشروع مفتوح المصدر بموجب MIT License؛ للتفاصيل راجع [LICENSE](LICENSE).

*آخر تحديث: 5 سبتمبر 2026*
