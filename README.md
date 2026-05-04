# YouTube AI Title Translator - AI 驱动的 YouTube 标题翻译插件

[![GitHub stars](https://img.shields.io/github/stars/garygaryandfree/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/garygaryandfree/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/network)
[![GitHub issues](https://img.shields.io/github/issues/garygaryandfree/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)

一个专门为中文用户设计的 YouTube 视频标题 AI 翻译插件。它不只是把英文标题机械翻成中文，而是用大模型理解标题语境、视频类型和表达习惯，把标题翻成更自然、更有中文味儿的表达。

如果你经常看国外 YouTube 视频，但不想每次都读英文标题，这个插件可以解决 90% 的标题理解问题：打开 YouTube，标题自动翻译，前面还会显示内容标签，帮你一秒判断这个视频到底在讲什么。

## 当前版本：v7.1 清爽配置中心

v7.1 是一次面向日常使用体验的大版本迭代。核心目标不是堆功能，而是让配置过程更清楚、更稳定、更容易被普通用户理解。

本次更新重新设计了整个弹窗配置页：顶部品牌区、翻译开关、AI 服务商选择、模型配置、API Key 输入、高级设置和保存操作都重新排版。界面去掉了旧版偏重的红色光晕和装饰阴影，改为更轻、更干净的视觉语言；主操作色也从高饱和大红调整为清新的青绿色，让开关和保存按钮更耐看。

AI 服务商区域现在使用本地品牌图标资源，DeepSeek、OpenAI、Gemini、MiniMax 和自定义端点有更明确的识别度。API Key 输入增加了显示/隐藏按钮，服务商卡片增加键盘可访问操作，保存后的状态反馈也改成更自然的中文提示。

## v7.1 更新内容

| 模块 | 更新 |
|------|------|
| 配置页面 | 全新弹窗布局，信息层级更清晰，操作路径更短 |
| 视觉设计 | 移除光晕和厚重阴影，采用简洁、轻量、留白更合理的界面 |
| 主题色 | 将主操作色调整为清新的青绿色，降低视觉压力 |
| 服务商选择 | 新增/优化本地品牌图标资源，支持 DeepSeek、OpenAI、Gemini、MiniMax、自定义 |
| 翻译开关 | 修正开关按钮居中问题，视觉状态更稳定 |
| API Key | 增加显示/隐藏能力，减少配置时的输入确认成本 |
| 可访问性 | 服务商卡片支持键盘 Enter/Space 选择，并同步 aria 状态 |
| 隐私提示 | 强化“仅本地存储，不上传数据”的说明 |

## 核心卖点

| 卖点 | 说明 | 适合谁 |
|------|------|--------|
| 更像中文标题 | 相比传统机翻和普通网页翻译，更重视语境、语气和中文表达习惯 | 经常看英文 YouTube 的中文用户 |
| 一秒识别内容类型 | 标题前自动增加标签，例如科技、游戏、教程、财经、影视等 | 想快速判断视频值不值得点开的人 |
| 多模型自由选择 | 支持 DeepSeek、OpenAI、Google Gemini、MiniMax 和自定义 OpenAI 兼容端点 | 已经有 API Key 或模型套餐的用户 |
| 消耗闲置额度 | 如果你买了 coding plan 或 token plan 但额度用不完，可以把它变成日常看视频的实用工具 | 有 AI 套餐、API 余额、token 额度的用户 |
| 本地隐私 | API Key 只存在浏览器本地，不上传到作者服务器 | 关注数据安全的用户 |

## 为什么不是普通翻译插件

普通翻译工具更擅长逐词翻译，但 YouTube 标题经常有梗、夸张表达、省略语、挑战句式和内容营销写法。直接机翻会出现生硬、像翻译腔、看不出重点的问题。

这个插件用 AI 模型按“中文标题”的方式重新表达，目标是：

- 保留原标题吸引力，不把标题翻得死板。
- 理解标题里的梗、语气、上下文和专业词。
- 给标题加上内容标签，先判断类型，再决定要不要点开。
- 让你刷 YouTube 时不用在英文标题上消耗注意力。

支持的标签包括：

```text
科技 / 游戏 / 音乐 / 教程 / 搞笑 / 新闻 / 财经 / 生活 / 体育 / 影视 / 美食 / 其它
```

## 项目亮点

| 特性 | 描述 | 优势 |
|------|------|------|
| 多 AI 模型支持 | DeepSeek、OpenAI、Google Gemini、MiniMax、自定义 OpenAI 兼容端点 | 灵活选择，按成本和质量自由切换 |
| 标题标签 | 每个翻译标题前自动显示内容分类 | 快速判断视频主题，减少无效点击 |
| 精准翻译 | 理解俚语、梗、专业术语和 YouTube 标题风格 | 更自然，更像中文用户会写的标题 |
| 隐私优先 | API Key 仅存储在本地浏览器 | 不经过作者服务器，不上传配置数据 |
| 智能缓存 | 翻译结果本地缓存 | 避免重复消耗 token，提升加载速度 |
| 批量翻译 | 多个标题合并请求处理 | 减少请求次数，提升效率 |
| 原生体验 | 翻译结果直接融入 YouTube 页面 | 不破坏原有浏览体验 |
| 自定义端点 | 支持 OpenRouter、SiliconFlow、火山方舟、本地 Ollama、LM Studio 等 | 用你已有的模型服务和余额 |

## 快速开始

### 安装方法

#### 方法一：Chrome Web Store

[点击前往 Chrome 应用商店下载](https://chromewebstore.google.com/detail/youtube-ai-%E6%A0%87%E9%A2%98%E7%BF%BB%E8%AF%91-%E5%85%A8%E8%83%BD%E7%89%88/bhajnflcikmidmdalnjhknillnkaojhk)

#### 方法二：开发者模式安装

1. 下载项目代码：点击右上角 `Code` -> `Download ZIP`。
2. 解压文件到本地文件夹。
3. 在 Chrome 地址栏输入 `chrome://extensions/`。
4. 开启右上角“开发者模式”。
5. 点击“加载已解压的扩展程序”，选择解压后的项目文件夹。

### 配置步骤

1. 点击浏览器右上角的插件图标。
2. 打开“翻译开关”。
3. 选择 AI 服务商：DeepSeek、OpenAI、Gemini、MiniMax 或自定义。
4. 选择模型版本。
5. 粘贴对应服务商的 API Key。
6. 点击“保存设置”。
7. 刷新 YouTube 页面，开始自动翻译标题。

## API Key 获取入口

| 服务商 | 获取地址 |
|--------|----------|
| DeepSeek | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| MiniMax | [platform.minimaxi.com/user-center/basic-information/interface-key](https://platform.minimaxi.com/user-center/basic-information/interface-key) |

## 自定义端点

如果你使用的是 OpenRouter、SiliconFlow、火山方舟、本地 Ollama、LM Studio，或其他兼容 OpenAI Chat Completions 格式的服务，可以选择“自定义”服务商。

需要填写：

- `API Endpoint`：完整的接口地址，例如 `https://openrouter.ai/api/v1/chat/completions`
- `模型名称`：服务商要求的模型 ID，例如 `openai/gpt-4o-mini`
- `API Key`：对应服务商的密钥

首次保存新的接口域名时，Chrome 可能会弹出权限确认，这是为了让扩展能直接访问你填写的服务商地址。

## 效果演示

### 插件配置界面

![插件配置界面](screenshots/popup-config.png)

### YouTube 翻译效果

![YouTube 翻译效果](screenshots/youtube-translated-preview.png)

灰色标签表示视频内容类型，下方显示原始英文标题，方便你在不丢失原文信息的情况下快速理解内容。

### 更多翻译示例

![更多翻译示例](screenshots/youtube-translated-3-preview.png)

## 主要功能

### 1. 智能标题翻译

- 上下文理解：不只是字面翻译，而是理解视频标题想表达什么。
- 文化适配：俚语、梗、专业术语会尽量转换成中文用户更容易理解的表达。
- 标题风格保持：尽量保留原标题的吸引力和语气。

### 2. 标题内容标签

AI 会为每个标题返回一个内容标签，例如科技、游戏、教程、财经、影视等。你不用先读完整标题，就能快速判断视频内容方向。

### 3. 隐私安全架构

```text
用户 API Key -> 本地浏览器存储 -> 直接请求 AI 服务商
                 |
                 -> 不上传到作者服务器
```

### 4. 成本优化策略

- 智能缓存：相同标题只翻译一次。
- 批量处理：多个标题合并请求，减少 API 调用次数。
- 多模型选择：按质量、速度、价格选择最合适的模型。
- 闲置额度利用：适合消耗已经购买但用不完的 coding plan、token plan 或 API 余额。

### 5. 用户体验优化

- 实时翻译：页面加载和滚动时自动处理新标题。
- 无缝集成：翻译内容嵌入 YouTube 页面，不需要打开额外窗口。
- 一键暂停：不需要翻译时可以直接关闭主开关。
- 本地配置中心：服务商、模型、API Key、高级端点集中管理。

## 性能对比

| 功能 | 传统机翻 / 普通网页翻译 | 本插件 |
|------|--------------------------|--------|
| 翻译质量 | 偏直译，容易有翻译腔 | 更自然，更有中文味儿 |
| 标题理解 | 很少理解梗、标题党和上下文 | 结合语境重写中文标题 |
| 内容判断 | 只能读完整标题 | 标题前直接显示内容标签 |
| 隐私保护 | 取决于翻译服务 | API Key 和配置本地保存 |
| 成本控制 | 不可控或无模型选择 | 缓存、批量、多模型可选 |
| 自定义能力 | 通常不可自定义模型 | 支持自定义 OpenAI 兼容端点 |

## 技术栈

- 前端：HTML5、CSS3、JavaScript
- 浏览器 API：Chrome Extensions Manifest V3
- AI 集成：DeepSeek API、OpenAI API、Google Gemini API、MiniMax API、自定义 OpenAI 兼容端点
- 存储：Chrome Storage Local API
- 架构：Content Script + Background Service Worker
- 构建：原生开发，无构建依赖

## 开发者指南

### 项目结构

```text
YouTube-AI-Title-Translator/
├── assets/brands/        # AI 服务商品牌图标
├── background.js         # 后台请求与 AI 翻译服务
├── content.js            # YouTube 页面内容脚本
├── icon.png              # 插件图标
├── manifest.json         # Chrome 扩展配置
├── popup.html            # 弹窗配置页面
├── popup.js              # 弹窗交互逻辑
├── screenshots/          # 项目截图
├── styles.css            # YouTube 页面注入样式
└── README.md             # 项目说明
```

### 本地开发

```bash
git clone https://github.com/garygaryandfree/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

在 `chrome://extensions/` 页面通过“加载已解压的扩展程序”安装。修改代码后，点击该扩展的刷新按钮，然后重新打开扩展弹窗或刷新 YouTube 页面。

### 贡献指南

1. Fork 本仓库。
2. 创建功能分支：`git checkout -b feature/AmazingFeature`。
3. 提交更改：`git commit -m 'Add some AmazingFeature'`。
4. 推送到分支：`git push origin feature/AmazingFeature`。
5. 开启 Pull Request。

## 常见问题

### 插件本身收费吗？

插件本身免费开源。AI 服务商可能会根据 API 使用量收费，具体以对应平台规则为准。

### API Key 会上传到服务器吗？

不会。配置只写入当前浏览器的本地存储，扩展会直接从本地向你选择的 AI 服务商发起请求。

### 翻译真的比 Google 翻译更好吗？

这个插件的目标不是逐词翻译，而是把 YouTube 标题翻成更自然的中文标题。对标题党、梗、口语、专业词和视频语境，它通常会比传统机翻更容易读懂。

### 为什么标题前面会有标签？

标签用来帮你快速判断视频类型。比如看到“财经”“教程”“影视”这类标签，你可以先判断视频内容方向，再决定是否点开。

### 为什么需要刷新 YouTube 页面？

保存新配置后，已经打开的 YouTube 页面需要重新加载内容脚本，刷新页面后新配置会生效。

### 支持自定义模型吗？

支持。选择“自定义”后，可以填写兼容 OpenAI 接口格式的 API Endpoint 和模型名。

### 支持其他语言吗？

当前主要面向英文 YouTube 标题到简体中文的翻译场景。后续可以继续扩展更多语言。

## 反馈与支持

- Bug 反馈：[GitHub Issues](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/issues)
- 功能建议：[提交建议](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/issues)
- 邮件联系：garyzhang345@gmail.com
- 支持开发者：[爱发电](https://afdian.com/a/garygary)

这是一个由独立开发者维护的开源项目。如果这个插件对你有帮助，欢迎支持后续维护。

## 开源协议

本项目采用 MIT License 开源，详情见 [LICENSE](LICENSE)。

## 致谢

感谢 DeepSeek、OpenAI、Google Gemini、MiniMax 提供模型与 API 能力，也感谢所有测试用户和反馈者。

[![Star History Chart](https://api.star-history.com/svg?repos=garygaryandfree/YouTube-AI-Title-Translator&type=Date)](https://star-history.com/#garygaryandfree/YouTube-AI-Title-Translator&Date)

*最后更新：2026年5月5日*
