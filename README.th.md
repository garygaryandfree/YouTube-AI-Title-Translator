# AI Title Translator - ชื่อ YouTube สองภาษาด้วย AI

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

ส่วนขยาย Chrome ที่ใช้ AI แปลชื่อวิดีโอ YouTube โดยคำแปลจะแสดงแทนตำแหน่งชื่อเดิม และชื่อต้นฉบับจะถูกย่อเล็กลงเก็บไว้ด้านล่าง อ่านเปรียบเทียบไปพร้อมกับการเรียกดู ทั้งช่วยให้รู้ได้อย่างรวดเร็วว่าวิดีโอเกี่ยวกับอะไร และยังได้เรียนรู้วิธีตั้งชื่อจริงในภาษาอื่น ๆ ฟรีและโอเพนซอร์ส API Key และการตั้งค่าทั้งหมดถูกเก็บไว้ในเบราว์เซอร์ของคุณเองเท่านั้น

## การอัปเดตล่าสุด (v8.0.3)

- **ใช้ได้แม้ไม่มี API Key**: เมื่อยังไม่ได้ตั้งค่า Key ส่วนขยายจะสลับไปใช้การแปลบนอุปกรณ์ที่มาพร้อมกับ Chrome 138+ โดยอัตโนมัติ เริ่มใช้งานได้ทันทีโดยไม่มีค่าใช้จ่าย
- **แปลไม่สำเร็จก็กดลองใหม่ได้**: ชื่อที่แปลไม่สำเร็จจะแสดงข้อความเตือนสีแดง คลิกเพียงครั้งเดียวเพื่อแปลใหม่
- **แก้ปัญหา "โมเดลส่งผลลัพธ์ผิดรูปแบบ" จากโหมดคิดของ DeepSeek V4**: ตระกูล V4 เปิดโหมดคิด (thinking) ไว้ตามค่าเริ่มต้น ห่วงโซ่ความคิดใช้โควตาเอาต์พุตจนหมดทำให้ JSON ถูกตัดกลางคัน ตอนนี้ปิดโหมดคิดสำหรับโมเดล V4 แล้ว
- popup เพิ่มปุ่มล้างแคชคำแปล (พร้อมแสดงจำนวนรายการ) การ์ดผู้ให้บริการที่บันทึก Key แล้วจะแสดงจุดสีเขียว และตอนทดสอบการตั้งค่าจะแสดงตัวอย่างคำแปลโดยตรง
- เพิ่มภาษาสำหรับ UI อีก 12 ภาษา ทำให้ภาษาของหน้าจอมีทั้งหมด 14 ภาษา

## ฟีเจอร์หลัก

| ความสามารถ | รายละเอียด |
|------|------|
| คำแปล + ต้นฉบับเปรียบเทียบ | คำแปลแสดงเป็นชื่อหลัก และชื่อต้นฉบับเก็บไว้ด้านล่าง สะดวกต่อการเรียกดูอย่างรวดเร็วและการเรียนภาษา |
| AI แปลตามบริบท | ไม่ใช่การแทนที่ทีละคำ แต่เข้าใจมุก น้ำเสียง คำย่อ และการตั้งชื่อแบบตกเบ็ด (clickbait) ในชื่อวิดีโอ |
| แท็กเนื้อหา | สร้างแท็กเนื้อหา เช่น เทคโนโลยี ข่าว ดนตรี การเงิน โดยอัตโนมัติ ดูประเภทก่อนแล้วค่อยตัดสินใจว่าจะคลิกหรือไม่ |
| แปลข้ามหลายภาษา | ตรวจจับภาษาต้นทางที่พบบ่อยโดยอัตโนมัติ แปลเป็นภาษาปลายทางได้ 12 ภาษา ชื่อที่เป็นภาษาปลายทางอยู่แล้วจะถูกข้ามโดยอัตโนมัติ |
| ผู้ให้บริการ AI หลายราย | มี DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI, Kimi ในตัว และรองรับเอนด์พอยต์แบบกำหนดเองที่เข้ากันได้กับ OpenAI |
| แปลในตัวโดยไม่ต้องมี Key | เมื่อยังไม่ได้ตั้งค่า Key จะใช้ Translator ในตัวของ Chrome ทำงานบนอุปกรณ์ ฟรี และไม่อัปโหลดข้อความ |
| แคชในเครื่องและความเป็นส่วนตัว | คำแปลถูกแคชไว้ในเครื่องเพื่อหลีกเลี่ยงการร้องขอซ้ำ API Key และการตั้งค่าถูกบันทึกเฉพาะในเบราว์เซอร์ปัจจุบัน |

## ตัวอย่างผลลัพธ์

| อังกฤษ -> ญี่ปุ่น | อังกฤษ -> เกาหลี |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| อังกฤษ -> ไทย | อังกฤษ -> สเปน |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| จีน -> อังกฤษ | จีน -> ฝรั่งเศส |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| จีน -> เยอรมัน | จีน -> โปรตุเกส |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| จีน -> อินโดนีเซีย | จีน -> เวียดนาม |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## เริ่มต้นอย่างรวดเร็ว

### วิธีที่ 1: Chrome Web Store (แนะนำ)

[คลิกเพื่อติดตั้งจาก Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### วิธีที่ 2: ติดตั้งแบบ Developer Mode

1. เปิด [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases) ดาวน์โหลด zip เวอร์ชันล่าสุดแล้วแตกไฟล์
2. พิมพ์ `chrome://extensions/` ในแถบที่อยู่ของ Chrome แล้วเปิด "Developer mode" (โหมดนักพัฒนา) ที่มุมขวาบน
3. คลิก "Load unpacked" (โหลดส่วนขยายที่แตกไฟล์แล้ว) แล้วเลือกโฟลเดอร์ที่แตกไฟล์ไว้

หลังติดตั้ง คลิกไอคอนส่วนขยายบนแถบเครื่องมือของเบราว์เซอร์: เลือกภาษาปลายทางก่อน (`Translate titles into` / แปลชื่อเป็น) จากนั้นเลือกผู้ให้บริการ AI และวาง API Key บันทึกแล้วรีเฟรชหน้า YouTube ก็ใช้งานได้ ไม่มี Key ก็ใช้ได้ทันทีเช่นกัน ดูรายละเอียดในหัวข้อ "การแปลในตัว" ด้านล่าง

## คำอธิบายการตั้งค่า

![หน้าจอการตั้งค่าของส่วนขยาย](screenshots/v8.0.1/config-ui.png)

| ส่วน | หน้าที่ |
|------|------|
| `Interface language` (ภาษาของส่วนขยาย) | ภาษาที่แสดงของหน้าตั้งค่า (14 ภาษา) ไม่กระทบหน้า YouTube และภาษาปลายทางของการแปล |
| สวิตช์ `Translation` (การแปล) | เลือกว่าจะแปลชื่อบนหน้า YouTube โดยอัตโนมัติหรือไม่ เมื่อหยุดชั่วคราวจะลบคำแปลที่เรนเดอร์บนหน้าออก |
| `Translate titles into` (แปลชื่อเป็น) | ภาษาปลายทางของการแปลชื่อ ค่าเริ่มต้นคืออังกฤษ |
| `Choose AI provider` (เลือกผู้ให้บริการ AI) | เลือกผู้ให้บริการ AI ค่าเริ่มต้นและตัวที่แนะนำคือ DeepSeek การ์ดผู้ให้บริการที่บันทึก Key แล้วจะมีจุดสีเขียวที่มุมขวาล่าง |
| `Model settings` (ตั้งค่าโมเดล) | เลือกเวอร์ชันโมเดล หรือเลือก "อื่น ๆ" เพื่อกรอก model ID ด้วยตนเอง |
| `API Key` | Key ที่คุณขอจากผู้ให้บริการที่เกี่ยวข้อง บันทึกเฉพาะในเครื่องเท่านั้น |
| `Custom endpoint` (เอนด์พอยต์กำหนดเอง) | เชื่อมต่อบริการที่เข้ากันได้ เช่น OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio |
| `Save settings` (บันทึก) | บันทึกการตั้งค่า หลังบันทึกแนะนำให้รีเฟรชหน้า YouTube |
| `Test configuration` | ทดสอบว่าการตั้งค่าปัจจุบันใช้งานได้หรือไม่ เมื่อสำเร็จจะแสดงตัวอย่างคำแปลหนึ่งรายการโดยตรง เมื่อล้มเหลวจะแจ้งตามสาเหตุ (Key ไม่ถูกต้อง / โควตาไม่พอ / ชื่อโมเดลผิด / เครือข่ายขัดข้อง) |
| `Clear translation cache` | ล้างแคชคำแปลในเครื่อง (แสดงจำนวนรายการที่แคชอยู่) แคชแยกตามภาษาปลายทาง สลับภาษาแล้วไม่กระทบกัน |

## ไม่มี API Key? ใช้การแปลในตัว

เมื่อยังไม่ได้ตั้งค่า Key ใด ๆ ส่วนขยายจะลองใช้ Translator / LanguageDetector ที่มาพร้อมกับ Chrome 138+ โดยอัตโนมัติ การแปลทำบนเครื่องของคุณ ไม่อัปโหลดข้อความ และไม่มีค่าใช้จ่าย คู่ภาษาที่ไม่ค่อยพบซึ่งการแปลบนอุปกรณ์ไม่รองรับจะแสดงคำแนะนำ "โปรดตั้งค่าส่วนขยาย" เพียงตั้งค่า Key ของผู้ให้บริการ AI รายใดรายหนึ่ง ก็แปลได้ทุกภาษาที่รองรับ

การแปลในตัวไม่มีความสามารถในการจัดหมวดแท็กเนื้อหา ตำแหน่งแท็กจะแสดง "บนอุปกรณ์ / On-device"

## ผู้ให้บริการ โมเดล และ API Key

| ผู้ให้บริการ | โมเดลในตัว | ลิงก์ขอ Key |
|--------|----------|--------------|
| DeepSeek (แนะนำ) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

ส่วนขยายนี้ฟรี ผู้ให้บริการแต่ละรายคิดค่าใช้จ่ายตามปริมาณการใช้งาน API โดยยึดตามกฎของแพลตฟอร์มนั้น ๆ

### เอนด์พอยต์กำหนดเอง

เลือก `Custom` (กำหนดเอง) เพื่อเชื่อมต่อบริการใดก็ได้ที่เข้ากันได้กับรูปแบบ OpenAI Chat Completions โดยต้องกรอก:

- `API Endpoint`: ที่อยู่ API แบบเต็ม เช่น `https://openrouter.ai/api/v1/chat/completions`
- `Model name` (ชื่อโมเดล): model ID ตามที่ผู้ให้บริการกำหนด เช่น `openai/gpt-5.4-mini`
- `API Key`: คีย์ของผู้ให้บริการนั้น

เมื่อบันทึกโดเมนใหม่ครั้งแรก Chrome จะแสดงหน้าต่างยืนยันสิทธิ์ ซึ่งจำเป็นสำหรับให้ส่วนขยายเข้าถึงผู้ให้บริการนั้นโดยตรง เอนด์พอยต์กำหนดเองต้องใช้ HTTPS (ยกเว้นการดีบัก `localhost` บนเครื่อง)

## ภาษาที่รองรับ

**ภาษาปลายทาง (12 ภาษา)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**ภาษาของหน้าจอ (14 ภาษา)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**ภาษาต้นทาง**: ไม่ต้องเลือก ระบบจะตรวจจับภาษาชื่อที่พบบ่อยโดยอัตโนมัติ เช่น อังกฤษ จีน ญี่ปุ่น เกาหลี ไทย สเปน ฝรั่งเศส เยอรมัน โปรตุเกส อินโดนีเซีย เวียดนาม รัสเซีย อาหรับ และฮินดี

## ความเป็นส่วนตัวและข้อมูล

```text
API Key / ภาษาปลายทาง / ภาษาของส่วนขยาย / การตั้งค่าผู้ให้บริการ -> พื้นที่จัดเก็บในเครื่องของ Chrome
ข้อความชื่อวิดีโอ                                                 -> ส่งให้เฉพาะผู้ให้บริการ AI ที่คุณเลือกเอง
                                                                    -> ไม่ผ่านเซิร์ฟเวอร์ของผู้พัฒนา
```

ส่วนขยายไม่เก็บรวบรวมข้อมูลใด ๆ การตั้งค่าถูกเขียนลงพื้นที่จัดเก็บในเครื่องของเบราว์เซอร์ปัจจุบัน และข้อความชื่อถูกส่งตรงไปยังผู้ให้บริการที่คุณตั้งค่าไว้เพื่อแปลเท่านั้น เมื่อใช้การแปลในตัว ข้อความจะไม่ออกจากเครื่องของคุณ

## คู่มือนักพัฒนา

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

เปิด Developer mode ที่ `chrome://extensions/` แล้วคลิก "Load unpacked" เลือกโฟลเดอร์โปรเจกต์ หลังแก้ไขโค้ดให้คลิกปุ่มรีเฟรชบนการ์ดส่วนขยาย แล้วรีเฟรชหน้า YouTube เพื่อให้มีผล

รันการทดสอบ (Node 18+ ไม่มีไลบรารีภายนอก):

```bash
npm test
```

สแตกเทคโนโลยี: Manifest V3 (Content Script + Background Service Worker), HTML/CSS/JS ดั้งเดิม, Chrome Storage Local API ไม่มีขั้นตอน build

## ข้อเสนอแนะและการสนับสนุน

- รายงานบั๊กและเสนอฟีเจอร์: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- ติดต่อทางอีเมล: garyzhang345@gmail.com

## สัญญาอนุญาต

โปรเจกต์นี้เผยแพร่ภายใต้ MIT License ดูรายละเอียดได้ที่ [LICENSE](LICENSE)

*อัปเดตล่าสุด: 5 กันยายน 2026*
