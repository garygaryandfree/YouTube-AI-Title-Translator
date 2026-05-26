# AI Title Translator - YouTube タイトルの AI 二言語翻訳

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

AI Title Translator は、YouTube の動画タイトルを AI で翻訳する Chrome 拡張機能です。翻訳タイトルを上に表示し、元タイトルを下に残すため、内容をすばやく理解しながら原文との比較や語学学習にも使えます。

V8 では、中国語への翻訳だけでなく、英語、日本語、韓国語、タイ語、スペイン語、フランス語、ドイツ語、ポルトガル語、インドネシア語、ベトナム語など複数の目標言語を選べます。

## 主な特徴

| 多言語タイトル認識 | 英語、中国語、日本語、韓国語、タイ語、スペイン語、フランス語、ドイツ語、ポルトガル語、インドネシア語、ベトナム語、ロシア語、アラビア語、ヒンディー語などを自動処理 |
|---|---|
| AI 文脈翻訳 | 直訳ではなく、YouTube タイトルの表現、略語、フック、ローカルな文脈を理解 |
| 翻訳 + 原文 | 翻訳を上に、原文を下に表示し、比較と学習に便利 |

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

## 拡張機能の設定画面

![Extension settings UI](screenshots/v8/config-ui.png)

`Interface language` 設定ページの多言語表示を切り替えます. `Translate titles into` chooses the target language for YouTube titles. Turn on `Translation`, choose an AI provider and model, paste your API Key, save, then refresh YouTube.

## Supported languages

**Target languages:** Simplified Chinese / Traditional Chinese / English / Japanese / Korean / Thai / Spanish / French / German / Portuguese / Indonesian / Vietnamese

**Interface languages:** English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

## クイックスタート

Chrome Web Store からインストールするか、GitHub Releases から最新の `YouTube_AI_Title_Translator_v8.0.zip` をダウンロードして、`chrome://extensions/` の Developer Mode で読み込みます.

## API providers

OpenAI, Google Gemini, Claude, DeepSeek, MiniMax, Z.AI, Kimi, and custom OpenAI-compatible endpoints are supported. Gemini presets include `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, and `gemini-2.5-flash`.

## Privacy

API keys, target language, interface language, and provider settings are stored only in Chrome local storage. Title text is sent only to the AI provider configured by the user.

## License

MIT License. See [LICENSE](LICENSE).
