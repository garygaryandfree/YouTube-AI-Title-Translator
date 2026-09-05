# YouTube タイトル翻訳 - AI 二言語タイトル

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

YouTube の動画タイトルを AI で翻訳する Chrome 拡張機能です。翻訳は元のタイトルの位置にそのまま置き換わって表示され、元のタイトルは小さくその下に残ります。閲覧しながら対照できるので、動画の内容をすばやく判断できるだけでなく、他の言語の自然なタイトル表現を学ぶこともできます。無料のオープンソースで、API Key と設定はあなた自身のブラウザ内にのみ保存されます。

## 最近の更新（v8.0.3）

- **API Key なしでも使える**：Key が未設定の場合、Chrome 138+ 内蔵の端末内翻訳に自動的に切り替わり、コストゼロですぐに使えます
- **翻訳失敗時はクリックで再試行**：失敗したタイトルには赤い表示が出て、クリックするだけで再翻訳できます
- **DeepSeek V4 の思考モードによる「モデルの応答形式が異常です」問題を修正**：V4 シリーズはデフォルトで思考が有効になっており、思考チェーンが出力枠を使い切って JSON が途中で切れてしまうため、V4 モデルでは思考を無効化しました
- ポップアップに翻訳キャッシュ削除ボタンを追加（件数表示付き）。Key 保存済みのプロバイダーカードには緑のドットを表示。設定テスト時にはサンプル翻訳をその場で表示します
- ローカライズ言語を 12 種類追加し、インターフェース言語は全 14 種類になりました

## 主な機能

| 機能 | 説明 |
|------|------|
| 翻訳 + 原文の対照表示 | 翻訳をメインタイトルとして表示し、原文はその下に残します。一覧の素早い確認や語学学習に便利です |
| AI による文脈翻訳 | 単語の置き換えではなく、タイトルに含まれるネタ、語調、略語、釣りタイトル的な表現まで理解して翻訳します |
| コンテンツタグ | テクノロジー、ニュース、音楽、金融などのコンテンツタグを自動生成し、ジャンルを見てから開くかどうか判断できます |
| 多言語間翻訳 | 一般的な原言語を自動認識し、12 種類の翻訳先言語に翻訳できます。すでに翻訳先言語になっているタイトルは自動的にスキップします |
| 複数の AI プロバイダー | DeepSeek、OpenAI、Gemini、Claude、MiniMax、Z.AI、Kimi を内蔵。OpenAI 互換のカスタムエンドポイントにも対応 |
| Key 不要の内蔵翻訳 | Key 未設定時は Chrome 内蔵の Translator を使用。端末上で動作し、無料で、テキストもアップロードされません |
| ローカルキャッシュとプライバシー | 翻訳結果をローカルにキャッシュして重複リクエストを回避。API Key と設定は現在のブラウザにのみ保存されます |

## デモ

| 英語 -> 日本語 | 英語 -> 韓国語 |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| 英語 -> タイ語 | 英語 -> スペイン語 |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| 中国語 -> 英語 | 中国語 -> フランス語 |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| 中国語 -> ドイツ語 | 中国語 -> ポルトガル語 |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| 中国語 -> インドネシア語 | 中国語 -> ベトナム語 |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## クイックスタート

### 方法 1：Chrome ウェブストア（推奨）

[Chrome ウェブストアからインストール](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### 方法 2：デベロッパーモードでインストール

1. [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases) を開き、最新バージョンの zip をダウンロードして解凍します。
2. Chrome のアドレスバーに `chrome://extensions/` と入力し、右上の「デベロッパーモード」を有効にします。
3. 「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍したフォルダーを選択します。

インストール後、ブラウザのツールバーにある拡張機能アイコンをクリックします。まず翻訳先の言語（「タイトルの翻訳先」/ `Translate titles into`）を選び、次に AI プロバイダーを選んで API Key を貼り付け、保存してから YouTube ページを更新してください。Key がなくてもそのまま使えます。詳しくは後述の「内蔵翻訳」をご覧ください。

## 設定画面の説明

![拡張機能の設定画面](screenshots/v8.0.1/config-ui.png)

| エリア | 役割 |
|------|------|
| インターフェース言語（Interface language） | 設定画面の表示言語（14 種類）。YouTube ページや翻訳先の言語には影響しません |
| 翻訳（Translation）スイッチ | YouTube ページでタイトルを自動翻訳するかどうか。一時停止すると、ページに描画済みの翻訳は取り除かれます |
| タイトルの翻訳先（Translate titles into） | タイトルの翻訳先言語。デフォルトは英語 |
| AI プロバイダーを選択（Choose AI provider） | 使用する AI プロバイダーを選択。デフォルトかつ推奨は DeepSeek。Key 保存済みのプロバイダーカードの右下には緑のドットが付きます |
| モデル設定（Model settings） | モデルバージョンを選択するか、「Other model (enter manually)」を選んでモデル ID を手動で入力します |
| API Key | 各プロバイダーで申請した Key。ローカルにのみ保存されます |
| カスタムエンドポイント（Custom endpoint） | OpenRouter、SiliconFlow、Volcengine Ark、Ollama、LM Studio などの互換サービスに接続できます |
| 保存（Save settings） | 設定を保存します。保存後は YouTube ページの更新をおすすめします |
| Test configuration（設定のテスト） | 現在の設定が利用可能かテストします。成功時はサンプル翻訳を 1 件その場で表示。失敗時は原因に応じて案内します（Key が無効 / 残高不足 / モデル名の誤り / ネットワークエラー） |
| Clear translation cache（翻訳キャッシュを削除） | ローカルの翻訳キャッシュを削除します（現在のキャッシュ件数を表示）。キャッシュは翻訳先言語ごとに分かれているため、言語を切り替えても互いに影響しません |

## API Key がない場合は内蔵翻訳を

Key が 1 つも設定されていない場合、拡張機能は Chrome 138+ 内蔵の Translator / LanguageDetector を自動的に試します。翻訳はお使いの端末上で完結し、テキストのアップロードも費用も発生しません。端末内で対応していない言語ペアの場合は「拡張機能を設定してください」という案内が表示され、いずれかの AI プロバイダーの Key を設定すれば、対応するすべての言語を翻訳できます。

内蔵翻訳にはコンテンツタグの分類機能がないため、タグの位置には「端末内 / On-device」と表示されます。

## プロバイダー、モデル、API Key

| プロバイダー | 内蔵モデル | Key の申請ページ |
|--------|----------|--------------|
| DeepSeek（推奨） | `deepseek-v4-flash`、`deepseek-v4-pro`、`deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`、`gpt-5.4-mini`、`gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`、`gemini-3-pro-preview`、`gemini-3-flash-preview`、`gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`、`claude-opus-4-6`、`claude-sonnet-4-6`、`claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`、`MiniMax-M2.7`、`MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`、`glm-5.1-flash`、`glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`、`kimi-k2.6-turbo`、`kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

拡張機能自体は無料です。各プロバイダーは API 使用量に応じて課金します。詳しくは各プラットフォームの規約をご確認ください。

### カスタムエンドポイント

「カスタム」（`Custom`）を選択すると、OpenAI Chat Completions 形式に対応した任意のサービスに接続できます。入力が必要な項目：

- `API エンドポイント`（API Endpoint）：完全な API の URL。例：`https://openrouter.ai/api/v1/chat/completions`
- `モデル名`（Model name）：プロバイダーが要求するモデル ID。例：`openai/gpt-5.4-mini`
- `API Key`：各プロバイダーのキー

新しいドメインを初めて保存するとき、Chrome が権限の確認を表示します。これは拡張機能がそのプロバイダーへ直接アクセスするために必要です。カスタムエンドポイントは HTTPS 必須です（ローカルの `localhost` デバッグを除く）。

## 対応言語

**翻訳先言語（12 種類）**：简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**インターフェース言語（14 種類）**：English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**原言語**：選択は不要です。英語、中国語、日本語、韓国語、タイ語、スペイン語、フランス語、ドイツ語、ポルトガル語、インドネシア語、ベトナム語、ロシア語、アラビア語、ヒンディー語など、一般的なタイトル言語を自動認識します。

## プライバシーとデータ

```text
API Key / 翻訳先言語 / インターフェース言語 / プロバイダー設定 -> Chrome のローカルストレージ
タイトルテキスト                                                -> 自分で選んだ AI プロバイダーにのみ送信
                                                                -> 開発者のサーバーは経由しません
```

この拡張機能は一切のデータを収集しません。設定は現在のブラウザのローカルストレージに保存され、タイトルテキストは翻訳のために設定したプロバイダーへ直接送信されます。内蔵翻訳を使用する場合、テキストは端末の外に出ません。

## 開発者向けガイド

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

`chrome://extensions/` でデベロッパーモードを有効にし、「パッケージ化されていない拡張機能を読み込む」でプロジェクトフォルダーを選択します。コードを変更したら拡張機能カードの再読み込みボタンをクリックし、YouTube ページを更新すると反映されます。

テストの実行（Node 18 以上、サードパーティ依存なし）：

```bash
npm test
```

技術スタック：Manifest V3（Content Script + Background Service Worker）、プレーンな HTML/CSS/JS、Chrome Storage Local API。ビルド依存はありません。

## フィードバックとサポート

- バグ報告・機能要望：[GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- メール：garyzhang345@gmail.com

## ライセンス

このプロジェクトは MIT License のもとで公開されています。詳細は [LICENSE](LICENSE) をご覧ください。

*最終更新：2026年9月5日*
