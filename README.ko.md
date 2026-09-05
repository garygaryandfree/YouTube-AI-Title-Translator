# YouTube 제목 번역 - AI 이중 언어 제목

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

YouTube 동영상 제목을 AI로 번역하는 Chrome 확장 프로그램입니다. 번역문이 원래 제목 위치에 바로 표시되고, 원문은 작게 아래에 유지됩니다. 탐색하면서 대조할 수 있어 동영상 내용을 빠르게 파악할 수 있고, 다른 언어의 실제 제목 표현도 배울 수 있습니다. 무료 오픈 소스이며, API Key와 설정은 사용자의 브라우저에만 저장됩니다.

## 최근 업데이트 (v8.0.3)

- **API Key 없이도 사용 가능**: 키를 설정하지 않으면 Chrome 138+에 내장된 온디바이스 번역을 자동으로 사용하여 비용 없이 바로 시작할 수 있습니다
- **번역 실패 시 클릭하여 재시도**: 실패한 제목에 빨간색 안내가 표시되며, 클릭 한 번으로 다시 번역할 수 있습니다
- **DeepSeek V4 사고 모드로 인한 "모델 응답 형식 오류" 수정**: V4 시리즈는 사고(thinking)가 기본으로 켜져 있어 사고 체인이 출력 한도를 소진해 JSON이 잘리는 문제가 있었으며, 이제 V4 모델에서는 사고 모드를 껐습니다
- popup에 번역 캐시 지우기 버튼 추가(항목 수 표시); Key가 저장된 제공업체 카드에 녹색 점 표시; 설정 테스트 시 샘플 번역을 바로 표시합니다
- 12개 현지화 언어가 추가되어 인터페이스 언어가 총 14개가 되었습니다

## 핵심 기능

| 기능 | 설명 |
|------|------|
| 번역문 + 원문 대조 | 번역문을 메인 제목으로 표시하고 원문을 아래에 유지하여, 빠른 탐색과 언어 학습에 편리합니다 |
| AI 문맥 번역 | 단어를 기계적으로 바꾸는 것이 아니라 제목 속 밈, 어조, 축약어, 낚시성 표현까지 이해합니다 |
| 콘텐츠 태그 | 기술, 뉴스, 음악, 금융 등의 콘텐츠 태그를 자동으로 생성하여, 유형을 먼저 보고 클릭할지 결정할 수 있습니다 |
| 다국어 상호 번역 | 일반적인 원문 언어를 자동으로 인식하고 12개 대상 언어로 번역할 수 있습니다. 이미 대상 언어인 제목은 자동으로 건너뜁니다 |
| 다양한 AI 제공업체 | DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI, Kimi를 내장하고, 사용자 지정 OpenAI 호환 엔드포인트를 지원합니다 |
| 키 없이 쓰는 내장 번역 | 키를 설정하지 않으면 Chrome 내장 Translator를 사용하며, 기기에서 실행되어 무료이고 텍스트를 업로드하지 않습니다 |
| 로컬 캐시와 개인정보 보호 | 번역문을 로컬에 캐시해 중복 요청을 피하고, API Key와 설정은 현재 브라우저에만 저장됩니다 |

## 데모

| 영어 -> 일본어 | 영어 -> 한국어 |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| 영어 -> 태국어 | 영어 -> 스페인어 |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| 중국어 -> 영어 | 중국어 -> 프랑스어 |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| 중국어 -> 독일어 | 중국어 -> 포르투갈어 |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| 중국어 -> 인도네시아어 | 중국어 -> 베트남어 |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## 빠른 시작

### 방법 1: Chrome 웹 스토어(권장)

[Chrome 웹 스토어에서 설치하기](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### 방법 2: 개발자 모드로 설치

1. [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases)를 열어 최신 버전의 zip을 다운로드하고 압축을 풉니다.
2. Chrome 주소창에 `chrome://extensions/`를 입력하고 오른쪽 상단의 "개발자 모드"를 켭니다.
3. "압축해제된 확장 프로그램을 로드합니다"를 클릭하고 압축을 푼 폴더를 선택합니다.

설치 후 브라우저 툴바의 확장 프로그램 아이콘을 클릭하세요. 먼저 대상 언어(`Translate titles into`, 한국어 UI에서는 "제목 번역 대상")를 선택하고, AI 제공업체를 선택한 뒤 API Key를 붙여넣고 저장한 후 YouTube 페이지를 새로고침하면 됩니다. 키가 없어도 바로 사용할 수 있으며, 자세한 내용은 아래 "내장 번역" 섹션을 참조하세요.

## 설정 안내

![확장 프로그램 설정 화면](screenshots/v8.0.1/config-ui.png)

| 영역 | 기능 |
|------|------|
| Interface language(인터페이스 언어) | 설정 화면의 표시 언어(14개)로, YouTube 페이지와 번역 대상에는 영향을 주지 않습니다 |
| Translation(번역) 스위치 | YouTube 페이지에서 제목을 자동으로 번역할지 여부. 일시 중지하면 페이지에 이미 렌더링된 번역문이 제거됩니다 |
| Translate titles into(제목 번역 대상) | 제목 번역 대상 언어, 기본값은 영어입니다 |
| Choose AI provider(AI 제공업체 선택) | AI 제공업체를 선택합니다. 기본값이자 권장은 DeepSeek입니다. Key가 저장된 제공업체 카드 오른쪽 아래에 녹색 점이 표시됩니다 |
| Model settings(모델 설정) | 모델 버전을 선택하거나, "Other model (enter manually)"을 선택해 모델 ID를 직접 입력합니다 |
| API Key | 해당 제공업체에서 발급받은 키로, 로컬에만 저장됩니다 |
| Custom endpoint(사용자 지정 엔드포인트) | OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio 등 호환 서비스에 연결합니다 |
| Save settings(저장) | 설정을 저장합니다. 저장 후 YouTube 페이지를 새로고침하는 것이 좋습니다 |
| Test configuration | 현재 설정을 사용할 수 있는지 테스트합니다. 성공하면 샘플 번역을 바로 보여주고, 실패하면 원인별로 안내합니다(Key 무효 / 할당량 부족 / 모델 이름 오류 / 네트워크 오류) |
| Clear translation cache | 로컬 번역 캐시를 지웁니다(현재 캐시 항목 수 표시). 캐시는 대상 언어별로 구분되므로 언어를 바꿔도 서로 영향을 주지 않습니다 |

## API Key가 없나요? 내장 번역 사용하기

키를 하나도 설정하지 않으면 확장 프로그램이 Chrome 138+에 내장된 Translator / LanguageDetector를 자동으로 시도합니다. 번역은 사용자 기기에서 완료되며 텍스트를 업로드하지 않고 비용도 발생하지 않습니다. 기기에서 지원하지 않는 드문 언어 쌍에는 "확장 프로그램을 설정하세요" 안내가 표시되며, 아무 AI 제공업체의 Key나 설정하면 지원하는 모든 언어를 번역할 수 있습니다.

내장 번역에는 콘텐츠 태그 분류 기능이 없으므로 태그 위치에 "기기 내 / On-device"가 표시됩니다.

## 제공업체, 모델 및 API Key

| 제공업체 | 내장 모델 | 키 발급 링크 |
|--------|----------|--------------|
| DeepSeek(권장) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

확장 프로그램 자체는 무료이며, 각 제공업체는 API 사용량에 따라 자체 플랫폼 규정에 따라 요금을 부과합니다.

### 사용자 지정 엔드포인트

`Custom`(사용자 지정)을 선택하면 OpenAI Chat Completions 형식과 호환되는 모든 서비스에 연결할 수 있습니다. 다음을 입력해야 합니다:

- `API Endpoint`(API 엔드포인트): 전체 API 주소, 예: `https://openrouter.ai/api/v1/chat/completions`
- `Model name`(모델 이름): 제공업체가 요구하는 모델 ID, 예: `openai/gpt-5.4-mini`
- `API Key`: 해당 제공업체의 키

새 도메인을 처음 저장할 때 Chrome이 권한 확인을 표시하는데, 이는 확장 프로그램이 해당 제공업체에 직접 접근하는 데 필요합니다. 사용자 지정 엔드포인트는 반드시 HTTPS를 사용해야 합니다(로컬 `localhost` 디버깅 제외).

## 지원 언어

**대상 언어(12개)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**인터페이스 언어(14개)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**원문 언어**: 선택할 필요가 없으며, 영어, 중국어, 일본어, 한국어, 태국어, 스페인어, 프랑스어, 독일어, 포르투갈어, 인도네시아어, 베트남어, 러시아어, 아랍어, 힌디어 등 일반적인 제목 언어를 자동으로 인식합니다.

## 개인정보 및 데이터

```text
API Key / 대상 언어 / 인터페이스 언어 / 제공업체 설정 -> Chrome 로컬 저장소
제목 텍스트                                             -> 직접 선택한 AI 제공업체에만 전송
                                                         -> 개발자 서버를 거치지 않음
```

확장 프로그램은 어떤 데이터도 수집하지 않습니다. 설정은 현재 브라우저의 로컬 저장소에 기록되고, 제목 텍스트는 번역을 위해 사용자가 설정한 제공업체로 직접 전송됩니다. 내장 번역을 사용할 때는 텍스트가 기기를 떠나지 않습니다.

## 개발자 가이드

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

`chrome://extensions/`에서 개발자 모드를 켜고, "압축해제된 확장 프로그램을 로드합니다"로 프로젝트 폴더를 선택합니다. 코드를 수정한 후 확장 프로그램 카드의 새로고침 버튼을 클릭하고 YouTube 페이지를 새로고침하면 적용됩니다.

테스트 실행(Node 18+, 서드파티 의존성 없음):

```bash
npm test
```

기술 스택: Manifest V3(Content Script + Background Service Worker), 바닐라 HTML/CSS/JS, Chrome Storage Local API, 빌드 의존성 없음.

## 피드백 및 지원

- 버그 신고 및 기능 제안: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- 이메일: garyzhang345@gmail.com

## 라이선스

이 프로젝트는 MIT License로 오픈 소스로 제공됩니다. 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

*최종 업데이트: 2026년 9월 5일*
