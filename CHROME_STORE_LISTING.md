# Chrome Web Store Listing (v8.0.3 最终版)

商店包：`YouTube_AI_Title_Translator_v8.0.3.zip`（仓库根目录，含全部运行时文件与 14 个语言包）。
素材：`screenshots/chrome-store-upload/`（global 4 张、localized 5 张、promotional 4 张）。

## 简体中文

名称：
YouTube 标题翻译 - 双语标题

简短说明（130 字符内）：
将 YouTube 标题翻译成你选择的语言，译文在上、原文在下对照显示。没有 API Key 也能用 Chrome 内置翻译。

详细说明：
YouTube 标题翻译 - 双语标题 是一款 Chrome 扩展：用 AI 把 YouTube 视频标题翻译成你选择的语言，译文直接显示在原位置，原始标题缩小保留在下方，方便对照理解和语言学习。

【主要功能】
• 译文 + 原文对照：译文作为主标题显示，原文保留在下方
• AI 语境翻译：理解标题里的梗、语气、缩写和标题党表达，不是逐词替换
• 内容标签：自动为标题添加 科技、新闻、音乐、财经 等分类标签，先看类型再决定要不要点开
• 多语言互译：自动识别常见源语言，支持翻译成简体中文、繁体中文、英语、日语、韩语、泰语、西班牙语、法语、德语、葡萄牙语、印尼语、越南语共 12 种目标语言；已是目标语言的标题自动跳过
• 多家 AI 服务商：内置 DeepSeek（推荐）、OpenAI、Gemini、Claude、MiniMax、Z.AI、Kimi，并支持自定义 OpenAI 兼容端点（OpenRouter、SiliconFlow、火山方舟、Ollama、LM Studio 等）
• 没有 API Key 也能用：未配置 Key 时自动使用 Chrome 138+ 内置的设备端翻译，文本不离开本机、不产生费用（此模式无分类标签）
• 翻译失败可点击重试；译文本地缓存，避免重复请求
• 配置界面支持 14 种语言，内置连接测试和一键清除缓存

【隐私与数据】
扩展不收集任何数据。API Key、目标语言、界面语言和服务商配置只保存在你当前浏览器的本地存储中；标题文本只从你的浏览器直接发送给你自己选择的 AI 服务商，不经过开发者服务器。使用内置翻译时，文本完全在本机处理。

【权限说明】
• storage：保存配置与翻译缓存
• YouTube 页面访问：读取标题并展示译文
• AI 服务商域名：向你选择的服务商发起翻译请求
• 自定义端点：仅在你填写自定义接口地址时按需申请授权

【费用】
扩展免费开源（MIT）。各 AI 服务商按 API 用量计费，以其平台规则为准；使用 Chrome 内置翻译完全免费。

## English

Name:
AI Title Translator - YouTube Titles

Short description (within 132 chars):
Translate YouTube titles with AI, keeping originals visible. No API key? Chrome's built-in on-device translation has you covered.

Detailed description:
AI Title Translator shows YouTube video titles in your language. The translation replaces the title in place, with the original kept right below — perfect for scanning foreign-language feeds and for language learning.

KEY FEATURES
• Bilingual display: translation on top, original title below
• Context-aware AI translation: understands memes, tone, abbreviations and clickbait phrasing instead of word-by-word substitution
• Category labels: Tech, News, Music, Finance and more — judge a video before you click
• 12 target languages: Simplified & Traditional Chinese, English, Japanese, Korean, Thai, Spanish, French, German, Portuguese, Indonesian, Vietnamese; source languages are detected automatically, and titles already in your target language are skipped
• Your choice of AI: DeepSeek (recommended), OpenAI, Gemini, Claude, MiniMax, Z.AI, Kimi, plus any custom OpenAI-compatible endpoint (OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio…)
• No API key? No problem: on Chrome 138+, the extension falls back to Chrome's built-in on-device translator — free, offline, nothing leaves your device (no category labels in this mode)
• Click a failed title to retry; translations are cached locally to avoid repeat requests
• Settings UI in 14 languages, with a built-in connection test and one-click cache clearing

PRIVACY
No data collection. API keys, language preferences and provider settings live only in your browser's local storage. Title text goes directly from your browser to the AI provider you chose — never through the developer's server. With built-in translation, text never leaves your device.

PERMISSIONS
• storage: save settings and the translation cache
• youtube.com access: read titles and display translations
• AI provider domains: send translation requests to your chosen provider
• Optional host access: requested only when you configure a custom endpoint

PRICING
Free and open source (MIT). AI providers may charge for API usage per their own terms; Chrome's built-in translation is free.
