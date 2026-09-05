# AI Title Translator - AI Bilingual YouTube Titles

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

A Chrome extension that translates YouTube video titles with AI. The translation replaces the original title in place, while the original stays below in smaller text. Browse with the original side by side — quickly tell what a video is about, and learn how real titles are written in other languages. Free and open source; API keys and settings live only in your own browser.

## Recent Updates (v8.0.3)

- **Works without an API key**: when no key is configured, it automatically falls back to the on-device translation built into Chrome 138+, so you can get started at zero cost
- **Click to retry failed translations**: failed titles show a red indicator; click once to translate again
- **Fixed "malformed model response" caused by DeepSeek V4 thinking mode**: the V4 series enables thinking by default, and the chain of thought could exhaust the output budget and truncate the JSON; thinking is now disabled for V4 models
- The popup adds a Clear translation cache button (with entry count); provider cards with a saved key show a green dot; Test configuration now displays a sample translation directly
- Added 12 new localization languages, bringing the interface to 14 languages

## Key Features

| Feature | What it does |
|---------|--------------|
| Translation + original comparison | The translation is shown as the main title, with the original kept below, for quick browsing and language learning |
| AI context translation | Not word-by-word replacement — it understands memes, tone, abbreviations, and clickbait phrasing in titles |
| Topic tags | Automatically generates content tags such as Tech, News, Music, and Finance, so you can see the category before deciding to click |
| Multilingual translation | Automatically detects common source languages and translates into 12 target languages; titles already in the target language are skipped |
| Multiple AI providers | Built-in DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI, and Kimi, plus custom OpenAI-compatible endpoints |
| Built-in translation without a key | Uses Chrome's built-in Translator when no key is configured — runs on-device, free, and uploads no text |
| Local cache and privacy | Translations are cached locally to avoid repeat requests; API keys and settings stay in this browser only |

## Demo

| English -> Japanese | English -> Korean |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| English -> Thai | English -> Spanish |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Chinese -> English | Chinese -> French |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Chinese -> German | Chinese -> Portuguese |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Chinese -> Indonesian | Chinese -> Vietnamese |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Quick Start

### Option 1: Chrome Web Store (Recommended)

[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Option 2: Developer Mode Installation

1. Open [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), download the latest zip, and unzip it.
2. Enter `chrome://extensions/` in the Chrome address bar and enable "Developer mode" in the top-right corner.
3. Click "Load unpacked" and select the unzipped folder.

After installing, click the extension icon in the browser toolbar: first choose the target language (`Translate titles into`), then choose an AI provider and paste your API key, save, and refresh the YouTube page. You can also use it without a key — see "Built-in Translation" below.

## Settings

![Extension settings UI](screenshots/v8.0.1/config-ui.png)

| Area | Purpose |
|------|---------|
| Interface language | Display language of the settings UI (14 languages); does not affect the YouTube page or the translation target |
| Translation switch | Whether to automatically translate titles on YouTube pages; pausing removes already-rendered translations from the page |
| Translate titles into | Target language for title translation; defaults to English |
| Choose AI provider | Select an AI provider; DeepSeek is the default and recommended option; provider cards with a saved key show a green dot in the bottom-right corner |
| Model settings | Choose a model version, or pick "Other model (enter manually)" to enter a model ID yourself |
| API Key | The key you obtained from the provider; stored only locally |
| Custom endpoint | Connect to compatible services such as OpenRouter, SiliconFlow, Volcengine Ark, Ollama, and LM Studio |
| Save settings | Save the configuration; refreshing YouTube pages after saving is recommended |
| Test configuration | Test whether the current configuration works; on success a sample translation is shown directly, and on failure the cause is indicated (invalid key / quota exhausted / wrong model name / network error) |
| Clear translation cache | Clear the local translation cache (shows the current entry count); the cache is separated by target language, so switching languages does not affect each other |

## No API Key? Use the Built-in Translation

When no key is configured, the extension automatically tries the Translator / LanguageDetector built into Chrome 138+: translation runs entirely on your device, uploads no text, and costs nothing. Less common language pairs not supported on-device will show a "please configure the extension" prompt; once you add a key for any AI provider, all supported languages can be translated.

The built-in translation cannot classify topic tags, so the tag area shows "On-device".

## Providers, Models, and API Keys

| Provider | Built-in models | Where to get a key |
|----------|-----------------|--------------------|
| DeepSeek (Recommended) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

The extension itself is free; each provider bills by API usage according to its own platform rules.

### Custom Endpoints

Choose `Custom` to connect to any service compatible with the OpenAI Chat Completions format. Required fields:

- `API Endpoint`: the full request URL, for example `https://openrouter.ai/api/v1/chat/completions`
- `Model name`: the model ID required by the provider, for example `openai/gpt-5.4-mini`
- `API Key`: the key for that provider

The first time you save a new domain, Chrome will show a permission prompt, which is required for the extension to access that provider directly. Custom endpoints must use HTTPS (except local `localhost` debugging).

## Supported Languages

**Target languages (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Interface languages (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Source languages**: no selection needed — automatically detects common title languages such as English, Chinese, Japanese, Korean, Thai, Spanish, French, German, Portuguese, Indonesian, Vietnamese, Russian, Arabic, and Hindi.

## Privacy and Data

```text
API Key / target language / interface language / provider settings -> Chrome local storage
Title text                                                         -> sent only to the AI provider you chose
                                                                   -> never passes through the developer's server
```

The extension collects no data: settings are written to this browser's local storage, and title text is sent directly to the provider you configured for translation. When using the built-in translation, text never leaves your device.

## Developer Guide

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

Enable Developer mode at `chrome://extensions/` and use "Load unpacked" to select the project folder. After editing code, click the reload button on the extension card, then refresh the YouTube page to apply.

Run tests (Node 18+, no third-party dependencies):

```bash
npm test
```

Tech stack: Manifest V3 (Content Script + Background Service Worker), vanilla HTML/CSS/JS, Chrome Storage Local API, no build step.

## Feedback and Support

- Bug reports and feature requests: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- Email: garyzhang345@gmail.com

## License

This project is open source under the MIT License. See [LICENSE](LICENSE) for details.

*Last updated: September 5, 2026*
