# Deployment Guide

This demo uses mock data only and does not require API keys, backend services, or paid LLM providers.

## GitHub Pages

This repository now includes a deployment workflow:

- `.github/workflows/deploy-pages.yml`

Build command used by the workflow:

```bash
npm run build -- --configuration production --base-href /angular-ai-copilot-starter/
```

Published artifact path:

```text
dist/angular-ai-copilot-starter/browser
```

Manual setup:

1. Open repository Settings.
2. Go to Pages.
3. Select **GitHub Actions** as the source.
4. Push to `main` or trigger the workflow manually.
5. Verify the deployed app.
6. Update the repo About website field when the URL is live.

Target URL:

```text
https://ankitparekh007.github.io/angular-ai-copilot-starter/
```

## Vercel

1. Import the GitHub repo into Vercel.
2. Framework preset: Angular.
3. Build command: `npm run build`
4. Output directory: `dist/angular-ai-copilot-starter/browser`

## Netlify

1. Import the GitHub repo into Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist/angular-ai-copilot-starter/browser`

## Deployment rule

Do not add secrets, API keys, `.env` files, real provider calls, or private backend URLs.
