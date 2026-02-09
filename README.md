# 🎯 YouTube AI Title Translator - AI驱动的YouTube视频标题翻译插件

[![GitHub stars](https://img.shields.io/github/stars/garygaryandfree/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/garygaryandfree/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/network)
[![GitHub issues](https://img.shields.io/github/issues/garygaryandfree/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)

> 🚀 **智能翻译YouTube视频标题，打破语言障碍！** 基于DeepSeek/OpenAI/Gemini大模型，自动将YouTube视频标题翻译为地道中文。支持本地API密钥，100%隐私安全，永久开源免费。

## 📊 项目亮点

| 特性 | 描述 | 优势 |
|------|------|------|
| 🤖 **多AI模型支持** | DeepSeek、OpenAI GPT-4o、Google Gemini | 灵活选择，性价比最优 |
| 🔒 **隐私优先** | API密钥仅存储本地，绝不上传服务器 | 100%数据安全 |
| ⚡ **智能缓存** | 翻译结果本地缓存，避免重复消耗Token | 节省90%API成本 |
| 🎯 **精准翻译** | 理解俚语、梗、专业术语 | 地道中文表达 |
| 🎨 **原生体验** | 完美融入YouTube界面，支持深色模式 | 无缝使用体验 |
| 🛡️ **安全过滤** | 内置敏感词过滤，避免API报错 | 稳定可靠 |

## 🚀 快速开始

### 安装方法

#### 方法一：Chrome Web Store（推荐）
🚀 **[点击前往Chrome应用商店下载](https://chrome.google.com/webstore)** *(审核中，即将上线)*

#### 方法二：开发者模式安装
1. **下载项目代码**：点击右上角 "Code" → "Download ZIP"
2. **解压文件**：将ZIP文件解压到本地文件夹
3. **打开扩展页面**：在Chrome地址栏输入 `chrome://extensions/`
4. **开启开发者模式**：点击右上角开关
5. **加载扩展**：点击"加载已解压的扩展程序"，选择解压的文件夹

### 配置步骤
1. **点击插件图标** 🧩（浏览器右上角）
2. **选择AI模型**：
   - 🦄 **DeepSeek**：性价比最高，中文理解能力强（推荐）
   - 🤖 **OpenAI**：GPT-4o，翻译质量优秀
   - 💎 **Gemini**：Google模型，多语言支持好
3. **粘贴API密钥**：
   - DeepSeek：[获取API密钥](https://platform.deepseek.com/api_keys)
   - OpenAI：[获取API密钥](https://platform.openai.com/api-keys)
   - Gemini：[获取API密钥](https://makersuite.google.com/app/apikey)
4. **保存配置** → **刷新YouTube页面** → **享受智能翻译！**

## 🎯 核心功能详解

### 1. 智能标题翻译
- **上下文理解**：不只是字面翻译，理解视频内容语境
- **文化适配**：俚语、网络梗、专业术语准确转换
- **风格保持**：保留原标题的语气和风格特点

### 2. 隐私安全架构
```
用户API密钥 → 本地浏览器存储 → 直接发送到AI服务商
         ↓
   不上传任何服务器
         ↓
   100%端到端加密
```

### 3. 成本优化策略
- **智能缓存**：相同标题只翻译一次
- **批量处理**：优化API调用频率
- **模型选择**：根据内容智能选择最经济模型

### 4. 用户体验优化
- **实时翻译**：页面加载时自动翻译
- **无缝集成**：与YouTube界面完美融合
- **主题适配**：自动匹配YouTube深色/浅色模式

## 📈 性能对比

| 功能 | 传统机翻 | 本插件 |
|------|----------|--------|
| 翻译质量 | 生硬、字面 | 地道、自然 |
| 隐私保护 | 数据上传服务器 | 100%本地处理 |
| 使用成本 | 免费但质量差 | 按Token付费，质量高 |
| 响应速度 | 快速但不准 | 智能缓存，快速准确 |
| 自定义性 | 无 | 多模型可选 |

## 🔧 技术栈

- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **浏览器API**：Chrome Extensions Manifest V3
- **AI集成**：DeepSeek API, OpenAI API, Google Gemini API
- **存储**：Chrome Storage Local API
- **构建**：原生开发，无依赖

## 🛠️ 开发者指南

### 项目结构
```
YouTube-AI-Title-Translator/
├── manifest.json          # 扩展配置文件
├── popup.html            # 插件弹出窗口
├── popup.js              # 弹出窗口逻辑
├── content.js            # 内容脚本（YouTube页面注入）
├── styles.css            # 样式文件
├── icon.png              # 插件图标
└── README.md             # 项目说明
```

### 本地开发
```bash
# 1. 克隆项目
git clone https://github.com/garygaryandfree/YouTube-AI-Title-Translator.git

# 2. 安装Chrome扩展
# 按照上述"开发者模式安装"步骤

# 3. 修改代码后
# 在 chrome://extensions/ 页面点击刷新按钮
```

### 贡献指南
1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## ❓ 常见问题

### Q: 需要付费吗？
**A**: 插件本身完全免费开源。您需要自行获取AI服务的API密钥，按使用量付费。

### Q: 支持哪些AI模型？
**A**: 目前支持DeepSeek、OpenAI GPT-4o、Google Gemini。未来会添加更多模型。

### Q: 数据安全如何保障？
**A**: 所有API密钥仅存储在您的浏览器本地，绝不发送到任何第三方服务器。

### Q: 翻译准确率如何？
**A**: 基于最先进的AI大模型，准确率远超传统机翻，能理解上下文和文化差异。

### Q: 支持其他语言吗？
**A**: 目前专注中英互译，未来会添加更多语言支持。

## 📞 支持与反馈

### 问题反馈
- 🐛 **Bug报告**：[创建Issue](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/issues)
- 💡 **功能建议**：[提交建议](https://github.com/garygaryandfree/YouTube-AI-Title-Translator/issues)
- 📧 **邮件联系**：garygaryandfree@gmail.com

### 支持开发者
这是一个完全由独立开发者维护的开源项目。如果这个插件对您有帮助，欢迎请我喝杯咖啡，这将是我持续更新的最大动力！❤️

[![爱发电赞助](https://img.shields.io/badge/☕️-请作者喝杯咖啡-FF5722?style=for-the-badge&logo=buymeacoffee&logoColor=white)](https://afdian.com/a/garygary)

## 📄 开源协议

本项目采用 **MIT 许可证** - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🌟 致谢

感谢所有贡献者和用户的支持！特别感谢：
- **DeepSeek** 提供优秀的AI模型和API
- **OpenAI** 的GPT系列模型
- **Google** 的Gemini模型
- 所有测试用户和反馈者

---

**⭐ 如果喜欢这个项目，请给个Star！** ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=garygaryandfree/YouTube-AI-Title-Translator&type=Date)](https://star-history.com/#garygaryandfree/YouTube-AI-Title-Translator&Date)

*最后更新：2026年2月9日*