# Traductor de títulos de YouTube - Títulos bilingües con IA

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

Una extensión de Chrome que traduce títulos de videos de YouTube con IA: la traducción sustituye al título en su posición original y el texto original se conserva debajo en tamaño reducido. Puedes comparar mientras navegas, captar rápidamente de qué va cada video y aprender cómo se escriben títulos reales en otros idiomas. Gratuita y de código abierto: la API Key y la configuración solo se guardan en tu propio navegador.

## Novedades (v8.0.3)

- **Funciona sin API Key**: sin ninguna key configurada, la extensión usa automáticamente la traducción en el dispositivo integrada en Chrome 138+, para empezar sin coste alguno
- **Reintento con un clic tras un fallo**: los títulos que fallan muestran un aviso en rojo; haz clic para volver a traducirlos
- **Corregido el error de «formato de respuesta del modelo anómalo» causado por el modo de razonamiento de DeepSeek V4**: la serie V4 activa el razonamiento por defecto y la cadena de pensamiento agotaba la cuota de salida, truncando el JSON; ahora el razonamiento está desactivado para los modelos V4
- El popup añade un botón para borrar la caché de traducciones (con el número de entradas); las tarjetas de proveedores con key guardada muestran un punto verde; al probar la configuración se muestra directamente una traducción de ejemplo
- Se añaden 12 idiomas de localización; la interfaz ya está disponible en 14 idiomas

## Funciones principales

| Función | Descripción |
|---------|-------------|
| Traducción + original a la vista | La traducción aparece como título principal y el original se conserva debajo, ideal para navegar rápido y aprender idiomas |
| Traducción contextual con IA | No es una sustitución palabra por palabra: entiende memes, tono, abreviaturas y expresiones clickbait de los títulos |
| Etiquetas de contenido | Genera automáticamente etiquetas como Tecnología, Noticias, Música o Finanzas, para ver el tipo de video antes de abrirlo |
| Traducción entre varios idiomas | Detecta automáticamente los idiomas de origen más comunes y traduce a 12 idiomas de destino; los títulos que ya están en el idioma de destino se omiten |
| Varios proveedores de IA | Integra DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI y Kimi, y admite endpoints personalizados compatibles con OpenAI |
| Traducción integrada sin key | Sin key configurada usa el Translator integrado de Chrome: se ejecuta en el dispositivo, es gratis y no sube texto |
| Caché local y privacidad | Las traducciones se guardan en caché local para evitar peticiones repetidas; la API Key y la configuración solo se conservan en tu navegador |

## Demostración

| Inglés -> Japonés | Inglés -> Coreano |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| Inglés -> Tailandés | Inglés -> Español |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Chino -> Inglés | Chino -> Francés |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Chino -> Alemán | Chino -> Portugués |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Chino -> Indonesio | Chino -> Vietnamita |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Inicio rápido

### Método 1: Chrome Web Store (recomendado)

[Instalar desde Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Método 2: instalación en modo desarrollador

1. Abre [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), descarga el zip de la última versión y descomprímelo.
2. Escribe `chrome://extensions/` en la barra de direcciones de Chrome y activa el «modo de desarrollador» en la esquina superior derecha.
3. Haz clic en «Cargar extensión sin empaquetar» y selecciona la carpeta descomprimida.

Tras instalarla, haz clic en el icono de la extensión en la barra de herramientas del navegador: primero elige el idioma de destino (`Traducir títulos a`), luego selecciona un proveedor de IA y pega tu API Key; guarda y actualiza la página de YouTube. También puedes usarla sin key; consulta la sección «Traducción integrada» más abajo.

## Configuración

![Interfaz de configuración de la extensión](screenshots/v8.0.1/config-ui.png)

| Zona | Función |
|------|---------|
| Idioma de la interfaz (Interface language) | Idioma de la interfaz de configuración (14 idiomas); no afecta a la página de YouTube ni al idioma de destino de la traducción |
| Interruptor de Traducción | Activa o desactiva la traducción automática de títulos en YouTube; al pausarla se eliminan las traducciones ya mostradas en la página |
| Traducir títulos a | Idioma de destino de los títulos; inglés por defecto |
| Elegir proveedor de IA | Selecciona el proveedor de IA; DeepSeek es la opción por defecto y la recomendada. Las tarjetas de proveedores con key guardada muestran un punto verde en la esquina inferior derecha |
| Ajustes del modelo (Model settings) | Elige la versión del modelo, o «Other model (enter manually)» para introducir manualmente un ID de modelo |
| API Key | La key que solicitaste al proveedor correspondiente; solo se guarda en local |
| Endpoint personalizado (Custom endpoint) | Conecta con servicios compatibles como OpenRouter, SiliconFlow, Volcengine Ark, Ollama o LM Studio |
| Guardar (Save settings) | Guarda la configuración; se recomienda actualizar la página de YouTube después de guardar |
| Test configuration (probar la configuración) | Comprueba si la configuración actual funciona; si tiene éxito muestra directamente una traducción de ejemplo, y si falla indica el motivo (key no válida / cuota insuficiente / nombre de modelo incorrecto / error de red) |
| Clear translation cache (borrar la caché de traducciones) | Borra la caché local de traducciones (muestra el número de entradas actuales); la caché se separa por idioma de destino y cambiar de idioma no afecta a las demás |

## ¿No tienes API Key? Usa la traducción integrada

Sin ninguna key configurada, la extensión intenta automáticamente usar el Translator / LanguageDetector integrado en Chrome 138+: la traducción se realiza en tu propio equipo, sin subir texto ni generar costes. Los pares de idiomas poco comunes no soportados en el dispositivo mostrarán la guía «Configura la extensión»; con la key de cualquier proveedor de IA podrás traducir todos los idiomas soportados.

La traducción integrada no tiene capacidad de clasificar con etiquetas de contenido; en su lugar se muestra «En el dispositivo / On-device».

## Proveedores, modelos y API Keys

| Proveedor | Modelos integrados | Dónde conseguir la key |
|-----------|--------------------|------------------------|
| DeepSeek (recomendado) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

La extensión en sí es gratuita; cada proveedor factura según el uso de la API, conforme a las reglas de su plataforma.

### Endpoint personalizado

Selecciona `Personalizado` (`Custom`) para conectar cualquier servicio compatible con el formato OpenAI Chat Completions. Campos obligatorios:

- `API Endpoint`: la URL completa del endpoint, por ejemplo `https://openrouter.ai/api/v1/chat/completions`
- `Model name`: el ID de modelo que exige el proveedor, por ejemplo `openai/gpt-5.4-mini`
- `API Key`: la clave del proveedor correspondiente

Al guardar un dominio nuevo por primera vez, Chrome mostrará una confirmación de permisos, necesaria para que la extensión acceda directamente a ese proveedor. Los endpoints personalizados deben usar HTTPS (excepto la depuración local en `localhost`).

## Idiomas soportados

**Idiomas de destino (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Idiomas de la interfaz (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Idiomas de origen**: no hace falta elegir; se detectan automáticamente inglés, chino, japonés, coreano, tailandés, español, francés, alemán, portugués, indonesio, vietnamita, ruso, árabe, hindi y otros idiomas comunes en los títulos.

## Privacidad y datos

```text
API Key / idioma de destino / idioma de la interfaz / configuración del proveedor -> almacenamiento local de Chrome
Texto del título                                                                  -> solo se envía al proveedor de IA que tú elijas
                                                                                  -> no pasa por el servidor del desarrollador
```

La extensión no recoge ningún dato: la configuración se guarda en el almacenamiento local de tu navegador y el texto de los títulos se envía directamente al proveedor que hayas configurado para traducir. Con la traducción integrada, el texto no sale de tu equipo.

## Guía para desarrolladores

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

En `chrome://extensions/`, activa el modo de desarrollador y usa «Cargar extensión sin empaquetar» para seleccionar la carpeta del proyecto. Tras modificar el código, haz clic en el botón de recargar de la tarjeta de la extensión y actualiza la página de YouTube para aplicar los cambios.

Ejecutar los tests (Node 18+, sin dependencias de terceros):

```bash
npm test
```

Stack técnico: Manifest V3 (Content Script + Background Service Worker), HTML/CSS/JS nativos, Chrome Storage Local API, sin dependencias de compilación.

## Comentarios y soporte

- Informes de errores y sugerencias de funciones: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- Contacto por correo: garyzhang345@gmail.com

## Licencia

Este proyecto se distribuye bajo la licencia MIT; consulta [LICENSE](LICENSE) para más detalles.

*Última actualización: 5 de septiembre de 2026*
