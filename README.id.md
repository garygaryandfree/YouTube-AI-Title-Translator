# AI Title Translator - Judul YouTube bilingual dengan AI

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

AI Title Translator adalah ekstensi Chrome yang menerjemahkan judul YouTube dengan AI. Terjemahan tampil sebagai judul utama dan judul asli tetap di bawahnya untuk perbandingan dan belajar bahasa.

Sejak V8, ekstensi ini dapat menerjemahkan ke Inggris, Jepang, Korea, Thai, Spanyol, Prancis, Jerman, Portugis, Indonesia, Vietnam, dan Tionghoa.

## Fitur utama

| Pengenalan multibahasa | Memproses judul dalam banyak bahasa yang didukung secara otomatis |
|---|---|
| Terjemahan konteks AI | Memahami gaya judul, slang, singkatan, dan konteks lokal |
| Terjemahan + asli | Terjemahan di atas dan judul asli di bawah |

## Demo

| English -> Japanese | English -> Korean |
|---|---|
| ![English to Japanese](screenshots/v8/en-to-ja.png) | ![English to Korean](screenshots/v8/en-to-ko.png) |

| English -> Thai | English -> Spanish |
|---|---|
| ![English to Thai](screenshots/v8/en-to-th.png) | ![English to Spanish](screenshots/v8/en-to-es.png) |

| Chinese -> English | Chinese -> French |
|---|---|
| ![Chinese to English](screenshots/v8/zh-to-en.png) | ![Chinese to French](screenshots/v8/zh-to-fr.png) |

| Chinese -> German | Chinese -> Portuguese |
|---|---|
| ![Chinese to German](screenshots/v8/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8/zh-to-pt.png) |

| Chinese -> Indonesian | Chinese -> Vietnamese |
|---|---|
| ![Chinese to Indonesian](screenshots/v8/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8/zh-to-vi.png) |

## Antarmuka pengaturan

![Extension settings UI](screenshots/v8/config-ui.png)

`Interface language` hanya mengubah bahasa halaman pengaturan. `Translate titles into` chooses the target language for YouTube titles. Turn on `Translation`, choose an AI provider and model, paste your API Key, save, then refresh YouTube.

## Supported languages

**Target languages:** Simplified Chinese / Traditional Chinese / English / Japanese / Korean / Thai / Spanish / French / German / Portuguese / Indonesian / Vietnamese

**Interface languages:** English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

## Mulai cepat

Instal dari Chrome Web Store atau unduh `YouTube_AI_Title_Translator_v8.0.zip` terbaru dari GitHub Releases lalu muat di `chrome://extensions/` dengan Developer Mode.

## API providers

OpenAI, Google Gemini, Claude, DeepSeek, MiniMax, Z.AI, Kimi, and custom OpenAI-compatible endpoints are supported. Gemini presets include `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, and `gemini-2.5-flash`.

## Privacy

API keys, target language, interface language, and provider settings are stored only in Chrome local storage. Title text is sent only to the AI provider configured by the user.

## License

MIT License. See [LICENSE](LICENSE).
