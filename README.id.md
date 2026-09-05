# Penerjemah Judul YouTube - Judul Bilingual AI

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

Ekstensi Chrome yang menerjemahkan judul video YouTube dengan AI: hasil terjemahan langsung menggantikan posisi judul asli, sementara judul asli tetap ditampilkan lebih kecil di bawahnya. Anda bisa menjelajah sambil membandingkan — cepat menilai isi video, sekaligus mempelajari bagaimana judul asli ditulis dalam bahasa lain. Gratis dan open source; API Key dan konfigurasi hanya tersimpan di browser Anda sendiri.

## Pembaruan Terbaru (v8.0.3)

- **Bisa dipakai tanpa API Key**: saat belum ada Key yang dikonfigurasi, ekstensi otomatis beralih ke terjemahan di perangkat bawaan Chrome 138+ — langsung bisa dipakai tanpa biaya
- **Terjemahan gagal bisa dicoba ulang dengan klik**: judul yang gagal ditandai merah; klik sekali untuk menerjemahkan ulang
- **Memperbaiki "Format respons model tidak sesuai" yang disebabkan mode berpikir DeepSeek V4**: seri V4 mengaktifkan mode berpikir secara default; rantai penalaran menghabiskan kuota output sehingga JSON terpotong. Kini mode berpikir dimatikan untuk model V4
- Popup menambahkan tombol `Clear translation cache` (dengan jumlah entri); kartu penyedia yang Key-nya sudah tersimpan menampilkan titik hijau; saat menguji konfigurasi, contoh terjemahan langsung ditampilkan
- Menambahkan 12 bahasa lokalisasi baru; bahasa antarmuka kini mencapai 14 bahasa

## Fitur Utama

| Kemampuan | Keterangan |
|------|------|
| Terjemahan + perbandingan dengan asli | Terjemahan ditampilkan sebagai judul utama, judul asli tetap di bawahnya — memudahkan penjelajahan cepat dan belajar bahasa |
| Terjemahan kontekstual AI | Bukan penggantian kata per kata; memahami meme, nada, singkatan, dan gaya clickbait dalam judul |
| Tag konten | Otomatis membuat tag konten seperti Teknologi, Berita, Musik, Finansial — lihat dulu kategorinya sebelum memutuskan untuk membuka |
| Terjemahan multibahasa | Mengenali bahasa sumber umum secara otomatis, menerjemahkan ke 12 bahasa target; judul yang sudah dalam bahasa target dilewati otomatis |
| Beragam penyedia AI | Bawaan DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI, Kimi; mendukung endpoint kustom yang kompatibel dengan OpenAI |
| Terjemahan bawaan tanpa Key | Tanpa Key, gunakan Translator bawaan Chrome: berjalan di perangkat, gratis, teks tidak diunggah |
| Cache lokal dan privasi | Terjemahan di-cache secara lokal untuk menghindari permintaan berulang; API Key dan konfigurasi hanya tersimpan di browser ini |

## Demo

| Inggris -> Jepang | Inggris -> Korea |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| Inggris -> Thai | Inggris -> Spanyol |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Tionghoa -> Inggris | Tionghoa -> Prancis |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Tionghoa -> Jerman | Tionghoa -> Portugis |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Tionghoa -> Indonesia | Tionghoa -> Vietnam |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Mulai Cepat

### Metode 1: Chrome Web Store (Direkomendasikan)

[Klik untuk memasang dari Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Metode 2: Instal via Mode Pengembang

1. Buka [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), unduh zip versi terbaru lalu ekstrak.
2. Ketik `chrome://extensions/` di bilah alamat Chrome, aktifkan "Mode pengembang" (Developer mode) di kanan atas.
3. Klik "Muat yang belum dipaketkan" (Load unpacked), lalu pilih folder hasil ekstrak.

Setelah terpasang, klik ikon ekstensi di toolbar browser: pilih dulu bahasa target (`Translate titles into`), lalu pilih penyedia AI dan tempel API Key, simpan, kemudian segarkan halaman YouTube. Tanpa Key pun bisa langsung dipakai — lihat bagian "Terjemahan Bawaan" di bawah.

## Penjelasan Konfigurasi

![Antarmuka konfigurasi ekstensi](screenshots/v8.0.1/config-ui.png)

| Area | Fungsi |
|------|------|
| `Interface language` (Bahasa antarmuka) | Bahasa tampilan halaman pengaturan (14 bahasa); tidak memengaruhi halaman YouTube maupun target terjemahan |
| Sakelar `Translation` (Terjemahan) | Menerjemahkan judul secara otomatis di halaman YouTube atau tidak; saat dijeda, terjemahan yang sudah dirender di halaman akan dihapus |
| `Translate titles into` (Terjemahkan judul ke) | Bahasa target terjemahan judul; default-nya Inggris |
| `Choose AI provider` (Pilih penyedia AI) | Memilih penyedia AI; default sekaligus yang direkomendasikan adalah DeepSeek; kartu penyedia dengan Key tersimpan menampilkan titik hijau di kanan bawah |
| `Model settings` (Pengaturan model) | Memilih versi model, atau pilih "Other model (enter manually)" untuk mengisi ID model secara manual |
| `API Key` | Key yang Anda dapatkan dari penyedia terkait; hanya disimpan secara lokal |
| `Custom endpoint` (Endpoint kustom) | Menghubungkan layanan kompatibel seperti OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio |
| `Save settings` (Simpan) | Menyimpan konfigurasi; setelah menyimpan sebaiknya segarkan halaman YouTube |
| `Test configuration` | Menguji apakah konfigurasi saat ini bisa dipakai; saat berhasil langsung menampilkan satu contoh terjemahan; saat gagal menampilkan petunjuk sesuai penyebabnya (Key tidak valid / kuota habis / nama model salah / gangguan jaringan) |
| `Clear translation cache` | Menghapus cache terjemahan lokal (menampilkan jumlah entri cache saat ini); cache dibedakan per bahasa target sehingga berganti bahasa tidak saling memengaruhi |

## Tidak Punya API Key? Pakai Terjemahan Bawaan

Tanpa Key apa pun yang dikonfigurasi, ekstensi otomatis mencoba Translator / LanguageDetector bawaan Chrome 138+: terjemahan dikerjakan di perangkat Anda sendiri, teks tidak diunggah, dan tidak menimbulkan biaya. Pasangan bahasa langka yang tidak didukung di perangkat akan menampilkan panduan "Konfigurasikan ekstensi"; setelah Key dari penyedia AI mana pun dikonfigurasi, semua bahasa yang didukung bisa diterjemahkan.

Terjemahan bawaan tidak memiliki kemampuan klasifikasi tag konten; posisi tag akan menampilkan "Di perangkat / On-device".

## Penyedia, Model, dan API Key

| Penyedia | Model bawaan | Tautan pengajuan Key |
|--------|----------|--------------|
| DeepSeek (Direkomendasikan) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

Ekstensi ini gratis; masing-masing penyedia menagih berdasarkan pemakaian API sesuai aturan platform mereka.

### Endpoint Kustom

Pilih `Custom` untuk menghubungkan layanan apa pun yang kompatibel dengan format OpenAI Chat Completions. Yang perlu diisi:

- `API Endpoint`: alamat endpoint lengkap, misalnya `https://openrouter.ai/api/v1/chat/completions`
- `Model name`: ID model yang diminta penyedia, misalnya `openai/gpt-5.4-mini`
- `API Key`: key untuk penyedia tersebut

Saat pertama kali menyimpan domain baru, Chrome akan memunculkan konfirmasi izin — ini diperlukan agar ekstensi bisa mengakses penyedia tersebut secara langsung. Endpoint kustom harus menggunakan HTTPS (kecuali debugging `localhost` di mesin lokal).

## Bahasa yang Didukung

**Bahasa target (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Bahasa antarmuka (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Bahasa sumber**: tidak perlu dipilih; otomatis mengenali bahasa judul umum seperti Inggris, Tionghoa, Jepang, Korea, Thai, Spanyol, Prancis, Jerman, Portugis, Indonesia, Vietnam, Rusia, Arab, Hindi, dan lainnya.

## Privasi dan Data

```text
API Key / bahasa target / bahasa antarmuka / konfigurasi penyedia -> Penyimpanan lokal Chrome
Teks judul                                                        -> Hanya dikirim ke penyedia AI yang Anda pilih
                                                                  -> Tidak melewati server pengembang
```

Ekstensi tidak mengumpulkan data apa pun: konfigurasi ditulis ke penyimpanan lokal browser ini, dan teks judul dikirim langsung ke penyedia yang Anda konfigurasikan untuk diterjemahkan. Saat memakai terjemahan bawaan, teks tidak pernah meninggalkan perangkat Anda.

## Panduan Pengembang

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

Aktifkan mode pengembang di `chrome://extensions/`, lalu pilih folder proyek lewat "Load unpacked". Setelah mengubah kode, klik tombol refresh di kartu ekstensi, lalu segarkan halaman YouTube agar perubahan berlaku.

Menjalankan tes (Node 18+, tanpa dependensi pihak ketiga):

```bash
npm test
```

Stack teknologi: Manifest V3 (Content Script + Background Service Worker), HTML/CSS/JS native, Chrome Storage Local API, tanpa dependensi build.

## Masukan dan Dukungan

- Laporan bug dan usulan fitur: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- Kontak email: garyzhang345@gmail.com

## Lisensi

Proyek ini dirilis dengan lisensi MIT License; detailnya lihat [LICENSE](LICENSE).

*Terakhir diperbarui: 5 September 2026*
