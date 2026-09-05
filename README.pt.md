# Tradutor de Títulos do YouTube - Títulos bilíngues com IA

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

Uma extensão do Chrome: traduz títulos de vídeos do YouTube com IA. A tradução substitui o título na posição original, e o texto original fica menor logo abaixo. Compare enquanto navega — dá para entender rapidamente do que o vídeo se trata e também aprender como títulos reais são escritos em outros idiomas. Gratuita e open source; a API Key e as configurações ficam apenas no seu próprio navegador.

## Atualizações recentes (v8.0.3)

- **Funciona sem API Key**: sem nenhuma Key configurada, a extensão passa a usar automaticamente a tradução no dispositivo integrada ao Chrome 138+, com custo zero para começar
- **Clique para tentar novamente em caso de falha**: títulos com falha exibem um aviso em vermelho; um clique traduz novamente
- **Corrigido o erro "formato de resposta do modelo anormal" causado pelo modo de pensamento do DeepSeek V4**: a série V4 ativa o raciocínio (thinking) por padrão, e a cadeia de raciocínio esgotava a cota de saída, truncando o JSON; agora o modo de pensamento está desativado para os modelos V4
- O popup ganhou um botão para limpar o cache de traduções (com contagem de entradas); cartões de provedores com Key salva exibem um ponto verde; ao testar a configuração, uma tradução de exemplo é exibida diretamente
- Adicionados 12 idiomas de localização, totalizando 14 idiomas de interface

## Funcionalidades principais

| Recurso | Descrição |
|---------|-----------|
| Tradução + original lado a lado | A tradução aparece como título principal e o original permanece abaixo, facilitando a navegação rápida e o aprendizado de idiomas |
| Tradução contextual com IA | Não é substituição palavra por palavra: entende memes, tom, abreviações e expressões caça-cliques dos títulos |
| Tags de conteúdo | Gera automaticamente tags como Tecnologia, Notícias, Música e Finanças — veja a categoria antes de decidir se abre o vídeo |
| Tradução entre vários idiomas | Reconhece automaticamente idiomas de origem comuns e traduz para 12 idiomas de destino; títulos que já estão no idioma de destino são ignorados |
| Vários provedores de IA | DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI e Kimi integrados, com suporte a endpoints personalizados compatíveis com OpenAI |
| Tradução integrada sem Key | Sem Key configurada, usa o Translator integrado do Chrome: roda no dispositivo, é gratuito e não envia texto |
| Cache local e privacidade | Traduções ficam em cache local para evitar requisições repetidas; API Key e configurações são salvas apenas no navegador atual |

## Demonstração

| Inglês -> Japonês | Inglês -> Coreano |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| Inglês -> Tailandês | Inglês -> Espanhol |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Chinês -> Inglês | Chinês -> Francês |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Chinês -> Alemão | Chinês -> Português |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Chinês -> Indonésio | Chinês -> Vietnamita |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Início rápido

### Método 1: Chrome Web Store (recomendado)

[Clique para instalar a partir da Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Método 2: Instalação em modo de desenvolvedor

1. Abra o [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), baixe o zip da versão mais recente e extraia-o.
2. Digite `chrome://extensions/` na barra de endereços do Chrome e ative o "Modo de desenvolvedor" no canto superior direito.
3. Clique em "Carregar sem compactação" e selecione a pasta extraída.

Após a instalação, clique no ícone da extensão na barra de ferramentas do navegador: primeiro escolha o idioma de destino (`Translate titles into`), depois selecione um provedor de IA e cole a API Key; salve e atualize a página do YouTube. Também funciona sem Key — veja a seção "Tradução integrada" abaixo.

## Configuração

![Interface de configuração da extensão](screenshots/v8.0.1/config-ui.png)

| Área | Função |
|------|--------|
| Interface language（Idioma da interface） | Idioma de exibição da interface de configuração (14 idiomas); não afeta a página do YouTube nem o destino da tradução |
| Chave Translation（Tradução） | Define se os títulos são traduzidos automaticamente nas páginas do YouTube; ao pausar, as traduções já renderizadas são removidas da página |
| Translate titles into（Traduzir títulos para） | Idioma de destino da tradução dos títulos; o padrão é inglês |
| Choose AI provider（Escolher provedor de IA） | Seleciona o provedor de IA; o padrão e recomendado é o DeepSeek; cartões de provedores com Key salva exibem um ponto verde no canto inferior direito |
| Model settings（Configurações do modelo） | Escolhe a versão do modelo, ou a opção "Other model (enter manually)" para inserir manualmente um ID de modelo |
| API Key | A Key que você solicitou ao provedor correspondente; salva apenas localmente |
| Custom endpoint（Endpoint personalizado） | Conecta serviços compatíveis como OpenRouter, SiliconFlow, Volcengine Ark, Ollama e LM Studio |
| Save settings（Salvar） | Salva a configuração; recomenda-se atualizar a página do YouTube depois de salvar |
| Test configuration | Testa se a configuração atual funciona; em caso de sucesso, exibe diretamente uma tradução de exemplo; em caso de falha, indica o motivo (Key inválida / cota insuficiente / nome do modelo incorreto / erro de rede) |
| Clear translation cache | Limpa o cache local de traduções (exibe o número atual de entradas); o cache é separado por idioma de destino, então trocar de idioma não causa interferência |

## Sem API Key? Use a tradução integrada

Sem nenhuma Key configurada, a extensão tenta automaticamente o Translator / LanguageDetector integrado do Chrome 138+: a tradução acontece no seu dispositivo, sem envio de texto e sem custo. Pares de idiomas incomuns não suportados no dispositivo exibem a orientação "configure a extensão"; basta configurar a Key de qualquer provedor de IA para traduzir todos os idiomas suportados.

A tradução integrada não tem a capacidade de classificar tags de conteúdo; a posição da tag exibe "本机 / On-device".

## Provedores, modelos e API Keys

| Provedor | Modelos integrados | Onde solicitar a Key |
|----------|--------------------|----------------------|
| DeepSeek (recomendado) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

A extensão em si é gratuita; cada provedor cobra pelo uso da API conforme as regras da sua plataforma.

### Endpoint personalizado

Selecione `Custom`（Personalizado）para conectar qualquer serviço compatível com o formato OpenAI Chat Completions. Campos obrigatórios:

- `API Endpoint`（Endpoint da API）: endereço completo da API, por exemplo `https://openrouter.ai/api/v1/chat/completions`
- `Model name`（Nome do modelo）: ID do modelo exigido pelo provedor, por exemplo `openai/gpt-5.4-mini`
- `API Key`: a chave do provedor correspondente

Ao salvar um novo domínio pela primeira vez, o Chrome exibe uma confirmação de permissão, necessária para que a extensão acesse o provedor diretamente. Endpoints personalizados devem usar HTTPS (exceto depuração local em `localhost`).

## Idiomas suportados

**Idiomas de destino (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Idiomas da interface (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Idiomas de origem**: não é preciso escolher; a extensão reconhece automaticamente inglês, chinês, japonês, coreano, tailandês, espanhol, francês, alemão, português, indonésio, vietnamita, russo, árabe, hindi e outros idiomas comuns em títulos.

## Privacidade e dados

```text
API Key / idioma de destino / idioma da interface / configuração do provedor -> armazenamento local do Chrome
Texto dos títulos                                                          -> enviado apenas ao provedor de IA que você escolheu
                                                                           -> não passa pelo servidor do autor
```

A extensão não coleta nenhum dado: as configurações são gravadas no armazenamento local do navegador atual, e o texto dos títulos é enviado diretamente ao provedor que você configurou para a tradução. Ao usar a tradução integrada, o texto não sai do seu dispositivo.

## Guia do desenvolvedor

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

Ative o modo de desenvolvedor em `chrome://extensions/` e use "Carregar sem compactação" selecionando a pasta do projeto. Após modificar o código, clique no botão de atualização no cartão da extensão e atualize a página do YouTube para aplicar.

Execute os testes (Node 18+, sem dependências de terceiros):

```bash
npm test
```

Stack técnica: Manifest V3 (Content Script + Background Service Worker), HTML/CSS/JS nativo, Chrome Storage Local API, sem etapa de build.

## Feedback e suporte

- Relato de bugs e sugestões de funcionalidades: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- Contato por e-mail: garyzhang345@gmail.com

## Licença

Este projeto é open source sob a MIT License. Detalhes em [LICENSE](LICENSE).

*Última atualização: 5 de setembro de 2026*
