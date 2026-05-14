# Deployment

## GitHub Pages

Use the included workflow:

- `.github/workflows/deploy-pages.yml`

Build command:

```bash
npm run build -- --configuration production --base-href /angular-ai-copilot-starter/
```

Publish path:

```text
dist/angular-ai-copilot-starter/browser
```

## Vercel

Build command: `npm run build`

Output directory:

```text
dist/angular-ai-copilot-starter/browser
```

## Netlify

Build command: `npm run build`

Publish directory:

```text
dist/angular-ai-copilot-starter/browser
```

## Safety

No API keys are required. Keep real provider calls behind backend APIs.
