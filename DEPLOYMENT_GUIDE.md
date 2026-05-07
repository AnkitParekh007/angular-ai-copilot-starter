# Deployment Guide

This demo uses mock data only and does not require API keys, backend services, or paid LLM providers.

## GitHub Pages

For GitHub Pages, Angular needs the correct base href.

```bash
npm run build -- --base-href /angular-ai-copilot-starter/
```

Manual settings:

1. Open repository Settings.
2. Go to Pages.
3. Select the deployment branch or GitHub Actions workflow.
4. Publish the Angular build output.
5. Add the live URL to `README.md` and GitHub About.

If you add a deploy package later, keep it explicit and verify it before committing.

## Vercel

1. Import the GitHub repo into Vercel.
2. Framework preset: Angular.
3. Build command: `npm run build`.
4. Output directory: `dist/angular-ai-copilot-starter/browser` if Vercel asks for a static output path.
5. Add the generated URL to `README.md`.

## Netlify

1. Import the GitHub repo into Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist/angular-ai-copilot-starter/browser`.
4. Add the generated URL to `README.md`.

## Deployment Rule

Do not add secrets, API keys, `.env` files, real provider calls, or private backend URLs.
