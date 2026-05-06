# Deployment

## GitHub Pages

```bash
npm run build -- --base-href /angular-ai-copilot-starter/
```

Publish the Angular build output from `dist/angular-ai-copilot-starter/browser` using GitHub Pages or a deploy workflow.

## Vercel

```bash
vercel
vercel --prod
```

Build command: `npm run build`
Output directory: `dist/angular-ai-copilot-starter/browser`

## Netlify

Build command: `npm run build`
Publish directory: `dist/angular-ai-copilot-starter/browser`

## Safety

No API keys are required. Keep real provider calls behind backend APIs.
