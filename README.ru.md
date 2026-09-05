# AI-переводчик заголовков YouTube — двуязычные заголовки с ИИ

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

Расширение Chrome, которое переводит заголовки видео YouTube с помощью ИИ: перевод показывается прямо на месте оригинала, а оригинальный заголовок уменьшенным шрифтом остается ниже. Удобно сравнивать во время просмотра — можно быстро понять, о чем видео, и заодно учить реальные заголовки на другом языке. Бесплатно и с открытым исходным кодом: API Key и настройки хранятся только в вашем браузере.

## Последние обновления (v8.0.3)

- **Работает без API Key**: если Key не настроен, автоматически используется встроенный в Chrome 138+ перевод на устройстве — можно начать с нулевыми затратами
- **Повтор при ошибке перевода**: непереведенный заголовок подсвечивается красным — нажмите на него, чтобы перевести заново
- **Исправлена ошибка «модель вернула неверный формат» из-за режима размышлений DeepSeek V4**: у серии V4 режим reasoning включен по умолчанию, цепочка рассуждений исчерпывала лимит вывода и обрезала JSON; для моделей V4 размышления теперь отключены
- В popup добавлена кнопка очистки кэша переводов (с показом числа записей); на карточках провайдеров с сохраненным Key отображается зеленая точка; при тестировании конфигурации сразу показывается пример перевода
- Добавлено 12 языков локализации — интерфейс доступен на 14 языках

## Основные возможности

| Возможность | Описание |
|------|------|
| Перевод + оригинал | Перевод показывается как основной заголовок, оригинал остается ниже — удобно для быстрого просмотра и изучения языка |
| Контекстный ИИ-перевод | Не дословная замена: ИИ понимает мемы, тон, сокращения и кликбейт в заголовках |
| Тематические теги | Автоматически создает теги вроде «Технологии», «Новости», «Музыка», «Финансы» — сначала видите категорию, потом решаете, открывать ли видео |
| Перевод между языками | Автоматически распознает распространенные исходные языки и переводит на 12 целевых; заголовки уже на целевом языке пропускаются |
| Несколько ИИ-провайдеров | Встроены DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI, Kimi; поддерживаются пользовательские OpenAI-совместимые endpoint |
| Встроенный перевод без Key | Без настроенного Key используется встроенный в Chrome Translator: работает на устройстве, бесплатно, текст никуда не отправляется |
| Локальный кэш и приватность | Переводы кэшируются локально, чтобы не повторять запросы; API Key и настройки хранятся только в текущем браузере |

## Демонстрация

| Английский -> Японский | Английский -> Корейский |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| Английский -> Тайский | Английский -> Испанский |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Китайский -> Английский | Китайский -> Французский |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Китайский -> Немецкий | Китайский -> Португальский |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Китайский -> Индонезийский | Китайский -> Вьетнамский |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Быстрый старт

### Способ 1: Chrome Web Store (рекомендуется)

[Установить из Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Способ 2: установка в режиме разработчика

1. Откройте [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), скачайте zip последней версии и распакуйте его.
2. Введите `chrome://extensions/` в адресной строке Chrome и включите «Режим разработчика» в правом верхнем углу.
3. Нажмите «Загрузить распакованное расширение» и выберите распакованную папку.

После установки нажмите значок расширения на панели инструментов: сначала выберите целевой язык (`Переводить заголовки на` / `Translate titles into`), затем выберите ИИ-провайдера и вставьте API Key, сохраните и обновите страницу YouTube. Можно пользоваться и без Key — см. раздел «Встроенный перевод» ниже.

## Настройка

![Интерфейс настроек расширения](screenshots/v8.0.1/config-ui.png)

| Элемент | Назначение |
|------|------|
| Язык интерфейса (Interface language) | Язык интерфейса настроек (14 языков); не влияет на страницу YouTube и целевой язык перевода |
| Переключатель «Перевод» (Translation) | Автоматически переводить заголовки на страницах YouTube; при паузе уже выведенные переводы удаляются со страницы |
| Переводить заголовки на (Translate titles into) | Целевой язык перевода заголовков, по умолчанию английский |
| Выберите AI-провайдера (Choose AI provider) | Выбор ИИ-провайдера; по умолчанию и рекомендуется DeepSeek; на карточке провайдера с сохраненным Key — зеленая точка в правом нижнем углу |
| Настройки модели (Model settings) | Выбор версии модели или варианта «Other model» с ручным вводом ID модели |
| API Key | Ключ, полученный у выбранного провайдера; хранится только локально |
| Свой endpoint (Custom endpoint) | Подключение OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio и других совместимых сервисов |
| Сохранить (Save settings) | Сохранить настройки; после сохранения рекомендуется обновить страницу YouTube |
| Test configuration | Проверить текущую конфигурацию: при успехе сразу показывается пример перевода; при ошибке — причина (неверный Key / исчерпана квота / неверное имя модели / сбой сети) |
| Clear translation cache | Очистить локальный кэш переводов (показывает текущее число записей); кэш разделяется по целевым языкам, переключение языка не затрагивает другие записи |

## Нет API Key? Используйте встроенный перевод

Если не настроен ни один Key, расширение автоматически пробует встроенные в Chrome 138+ Translator / LanguageDetector: перевод выполняется на вашем устройстве, текст не отправляется на сервер и ничего не стоит. Для редких языковых пар, не поддерживаемых на устройстве, отображается подсказка настроить расширение — после настройки Key любого ИИ-провайдера доступны все поддерживаемые языки.

Встроенный перевод не умеет создавать тематические теги, поэтому на их месте отображается «On-device» (локально).

## Провайдеры, модели и API Key

| Провайдер | Встроенные модели | Где получить Key |
|--------|----------|--------------|
| DeepSeek (рекомендуется) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

Само расширение бесплатно; провайдеры взимают плату за использование API согласно правилам своих платформ.

### Свой endpoint

Выберите `Custom`, чтобы подключить любой сервис, совместимый с форматом OpenAI Chat Completions. Нужно заполнить:

- `API Endpoint`: полный адрес API, например `https://openrouter.ai/api/v1/chat/completions`
- `Model name`: ID модели, требуемый провайдером, например `openai/gpt-5.4-mini`
- `API Key`: ключ соответствующего провайдера

При первом сохранении нового домена Chrome запросит разрешение — оно необходимо, чтобы расширение могло напрямую обращаться к этому провайдеру. Пользовательский endpoint должен использовать HTTPS (кроме локальной отладки через `localhost`).

## Поддерживаемые языки

**Целевые языки (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Языки интерфейса (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Исходные языки**: выбирать не нужно — автоматически распознаются распространенные языки заголовков: английский, китайский, японский, корейский, тайский, испанский, французский, немецкий, португальский, индонезийский, вьетнамский, русский, арабский, хинди и другие.

## Конфиденциальность и данные

```text
API Key / целевой язык / язык интерфейса / настройки провайдера -> локальное хранилище Chrome
Текст заголовка                                                   -> отправляется только выбранному вами ИИ-провайдеру
                                                                    -> не проходит через сервер автора
```

Расширение не собирает никаких данных: настройки записываются в локальное хранилище текущего браузера, а текст заголовков отправляется напрямую настроенному вами провайдеру для перевода. При использовании встроенного перевода текст не покидает устройство.

## Для разработчиков

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

Включите режим разработчика на `chrome://extensions/` и выберите папку проекта через «Загрузить распакованное расширение». После изменения кода нажмите кнопку обновления на карточке расширения, затем обновите страницу YouTube.

Запуск тестов (Node 18+, без сторонних зависимостей):

```bash
npm test
```

Стек: Manifest V3 (Content Script + Background Service Worker), нативные HTML/CSS/JS, Chrome Storage Local API, без этапа сборки.

## Обратная связь и поддержка

- Отчеты об ошибках и предложения по функциям: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- Почта: garyzhang345@gmail.com

## Лицензия

Проект распространяется под лицензией MIT License, подробности — в файле [LICENSE](LICENSE).

*Последнее обновление: 5 сентября 2026 г.*
