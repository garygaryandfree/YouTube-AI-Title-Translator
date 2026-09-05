# AI शीर्षक अनुवादक - AI से द्विभाषी YouTube शीर्षक

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

एक Chrome एक्सटेंशन: YouTube वीडियो शीर्षकों का AI से अनुवाद करता है — अनुवाद सीधे मूल जगह पर दिखता है, मूल शीर्षक छोटा करके नीचे रहता है। ब्राउज़ करते समय तुलना करें: वीडियो किस बारे में है, यह जल्दी समझें, साथ ही दूसरी भाषाओं के असली शीर्षक-अंदाज़ भी सीखें। मुफ़्त और ओपन सोर्स; API Key और सेटिंग केवल आपके अपने ब्राउज़र में रहती हैं।

## हालिया अपडेट (v8.0.3)

- **बिना API Key के भी काम करता है**: Key कॉन्फ़िगर न होने पर, Chrome 138+ के बिल्ट-इन ऑन-डिवाइस अनुवाद पर अपने आप स्विच हो जाता है — बिना किसी लागत के तुरंत शुरू करें
- **अनुवाद विफल होने पर क्लिक करके पुनः प्रयास करें**: विफल शीर्षक पर लाल संकेत दिखता है, एक क्लिक पर दोबारा अनुवाद हो जाता है
- **DeepSeek V4 थिंकिंग मोड से आने वाली "मॉडल रिस्पॉन्स फ़ॉर्मैट त्रुटि" ठीक की गई**: V4 सीरीज़ में थिंकिंग डिफ़ॉल्ट रूप से चालू रहती है; चेन-ऑफ-थॉट आउटपुट कोटा खत्म कर देती है जिससे JSON कट जाता है — अब V4 मॉडलों के लिए थिंकिंग बंद कर दी गई है
- popup में अनुवाद कैश साफ़ करने का बटन जोड़ा गया (एंट्री संख्या सहित); सहेजी Key वाले प्रदाता कार्ड पर हरा डॉट दिखता है; कॉन्फ़िगरेशन टेस्ट करने पर सीधे एक नमूना अनुवाद दिखता है
- 12 नई लोकलाइज़ेशन भाषाएँ जोड़ी गईं, इंटरफ़ेस भाषाएँ अब कुल 14

## मुख्य विशेषताएँ

| क्षमता | विवरण |
|------|------|
| अनुवाद + मूल शीर्षक साथ-साथ | अनुवाद मुख्य शीर्षक के रूप में दिखता है, मूल शीर्षक नीचे रहता है — तेज़ ब्राउज़िंग और भाषा सीखने दोनों के लिए सुविधाजनक |
| AI संदर्भ-आधारित अनुवाद | शब्द-दर-शब्द बदलाव नहीं; शीर्षक के मीम, टोन, संक्षिप्ताक्षर और क्लिकबेट अंदाज़ को समझता है |
| कंटेंट टैग | टेक, समाचार, संगीत, वित्त जैसे कंटेंट टैग अपने आप बनाता है — पहले श्रेणी देखें, फिर तय करें कि खोलना है या नहीं |
| बहुभाषी अनुवाद | सामान्य स्रोत भाषाएँ अपने आप पहचानता है, 12 लक्ष्य भाषाओं में अनुवाद कर सकता है; पहले से लक्ष्य भाषा में मौजूद शीर्षक अपने आप छोड़ देता है |
| कई AI प्रदाता | DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI, Kimi बिल्ट-इन; कस्टम OpenAI-संगत endpoint सपोर्टेड |
| बिना Key बिल्ट-इन अनुवाद | Key कॉन्फ़िगर न होने पर Chrome के बिल्ट-इन Translator का उपयोग — डिवाइस पर चलता है, मुफ़्त, टेक्स्ट अपलोड नहीं होता |
| लोकल कैश और निजता | अनुवाद लोकल रूप से कैश होते हैं ताकि दोहराव वाले अनुरोध न हों; API Key और सेटिंग केवल मौजूदा ब्राउज़र में रहती हैं |

## डेमो

| अंग्रेज़ी -> जापानी | अंग्रेज़ी -> कोरियाई |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| अंग्रेज़ी -> थाई | अंग्रेज़ी -> स्पेनिश |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| चीनी -> अंग्रेज़ी | चीनी -> फ़्रेंच |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| चीनी -> जर्मन | चीनी -> पुर्तगाली |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| चीनी -> इंडोनेशियाई | चीनी -> वियतनामी |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## क्विक स्टार्ट

### तरीका 1: Chrome वेब स्टोर (अनुशंसित)

[Chrome वेब स्टोर से इंस्टॉल करने के लिए यहाँ क्लिक करें](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### तरीका 2: डेवलपर मोड से इंस्टॉल

1. [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases) खोलें, नवीनतम संस्करण की zip डाउनलोड करके अनज़िप करें।
2. Chrome एड्रेस बार में `chrome://extensions/` टाइप करें, ऊपर दाईं ओर "डेवलपर मोड" चालू करें।
3. "Load unpacked" (अनपैक किया हुआ एक्सटेंशन लोड करें) पर क्लिक करें और अनज़िप किया हुआ फ़ोल्डर चुनें।

इंस्टॉल करने के बाद ब्राउज़र टूलबार में एक्सटेंशन आइकन पर क्लिक करें: पहले लक्ष्य भाषा चुनें (`Translate titles into` / शीर्षक का अनुवाद), फिर AI प्रदाता चुनकर API Key पेस्ट करें, सहेजने के बाद YouTube पेज रीफ़्रेश करें। बिना Key के भी सीधे इस्तेमाल किया जा सकता है — विवरण के लिए नीचे "बिल्ट-इन अनुवाद" देखें।

## कॉन्फ़िगरेशन विवरण

![एक्सटेंशन कॉन्फ़िगरेशन UI](screenshots/v8.0.1/config-ui.png)

| क्षेत्र | कार्य |
|------|------|
| Interface language（इंटरफ़ेस भाषा） | कॉन्फ़िगरेशन UI की डिस्प्ले भाषा (14 भाषाएँ); YouTube पेज और अनुवाद लक्ष्य पर कोई असर नहीं |
| Translation स्विच（अनुवाद） | YouTube पेज पर शीर्षक अपने आप अनुवाद हों या नहीं; रोकने पर पेज पर पहले से रेंडर किए गए अनुवाद हटा दिए जाते हैं |
| Translate titles into（शीर्षक का अनुवाद） | शीर्षक अनुवाद की लक्ष्य भाषा, डिफ़ॉल्ट अंग्रेज़ी |
| Choose AI provider（AI प्रदाता चुनें） | AI प्रदाता चुनें — डिफ़ॉल्ट और अनुशंसित DeepSeek; सहेजी Key वाले प्रदाता कार्ड के नीचे दाएँ कोने में हरा डॉट दिखता है |
| Model settings（मॉडल सेटिंग） | मॉडल संस्करण चुनें, या "Other" चुनकर मॉडल ID मैन्युअल रूप से दर्ज करें |
| API Key | संबंधित प्रदाता से मिली आपकी Key, केवल लोकल रूप से सहेजी जाती है |
| Custom endpoint（कस्टम endpoint） | OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio जैसी संगत सेवाएँ जोड़ें |
| Save settings（सहेजें） | कॉन्फ़िगरेशन सहेजें; सहेजने के बाद YouTube पेज रीफ़्रेश करने की सलाह दी जाती है |
| Test configuration | मौजूदा कॉन्फ़िगरेशन काम करता है या नहीं, यह जाँचें; सफलता पर सीधे एक नमूना अनुवाद दिखता है; विफलता पर कारण के अनुसार संकेत (Key अमान्य / कोटा अपर्याप्त / मॉडल नाम गलत / नेटवर्क त्रुटि) |
| Clear translation cache | लोकल अनुवाद कैश साफ़ करें (वर्तमान कैश एंट्री संख्या दिखती है); कैश लक्ष्य भाषा के अनुसार अलग-अलग होता है, भाषा बदलने पर एक-दूसरे पर असर नहीं पड़ता |

## API Key नहीं है? बिल्ट-इन अनुवाद इस्तेमाल करें

बिना कोई Key कॉन्फ़िगर किए, एक्सटेंशन अपने आप Chrome 138+ के बिल्ट-इन Translator / LanguageDetector का उपयोग करने की कोशिश करता है: अनुवाद आपके डिवाइस पर ही पूरा होता है — टेक्स्ट अपलोड नहीं होता, कोई शुल्क नहीं लगता। ऑन-डिवाइस समर्थित न होने वाले दुर्लभ भाषा-युग्मों पर "कृपया एक्सटेंशन कॉन्फ़िगर करें" का संकेत दिखता है; किसी भी AI प्रदाता की Key कॉन्फ़िगर करने के बाद सभी समर्थित भाषाओं का अनुवाद संभव है।

बिल्ट-इन अनुवाद में कंटेंट टैग वर्गीकरण की क्षमता नहीं है; टैग की जगह "डिवाइस पर / On-device" दिखता है।

## प्रदाता, मॉडल और API Key

| प्रदाता | बिल्ट-इन मॉडल | Key आवेदन लिंक |
|--------|----------|--------------|
| DeepSeek (अनुशंसित) | `deepseek-v4-flash`、`deepseek-v4-pro`、`deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`、`gpt-5.4-mini`、`gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`、`gemini-3-pro-preview`、`gemini-3-flash-preview`、`gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`、`claude-opus-4-6`、`claude-sonnet-4-6`、`claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`、`MiniMax-M2.7`、`MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`、`glm-5.1-flash`、`glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`、`kimi-k2.6-turbo`、`kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

एक्सटेंशन स्वयं मुफ़्त है; प्रत्येक प्रदाता API उपयोग के अनुसार शुल्क लेता है — अपने-अपने प्लेटफ़ॉर्म के नियम लागू होते हैं।

### कस्टम endpoint

`Custom` चुनने पर OpenAI Chat Completions फ़ॉर्मैट से संगत कोई भी सेवा जोड़ी जा सकती है। ये फ़ील्ड भरने होंगे:

- `API Endpoint`: पूरा एंडपॉइंट पता, उदाहरण `https://openrouter.ai/api/v1/chat/completions`
- `Model name`: प्रदाता द्वारा माँगा गया मॉडल ID, उदाहरण `openai/gpt-5.4-mini`
- `API Key`: संबंधित प्रदाता की Key

नया डोमेन पहली बार सहेजते समय Chrome अनुमति की पुष्टि माँगता है — एक्सटेंशन के उस प्रदाता से सीधे जुड़ने के लिए यह आवश्यक है। कस्टम endpoint में HTTPS अनिवार्य है (लोकल `localhost` डिबगिंग अपवाद है)।

## समर्थित भाषाएँ

**लक्ष्य भाषाएँ (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**इंटरफ़ेस भाषाएँ (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**स्रोत भाषा**: चुनने की ज़रूरत नहीं — अंग्रेज़ी, चीनी, जापानी, कोरियाई, थाई, स्पेनिश, फ़्रेंच, जर्मन, पुर्तगाली, इंडोनेशियाई, वियतनामी, रूसी, अरबी, हिन्दी समेत सामान्य शीर्षक भाषाएँ अपने आप पहचानी जाती हैं।

## निजता और डेटा

```text
API Key / लक्ष्य भाषा / इंटरफ़ेस भाषा / प्रदाता सेटिंग -> Chrome लोकल स्टोरेज
शीर्षक टेक्स्ट                                         -> केवल आपके चुने हुए AI प्रदाता को भेजा जाता है
                                                       -> डेवलपर के सर्वर से होकर नहीं गुज़रता
```

एक्सटेंशन कोई डेटा एकत्र नहीं करता: सेटिंग मौजूदा ब्राउज़र के लोकल स्टोरेज में लिखी जाती हैं, शीर्षक टेक्स्ट अनुवाद के लिए सीधे आपके कॉन्फ़िगर किए प्रदाता को भेजा जाता है। बिल्ट-इन अनुवाद इस्तेमाल करने पर टेक्स्ट आपका डिवाइस नहीं छोड़ता।

## डेवलपर गाइड

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

`chrome://extensions/` पर डेवलपर मोड चालू करें, "Load unpacked" से प्रोजेक्ट फ़ोल्डर चुनें। कोड बदलने के बाद एक्सटेंशन कार्ड पर रीलोड बटन दबाएँ, फिर YouTube पेज रीफ़्रेश करने पर बदलाव लागू होगा।

टेस्ट चलाएँ (Node 18+, कोई थर्ड-पार्टी डिपेंडेंसी नहीं):

```bash
npm test
```

टेक स्टैक: Manifest V3 (Content Script + Background Service Worker), वेनिला HTML/CSS/JS, Chrome Storage Local API — कोई बिल्ड डिपेंडेंसी नहीं।

## फ़ीडबैक और सहायता

- बग रिपोर्ट और फ़ीचर सुझाव: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- ईमेल संपर्क: garyzhang345@gmail.com

## लाइसेंस

यह प्रोजेक्ट MIT License के तहत ओपन सोर्स है; विवरण के लिए [LICENSE](LICENSE) देखें।

*अंतिम अपडेट: 5 सितंबर 2026*
