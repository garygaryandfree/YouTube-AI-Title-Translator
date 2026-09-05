# AI Title Translator - Titres YouTube bilingues avec IA

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

Une extension Chrome qui traduit les titres des vidéos YouTube avec l'IA : la traduction remplace le titre à son emplacement d'origine, tandis que le titre original reste affiché en plus petit en dessous. Comparez tout en naviguant : jaugez rapidement le contenu d'une vidéo et découvrez comment les titres s'écrivent vraiment dans d'autres langues. Gratuite et open source, l'extension conserve votre API Key et votre configuration uniquement dans votre propre navigateur.

## Mises à jour récentes (v8.0.3)

- **Utilisable sans API Key** : sans clé configurée, l'extension bascule automatiquement sur la traduction embarquée de Chrome 138+, pour une prise en main à coût nul
- **Nouvelle tentative en un clic après un échec** : les titres en échec affichent un indicateur rouge, un clic relance la traduction
- **Correction de l'erreur « format de réponse du modèle anormal » liée au mode réflexion de DeepSeek V4** : la série V4 active la réflexion par défaut, et la chaîne de raisonnement épuisait le quota de sortie, ce qui tronquait le JSON ; la réflexion est désormais désactivée pour les modèles V4
- Le popup ajoute un bouton d'effacement du cache de traduction (avec le nombre d'entrées) ; les cartes des fournisseurs dont la clé est enregistrée affichent un point vert ; le test de configuration affiche directement un exemple de traduction
- 12 nouvelles langues de localisation, pour un total de 14 langues d'interface

## Fonctionnalités principales

| Fonctionnalité | Description |
|------|------|
| Traduction + original côte à côte | La traduction s'affiche comme titre principal et l'original reste en dessous, pour parcourir rapidement les vidéos et apprendre la langue |
| Traduction contextuelle par IA | Pas de remplacement mot à mot : l'IA comprend les jeux de mots, le ton, les abréviations et les accroches racoleuses des titres |
| Tags de contenu | Génère automatiquement des tags comme Tech, News, Musique ou Finance : voyez d'abord le type avant de décider de cliquer |
| Traduction multilingue | Détecte automatiquement les langues sources courantes et traduit vers 12 langues cibles ; les titres déjà dans la langue cible sont ignorés |
| Plusieurs fournisseurs IA | DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI et Kimi intégrés, avec prise en charge d'endpoints personnalisés compatibles OpenAI |
| Traduction intégrée sans clé | Sans clé configurée, utilise le Translator intégré de Chrome : fonctionne sur l'appareil, gratuit, aucun texte envoyé |
| Cache local et confidentialité | Les traductions sont mises en cache localement pour éviter les requêtes répétées ; l'API Key et la configuration restent dans ce navigateur |

## Démonstration

| Anglais -> Japonais | Anglais -> Coréen |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| Anglais -> Thaï | Anglais -> Espagnol |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Chinois -> Anglais | Chinois -> Français |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Chinois -> Allemand | Chinois -> Portugais |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Chinois -> Indonésien | Chinois -> Vietnamien |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Démarrage rapide

### Méthode 1 : Chrome Web Store (recommandé)

[Installer depuis le Chrome Web Store](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Méthode 2 : installation en mode développeur

1. Ouvrez [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), téléchargez le zip de la dernière version et décompressez-le.
2. Saisissez `chrome://extensions/` dans la barre d'adresse de Chrome et activez le « Mode développeur » en haut à droite.
3. Cliquez sur « Charger l'extension non empaquetée » et sélectionnez le dossier décompressé.

Après l'installation, cliquez sur l'icône de l'extension dans la barre d'outils du navigateur : choisissez d'abord la langue cible (`Translate titles into` / « Traduire les titres en »), puis un fournisseur IA, collez votre API Key, enregistrez et actualisez la page YouTube. Sans clé, l'extension fonctionne aussi directement ; voir la section « Traduction intégrée » ci-dessous.

## Configuration

![Interface de configuration de l'extension](screenshots/v8.0.1/config-ui.png)

| Zone | Rôle |
|------|------|
| `Interface language` (« Langue de l'interface ») | Langue d'affichage de l'interface de configuration (14 langues) ; n'affecte ni la page YouTube ni la langue de traduction |
| `Translation` (interrupteur) | Active ou non la traduction automatique des titres sur les pages YouTube ; en pause, les traductions déjà affichées sont retirées de la page |
| `Translate titles into` (« Traduire les titres en ») | Langue cible des titres, anglais par défaut |
| `Choose AI provider` (« Choisir le fournisseur IA ») | Choisit le fournisseur IA, DeepSeek par défaut et recommandé ; les cartes des fournisseurs dont la clé est enregistrée affichent un point vert en bas à droite |
| `Model settings` (« Paramètres du modèle ») | Choisit la version du modèle, ou l'option « autre » pour saisir manuellement un ID de modèle |
| `API Key` | La clé obtenue auprès du fournisseur correspondant, conservée uniquement en local |
| `Custom endpoint` (« Endpoint personnalisé ») | Connecte OpenRouter, SiliconFlow, Volcengine Ark, Ollama, LM Studio et d'autres services compatibles |
| `Save settings` (« Enregistrer ») | Enregistre la configuration ; il est conseillé d'actualiser la page YouTube après l'enregistrement |
| `Test configuration` | Teste si la configuration actuelle fonctionne ; en cas de succès, affiche directement un exemple de traduction ; en cas d'échec, indique la cause (clé invalide / quota insuffisant / nom de modèle erroné / erreur réseau) |
| `Clear translation cache` | Efface le cache local des traductions (affiche le nombre d'entrées en cache) ; le cache est séparé par langue cible, changer de langue n'y touche pas |

## Pas d'API Key ? Utilisez la traduction intégrée

Sans aucune clé configurée, l'extension utilise automatiquement le Translator / LanguageDetector intégré à Chrome 138+ : la traduction se fait sur votre machine, sans envoyer de texte et sans frais. Les paires de langues rares non prises en charge sur l'appareil affichent une invite « veuillez configurer l'extension » ; configurez la clé de n'importe quel fournisseur IA pour traduire toutes les langues prises en charge.

La traduction intégrée ne sait pas classer les tags de contenu ; leur emplacement affiche « 本机 / On-device ».

## Fournisseurs, modèles et API Key

| Fournisseur | Modèles intégrés | Où obtenir la clé |
|--------|----------|--------------|
| DeepSeek (recommandé) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

L'extension elle-même est gratuite ; chaque fournisseur facture selon l'usage de l'API, selon les règles de sa plateforme.

### Endpoint personnalisé

Choisissez `Custom` pour connecter tout service compatible avec le format OpenAI Chat Completions. Champs à remplir :

- `API Endpoint` : l'URL complète de l'interface, par exemple `https://openrouter.ai/api/v1/chat/completions`
- `Model name` : l'ID de modèle exigé par le fournisseur, par exemple `openai/gpt-5.4-mini`
- `API Key` : la clé du fournisseur correspondant

Lors du premier enregistrement d'un nouveau domaine, Chrome affiche une demande d'autorisation, indispensable pour que l'extension accède directement à ce fournisseur. Les endpoints personnalisés doivent utiliser HTTPS (sauf le débogage local sur `localhost`).

## Langues prises en charge

**Langues cibles (12)** : 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Langues d'interface (14)** : English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Langues sources** : aucune sélection nécessaire ; l'extension reconnaît automatiquement les langues de titres courantes comme l'anglais, le chinois, le japonais, le coréen, le thaï, l'espagnol, le français, l'allemand, le portugais, l'indonésien, le vietnamien, le russe, l'arabe et le hindi.

## Confidentialité et données

```text
API Key / langue cible / langue d'interface / configuration du fournisseur -> stockage local de Chrome
Texte des titres                                                           -> envoyé uniquement au fournisseur IA que vous avez choisi
                                                                           -> ne passe pas par le serveur de l'auteur
```

L'extension ne collecte aucune donnée : la configuration est écrite dans le stockage local du navigateur actuel, et le texte des titres est envoyé directement au fournisseur que vous avez configuré pour la traduction. Avec la traduction intégrée, le texte ne quitte pas votre machine.

## Guide du développeur

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

Activez le mode développeur sur `chrome://extensions/` et choisissez le dossier du projet via « Charger l'extension non empaquetée ». Après avoir modifié le code, cliquez sur le bouton d'actualisation de la carte de l'extension, puis actualisez la page YouTube pour appliquer.

Exécuter les tests (Node 18+, sans dépendance tierce) :

```bash
npm test
```

Stack technique : Manifest V3 (Content Script + Background Service Worker), HTML/CSS/JS natif, Chrome Storage Local API, sans étape de build.

## Retour et support

- Rapports de bugs et suggestions de fonctionnalités : [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- Contact par e-mail : garyzhang345@gmail.com

## Licence

Ce projet est publié sous MIT License. Voir [LICENSE](LICENSE) pour le détail.

*Dernière mise à jour : 5 septembre 2026*
