# Live Demo Status

## Current status

- Public URL: `https://ankitparekh007.github.io/angular-ai-copilot-starter/`
- Deployment workflow present: yes
- Deployment source branch: `master`
- Deployment source: GitHub Actions
- API keys required: no
- Backend required: no
- Post-deploy HTTP smoke check: yes

A deployment is considered verified when the **Deploy GitHub Pages** workflow succeeds, including the final HTTP smoke check against the published Pages URL. This keeps the README's live-demo claim tied to an observable deployment signal rather than a manual assumption.

## Build and deployment path

The Pages workflow runs the same deterministic tests used by CI before publishing:

```bash
npm ci
npm test
npm run build -- --configuration production --base-href /angular-ai-copilot-starter/
```

It then uploads `dist/angular-ai-copilot-starter/browser`, deploys it to the `github-pages` environment, and performs a retrying HTTP request against the resulting Pages URL.

## Maintainer verification

After a merge to `master`:

1. open **Actions → Deploy GitHub Pages**;
2. confirm the build job passed;
3. confirm the deploy job passed;
4. confirm **Smoke test published demo** passed;
5. open the public URL and exercise the deterministic happy-path and failure/recovery flows;
6. refresh the recruiter GIF/screenshots whenever the visible UX changes materially.

## Public-proof boundary

The deployed application is intentionally mock-only but production-style:

- no model/provider API key is required;
- no production backend is claimed;
- RAG, MCP/tool execution, approvals, and failures are deterministic demo behavior;
- the Angular component/state architecture, accessibility behavior, and recovery UX are real implementation proof.

For the reviewer sequence, see [`docs/public-proof.md`](docs/public-proof.md).
