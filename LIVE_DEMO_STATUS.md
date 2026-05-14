# Live Demo Status

## Current status

- Deployed: not claimed yet
- Workflow present: yes
- Target URL: `https://ankitparekh007.github.io/angular-ai-copilot-starter/`
- Recommended deployment target: GitHub Pages

## Verified locally

- `npm install`: expected validation command
- `npm run build`: expected validation command
- API keys required: no
- Backend required: no

## Deployment path

```bash
npm install
npm run build -- --configuration production --base-href /angular-ai-copilot-starter/
```

Then:

1. enable GitHub Pages with **GitHub Actions**
2. push to `main` or run the deployment workflow manually
3. verify the deployed app
4. only then replace the deploy-path language in the README with the real live URL
