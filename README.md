# YouTube 标题翻译 - AI 双语标题

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

一个 Chrome 扩展：用 AI 翻译 YouTube 视频标题，译文直接替换原位置显示，原文缩小保留在下方。边浏览边对照，既能快速判断视频讲什么，也能学习其他语言的真实标题表达。免费开源，API Key 和配置只存在你自己的浏览器里。

## 近期更新（v8.0.3）

- **没有 API Key 也能用**：未配置 Key 时，自动改用 Chrome 138+ 内置的设备端翻译，零成本上手
- **翻译失败可点击重试**：失败标题显示红色提示，点一下即可重新翻译
- **修复 DeepSeek V4 思考模式导致的"模型返回格式异常"**：V4 系列默认开启思考，思维链耗尽输出额度导致 JSON 截断，现已对 V4 模型关闭思考
- popup 新增清除翻译缓存按钮（带条数显示）；已保存 Key 的服务商卡片显示绿点；测试配置时直接展示示例译文
- 新增 12 种本地化语言，界面语言达到 14 种

## 核心功能

| 能力 | 说明 |
|------|------|
| 译文 + 原文对照 | 译文作为主标题显示，原文保留在下方，方便快速浏览和语言学习 |
| AI 语境翻译 | 不是逐词替换，能理解标题里的梗、语气、缩写和标题党表达 |
| 内容标签 | 自动生成 科技、新闻、音乐、财经 等内容标签，先看类型再决定要不要点开 |
| 多语言互译 | 自动识别常见源语言，可翻译成 12 种目标语言；已是目标语言的标题自动跳过 |
| 多 AI 服务商 | 内置 DeepSeek、OpenAI、Gemini、Claude、MiniMax、Z.AI、Kimi，支持自定义 OpenAI 兼容端点 |
| 无 Key 内置翻译 | 未配置 Key 时使用 Chrome 内置 Translator，设备端运行、免费、不上传文本 |
| 本地缓存与隐私 | 译文本地缓存避免重复请求；API Key 与配置只保存在当前浏览器 |

## 效果演示

| 英文 -> 日语 | 英文 -> 韩语 |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| 英文 -> 泰语 | 英文 -> 西班牙语 |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| 中文 -> 英文 | 中文 -> 法语 |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| 中文 -> 德语 | 中文 -> 葡萄牙语 |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| 中文 -> 印尼语 | 中文 -> 越南语 |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## 快速开始

### 方法一：Chrome 应用商店（推荐）

[点击前往 Chrome 应用商店安装](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### 方法二：开发者模式安装

1. 打开 [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases)，下载最新版本的 zip 并解压。
2. 在 Chrome 地址栏输入 `chrome://extensions/`，开启右上角"开发者模式"。
3. 点击"加载已解压的扩展程序"，选择解压后的文件夹。

安装后点击浏览器工具栏的插件图标：先选目标语言（`Translate titles into`），再选 AI 服务商并粘贴 API Key，保存后刷新 YouTube 页面即可。没有 Key 也可以直接使用，详见下文"内置翻译"。

## 配置说明

![插件配置界面](screenshots/v8.0.1/config-ui.png)

| 区域 | 作用 |
|------|------|
| Interface language | 配置界面显示语言（14 种），不影响 YouTube 页面和翻译目标 |
| Translation 开关 | 是否在 YouTube 页面自动翻译标题；暂停时会移除页面上已渲染的译文 |
| Translate titles into | 标题翻译目标语言，默认英文 |
| Choose AI provider | 选择 AI 服务商，默认并推荐 DeepSeek；已保存 Key 的服务商卡片右下角有绿点 |
| Model settings | 选择模型版本，或选"其他"手动填写模型 ID |
| API Key | 你在对应服务商申请的 Key，只保存在本地 |
| Custom endpoint | 接入 OpenRouter、SiliconFlow、火山方舟、Ollama、LM Studio 等兼容服务 |
| Save settings | 保存配置，保存后建议刷新 YouTube 页面 |
| Test configuration | 测试当前配置是否可用，成功时直接展示一条示例译文；失败时按原因提示（Key 无效 / 额度不足 / 模型名错误 / 网络异常） |
| Clear translation cache | 清除本地译文缓存（显示当前缓存条数）；缓存按目标语言区分，切换语言互不影响 |

## 没有 API Key？用内置翻译

在未配置任何 Key 的情况下，扩展会自动尝试 Chrome 138+ 内置的 Translator / LanguageDetector：翻译在你本机完成，不上传文本、不产生费用。设备端不支持的冷门语言对会显示"请配置插件"引导，配置任意一家 AI 服务商的 Key 后即可翻译全部支持语言。

内置翻译没有内容标签分类能力，标签位置会显示"本机 / On-device"。

## 服务商、模型与 API Key

| 服务商 | 内置模型 | Key 申请入口 |
|--------|----------|--------------|
| DeepSeek（推荐） | `deepseek-v4-flash`、`deepseek-v4-pro`、`deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`、`gpt-5.4-mini`、`gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`、`gemini-3-pro-preview`、`gemini-3-flash-preview`、`gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`、`claude-opus-4-6`、`claude-sonnet-4-6`、`claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`、`MiniMax-M2.7`、`MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`、`glm-5.1-flash`、`glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`、`kimi-k2.6-turbo`、`kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

扩展本身免费；各服务商按 API 用量计费，以其平台规则为准。

### 自定义端点

选择 `Custom` 可接入任何兼容 OpenAI Chat Completions 格式的服务，需填写：

- `API Endpoint`：完整接口地址，例如 `https://openrouter.ai/api/v1/chat/completions`
- `Model name`：服务商要求的模型 ID，例如 `openai/gpt-5.4-mini`
- `API Key`：对应服务商的密钥

首次保存新域名时 Chrome 会弹出权限确认，这是扩展直接访问该服务商所必需的。自定义端点必须使用 HTTPS（本机 `localhost` 调试除外）。

## 支持的语言

**目标语言（12 种）**：简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**界面语言（14 种）**：English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**源语言**：无需选择，自动识别英文、中文、日语、韩语、泰语、西班牙语、法语、德语、葡萄牙语、印尼语、越南语、俄语、阿拉伯语、印地语等常见标题语言。

## 隐私与数据

```text
API Key / 目标语言 / 界面语言 / 服务商配置 -> Chrome 本地存储
标题文本                                  -> 只发给你自己选择的 AI 服务商
                                          -> 不经过作者服务器
```

扩展不收集任何数据：配置写入当前浏览器本地存储，标题文本直接发送给你配置的服务商用于翻译。使用内置翻译时，文本不离开本机。

## 开发者指南

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

在 `chrome://extensions/` 开启开发者模式，"加载已解压的扩展程序"选择项目文件夹。修改代码后点击扩展卡片上的刷新按钮，再刷新 YouTube 页面生效。

运行测试（Node 18+，无第三方依赖）：

```bash
npm test
```

技术栈：Manifest V3（Content Script + Background Service Worker）、原生 HTML/CSS/JS、Chrome Storage Local API，无构建依赖。

## 反馈与支持

- Bug 反馈与功能建议：[GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- 邮件联系：garyzhang345@gmail.com

## 开源协议

本项目采用 MIT License 开源，详情见 [LICENSE](LICENSE)。

*最后更新：2026年9月5日*
