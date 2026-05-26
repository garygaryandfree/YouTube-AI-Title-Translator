# AI Title Translator - YouTube 제목 AI 이중 언어 번역

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

AI Title Translator는 YouTube 동영상 제목을 AI로 번역하는 Chrome 확장 프로그램입니다. 번역 제목을 위에 보여주고 원문 제목을 아래에 남겨 빠른 이해와 원문 대조, 언어 학습에 모두 사용할 수 있습니다.

V8부터는 중국어 번역 전용이 아닙니다. 영어, 일본어, 한국어, 태국어, 스페인어, 프랑스어, 독일어, 포르투갈어, 인도네시아어, 베트남어 등 여러 대상 언어를 선택할 수 있습니다.

## 주요 기능

| 다국어 제목 인식 | 영어, 중국어, 일본어, 한국어, 태국어, 스페인어, 프랑스어, 독일어, 포르투갈어, 인도네시아어, 베트남어, 러시아어, 아랍어, 힌디어 등을 자동 처리 |
|---|---|
| AI 문맥 번역 | 직역이 아니라 제목의 뉘앙스, 밈, 약어, 현지 표현을 반영 |
| 번역 + 원문 | 번역은 위에, 원문은 아래에 표시되어 비교와 학습에 편리 |

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

## 확장 프로그램 설정 화면

![Extension settings UI](screenshots/v8/config-ui.png)

`Interface language` 설정 페이지의 다국어 표시를 바꿉니다. `Translate titles into` chooses the target language for YouTube titles. Turn on `Translation`, choose an AI provider and model, paste your API Key, save, then refresh YouTube.

## Supported languages

**Target languages:** Simplified Chinese / Traditional Chinese / English / Japanese / Korean / Thai / Spanish / French / German / Portuguese / Indonesian / Vietnamese

**Interface languages:** English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

## 빠른 시작

Chrome Web Store에서 설치하거나 GitHub Releases에서 최신 `YouTube_AI_Title_Translator_v8.0.zip`을 내려받아 `chrome://extensions/`의 Developer Mode에서 불러옵니다.

## API providers

OpenAI, Google Gemini, Claude, DeepSeek, MiniMax, Z.AI, Kimi, and custom OpenAI-compatible endpoints are supported. Gemini presets include `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, and `gemini-2.5-flash`.

## Privacy

API keys, target language, interface language, and provider settings are stored only in Chrome local storage. Title text is sent only to the AI provider configured by the user.

## License

MIT License. See [LICENSE](LICENSE).
