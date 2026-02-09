# AI生成示意图指南

## 可用工具

### 1. DALL-E 3 (OpenAI)
- **网址**: https://platform.openai.com/dall-e-3
- **优点**: 理解复杂提示，生成质量高
- **成本**: 按生成次数收费

### 2. Midjourney
- **平台**: Discord
- **优点**: 艺术风格强，细节丰富
- **成本**: 订阅制

### 3. Stable Diffusion
- **工具**: DreamStudio, ClipDrop
- **优点**: 免费选项多，可本地运行
- **成本**: 免费或按使用量

### 4. Bing Image Creator
- **网址**: https://www.bing.com/images/create
- **优点**: 免费，基于DALL-E
- **限制**: 每日有限次数

## 生成提示词

### 提示词1：插件配置界面
```
Modern Chrome extension popup window with AI model selection. Shows three options: DeepSeek (purple unicorn icon), OpenAI (blue robot icon), Gemini (green gem icon). Clean input field for API key. Minimalist design, light background, subtle shadows, browser context.
```

### 提示词2：YouTube翻译对比
```
YouTube interface showing video titles in English with Chinese translations below. Side-by-side comparison, 4 video examples. Clean typography, YouTube red color accents, video thumbnails visible. Professional software demonstration.
```

### 提示词3：深色模式效果
```
Dark mode YouTube page with translated Chinese titles. Dark gray interface, YouTube red highlights. Shows English titles with accurate Chinese translations below. Clean, modern, professional browser extension demonstration.
```

### 提示词4：使用流程图表
```
Infographic showing 5-step process: 1) Click extension icon, 2) Select AI model, 3) Enter API key, 4) Save settings, 5) View translations. Clean arrows, numbered steps, minimalist icons. Professional software tutorial style.
```

## 生成步骤

### 使用Bing Image Creator（推荐，免费）：
1. 访问 https://www.bing.com/images/create
2. 登录Microsoft账户
3. 复制上述提示词
4. 点击"创建"
5. 选择最佳结果
6. 下载图片

### 使用DALL-E 3：
1. 访问 https://platform.openai.com/dall-e-3
2. 使用OpenAI账户登录
3. 输入提示词
4. 调整参数（尺寸：1024x1024）
5. 生成并下载

## 图片处理

### 尺寸调整：
- **配置界面**: 800x600像素
- **YouTube截图**: 1920x1080像素（可裁剪）
- **流程图**: 1200x800像素

### 格式转换：
```bash
# 使用ImageMagick调整尺寸
convert input.png -resize 800x600 output.png

# 转换为PNG格式
convert input.jpg output.png
```

### 优化压缩：
```bash
# 使用pngquant压缩
pngquant --quality=65-80 input.png --output output.png
```

## 文件命名

将生成的图片保存为：
1. `popup-config-ai.png`
2. `youtube-translated-ai.png`  
3. `dark-mode-ai.png`
4. `workflow-diagram-ai.png`

## 更新README

生成图片后，更新README.md中的图片链接：
```markdown
![插件配置界面](screenshots/popup-config-ai.png)
![YouTube翻译效果](screenshots/youtube-translated-ai.png)
![深色模式效果](screenshots/dark-mode-ai.png)
![使用流程图](screenshots/workflow-diagram-ai.png)
```

## 注意事项

1. **版权**: AI生成图片通常可商用，但检查具体服务条款
2. **一致性**: 保持相似的风格和配色
3. **准确性**: 确保界面元素符合实际功能
4. **质量**: 选择清晰、专业的生成结果

## 替代方案

如果AI生成效果不理想，可以考虑：
1. **截图+编辑**: 实际截图后用Photoshop/GIMP编辑
2. **设计工具**: Figma、Sketch制作示意图
3. **模板修改**: 使用UI模板进行修改
4. **社区贡献**: 请求用户提供截图

---
*最后更新: 2026-02-09*