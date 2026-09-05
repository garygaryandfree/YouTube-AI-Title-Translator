# AI Title Translator - Tiêu đề YouTube song ngữ bằng AI

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

Một tiện ích Chrome: dùng AI dịch tiêu đề video YouTube, bản dịch thay thế trực tiếp ở vị trí gốc, còn nguyên bản thu nhỏ giữ lại bên dưới. Vừa duyệt vừa đối chiếu, vừa nhanh chóng biết video nói về gì, vừa học được cách đặt tiêu đề tự nhiên bằng ngôn ngữ khác. Miễn phí và mã nguồn mở, API Key và cấu hình chỉ lưu trong trình duyệt của chính bạn.

## Cập nhật gần đây (v8.0.3)

- **Dùng được cả khi chưa có API Key**: khi chưa cấu hình Key, tiện ích tự động chuyển sang bản dịch trên thiết bị tích hợp sẵn trong Chrome 138+, bắt đầu dùng với chi phí bằng không
- **Dịch thất bại có thể nhấp để thử lại**: tiêu đề lỗi hiển thị cảnh báo màu đỏ, nhấp một lần là dịch lại
- **Đã sửa lỗi "phản hồi của mô hình có định dạng bất thường" do chế độ suy nghĩ (thinking) của DeepSeek V4**: dòng V4 mặc định bật thinking, chuỗi suy luận dùng hết hạn mức đầu ra khiến JSON bị cắt; hiện đã tắt thinking cho các mô hình V4
- Popup thêm nút xóa bộ nhớ đệm bản dịch (có hiển thị số mục); thẻ nhà cung cấp đã lưu Key hiển thị chấm xanh; khi kiểm tra cấu hình sẽ hiển thị trực tiếp một bản dịch mẫu
- Thêm 12 ngôn ngữ bản địa hóa mới, nâng ngôn ngữ giao diện lên 14

## Tính năng chính

| Tính năng | Mô tả |
|------|------|
| Bản dịch + nguyên bản đối chiếu | Bản dịch hiển thị làm tiêu đề chính, nguyên bản giữ lại bên dưới, tiện duyệt nhanh và học ngoại ngữ |
| Dịch theo ngữ cảnh bằng AI | Không thay thế từng từ, mà hiểu được meme, ngữ điệu, chữ viết tắt và kiểu tiêu đề câu view |
| Thẻ nội dung | Tự động tạo thẻ nội dung như Công nghệ, Tin tức, Âm nhạc, Tài chính — xem loại trước rồi mới quyết định có mở không |
| Dịch đa ngôn ngữ | Tự nhận diện ngôn ngữ nguồn phổ biến, dịch sang 12 ngôn ngữ đích; tiêu đề đã ở ngôn ngữ đích sẽ tự động bỏ qua |
| Nhiều nhà cung cấp AI | Tích hợp sẵn DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI, Kimi, hỗ trợ endpoint tùy chỉnh tương thích OpenAI |
| Dịch tích hợp không cần Key | Khi chưa cấu hình Key thì dùng Chrome Translator tích hợp: chạy trên thiết bị, miễn phí, không tải văn bản lên |
| Bộ nhớ đệm cục bộ và quyền riêng tư | Bản dịch được lưu đệm cục bộ để tránh gọi lặp; API Key và cấu hình chỉ lưu trong trình duyệt hiện tại |

## Demo

| Tiếng Anh -> tiếng Nhật | Tiếng Anh -> tiếng Hàn |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| Tiếng Anh -> tiếng Thái | Tiếng Anh -> tiếng Tây Ban Nha |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Tiếng Trung -> tiếng Anh | Tiếng Trung -> tiếng Pháp |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Tiếng Trung -> tiếng Đức | Tiếng Trung -> tiếng Bồ Đào Nha |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Tiếng Trung -> tiếng Indonesia | Tiếng Trung -> tiếng Việt |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Bắt đầu nhanh

### Cách 1: Chrome Web Store (khuyên dùng)

[Nhấp để cài đặt từ Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Cách 2: Cài ở chế độ nhà phát triển

1. Mở [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), tải zip của phiên bản mới nhất rồi giải nén.
2. Nhập `chrome://extensions/` vào thanh địa chỉ của Chrome, bật "Chế độ dành cho nhà phát triển" ở góc trên bên phải.
3. Nhấp "Tải tiện ích đã giải nén", chọn thư mục vừa giải nén.

Sau khi cài đặt, nhấp biểu tượng tiện ích trên thanh công cụ của trình duyệt: chọn ngôn ngữ đích trước (`Translate titles into` / Dịch tiêu đề sang), sau đó chọn nhà cung cấp AI và dán API Key, lưu lại rồi làm mới trang YouTube là xong. Không có Key cũng dùng trực tiếp được, xem mục "Bản dịch tích hợp" bên dưới.

## Hướng dẫn cấu hình

![Giao diện cấu hình tiện ích](screenshots/v8.0.1/config-ui.png)

| Khu vực | Chức năng |
|------|------|
| Interface language | Ngôn ngữ hiển thị của giao diện cấu hình (14 ngôn ngữ), không ảnh hưởng đến trang YouTube và ngôn ngữ đích của bản dịch |
| Công tắc Translation | Có tự động dịch tiêu đề trên trang YouTube hay không; khi tạm dừng sẽ gỡ các bản dịch đã hiển thị trên trang |
| Translate titles into | Ngôn ngữ đích của tiêu đề, mặc định là tiếng Anh |
| Choose AI provider | Chọn nhà cung cấp AI, mặc định và khuyên dùng DeepSeek; thẻ nhà cung cấp đã lưu Key có chấm xanh ở góc dưới bên phải |
| Model settings | Chọn phiên bản mô hình, hoặc chọn "Other" (Khác) để nhập thủ công model ID |
| API Key | Key bạn đăng ký ở nhà cung cấp tương ứng, chỉ lưu ở cục bộ |
| Custom endpoint | Kết nối các dịch vụ tương thích như OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio |
| Save settings | Lưu cấu hình; nên làm mới trang YouTube sau khi lưu |
| Test configuration | Kiểm tra cấu hình hiện tại có dùng được không; khi thành công hiển thị trực tiếp một bản dịch mẫu, khi thất bại báo theo nguyên nhân (Key không hợp lệ / hết hạn mức / sai tên mô hình / lỗi mạng) |
| Clear translation cache | Xóa bộ nhớ đệm bản dịch cục bộ (hiển thị số mục đang lưu); bộ đệm phân biệt theo ngôn ngữ đích, chuyển ngôn ngữ không ảnh hưởng lẫn nhau |

## Không có API Key? Dùng bản dịch tích hợp

Khi chưa cấu hình bất kỳ Key nào, tiện ích sẽ tự động thử Translator / LanguageDetector tích hợp sẵn trong Chrome 138+: việc dịch hoàn thành ngay trên máy của bạn, không tải văn bản lên, không phát sinh chi phí. Với các cặp ngôn ngữ ít gặp mà thiết bị không hỗ trợ, tiện ích sẽ hiển thị hướng dẫn "vui lòng cấu hình tiện ích"; chỉ cần cấu hình Key của một nhà cung cấp AI bất kỳ là dịch được tất cả ngôn ngữ được hỗ trợ.

Bản dịch tích hợp không có khả năng phân loại thẻ nội dung, vị trí thẻ sẽ hiển thị "本机 / On-device".

## Nhà cung cấp, mô hình và API Key

| Nhà cung cấp | Mô hình tích hợp | Trang đăng ký Key |
|--------|----------|--------------|
| DeepSeek (khuyên dùng) | `deepseek-v4-flash`、`deepseek-v4-pro`、`deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`、`gpt-5.4-mini`、`gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`、`gemini-3-pro-preview`、`gemini-3-flash-preview`、`gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`、`claude-opus-4-6`、`claude-sonnet-4-6`、`claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`、`MiniMax-M2.7`、`MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`、`glm-5.1-flash`、`glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`、`kimi-k2.6-turbo`、`kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

Bản thân tiện ích miễn phí; các nhà cung cấp tính phí theo lượng dùng API, theo quy định của từng nền tảng.

### Endpoint tùy chỉnh

Chọn `Custom` để kết nối bất kỳ dịch vụ nào tương thích định dạng OpenAI Chat Completions, cần điền:

- `API Endpoint`: địa chỉ API đầy đủ, ví dụ `https://openrouter.ai/api/v1/chat/completions`
- `Model name`: model ID theo yêu cầu của nhà cung cấp, ví dụ `openai/gpt-5.4-mini`
- `API Key`: khóa của nhà cung cấp tương ứng

Khi lưu một tên miền mới lần đầu, Chrome sẽ hiện hộp xác nhận quyền — điều này cần thiết để tiện ích truy cập trực tiếp nhà cung cấp đó. Endpoint tùy chỉnh bắt buộc phải dùng HTTPS (trừ trường hợp debug `localhost` trên máy).

## Ngôn ngữ được hỗ trợ

**Ngôn ngữ đích (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Ngôn ngữ giao diện (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Ngôn ngữ nguồn**: không cần chọn, tự động nhận diện các ngôn ngữ tiêu đề phổ biến như tiếng Anh, Trung, Nhật, Hàn, Thái, Tây Ban Nha, Pháp, Đức, Bồ Đào Nha, Indonesia, Việt, Nga, Ả Rập, Hindi.

## Quyền riêng tư và dữ liệu

```text
API Key / ngôn ngữ đích / ngôn ngữ giao diện / cấu hình nhà cung cấp -> bộ nhớ cục bộ của Chrome
Nội dung tiêu đề                                                     -> chỉ gửi cho nhà cung cấp AI do bạn chọn
                                                                       -> không qua máy chủ của tác giả
```

Tiện ích không thu thập bất kỳ dữ liệu nào: cấu hình được ghi vào bộ nhớ cục bộ của trình duyệt hiện tại, nội dung tiêu đề được gửi trực tiếp tới nhà cung cấp do bạn cấu hình để dịch. Khi dùng bản dịch tích hợp, văn bản không rời khỏi máy.

## Hướng dẫn cho nhà phát triển

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

Bật chế độ nhà phát triển ở `chrome://extensions/`, chọn "Tải tiện ích đã giải nén" rồi chọn thư mục dự án. Sau khi sửa code, nhấp nút làm mới trên thẻ tiện ích rồi làm mới trang YouTube để áp dụng.

Chạy test (Node 18+, không phụ thuộc bên thứ ba):

```bash
npm test
```

Tech stack: Manifest V3 (Content Script + Background Service Worker), HTML/CSS/JS thuần, Chrome Storage Local API, không cần bước build.

## Phản hồi và hỗ trợ

- Báo lỗi và đề xuất tính năng: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- Liên hệ qua email: garyzhang345@gmail.com

## Giấy phép

Dự án này mã nguồn mở theo MIT License, chi tiết xem [LICENSE](LICENSE).

*Cập nhật lần cuối: ngày 5 tháng 9 năm 2026*
