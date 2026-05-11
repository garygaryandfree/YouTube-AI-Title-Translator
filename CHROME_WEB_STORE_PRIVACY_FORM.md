# Chrome Web Store Privacy Form Checklist

Use this checklist when completing the Chrome Web Store Developer Dashboard privacy form.

## Privacy Policy URL

Use one of these public URLs:

- GitHub page: https://github.com/garygaryandfree/YouTube-AI-Title-Translator/blob/main/PRIVACY.md
- Raw text: https://raw.githubusercontent.com/garygaryandfree/YouTube-AI-Title-Translator/main/PRIVACY.md

## Data Types To Disclose

Disclose the following data types if the form asks what user data the extension handles:

- Website content: YouTube video titles visible on the page are read so the extension can translate and display bilingual titles.
- Authentication information: API keys entered by the user are stored locally and used to call the user-selected AI service.
- User activity or user settings/preferences: selected provider, model, endpoint, translation switch, and local translation cache are stored locally for extension functionality.

Do not claim that the extension collects personal identity, financial information, health information, or precise location.

## Data Use Statements

Use these statements where relevant:

- User data is used only to provide the extension's title translation features.
- API keys, preferences, and cached translations are stored locally in the user's browser.
- The developer does not operate a server for this extension.
- The extension does not sell user data.
- The extension does not use user data for advertising.
- The extension does not use user data for creditworthiness, lending, or unrelated analytics.
- When translation is enabled, visible YouTube title text is sent directly from the user's browser to the AI service endpoint selected by the user.

## Permissions Justification

- `storage`: saves API keys, provider/model settings, translation switch state, and local translation cache in the browser.
- `https://*.youtube.com/*`: reads visible YouTube video titles and inserts translated titles on YouTube pages.
- AI service host permissions: allow the extension to send translation requests to the user-selected AI service.
- Optional host permissions: requested only when the user configures a custom API endpoint.

## Custom Endpoint Note

Custom endpoints must use HTTPS. HTTP is allowed only for local development endpoints such as `localhost` or `127.0.0.1`.

