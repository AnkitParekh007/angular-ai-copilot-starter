# Angular AI Copilot Starter — 2026.08 Public Proof Edition

This release packages `angular-ai-copilot-starter` as the **Run** layer of the public AI frontend architecture ecosystem.

## Positioning

**A recruiter-ready Angular reference UX for building copilots that show streaming, grounding, tools, approvals, failure, and recovery as explicit product states.**

## What is new in this edition

- verified GitHub Pages deployment from `master`;
- deterministic happy-path and resilience scenarios with no provider credentials;
- visible RAG source cards, tool timeline, approval state, rejected/non-executed outcomes, retry, and context-preserving recovery;
- an updated `demo-walkthrough.gif` showing happy path plus failure/recovery;
- reproducible Playwright public-proof capture after successful Pages deployments;
- public-proof reviewer paths for 30-second, 3-minute, and 15-minute evaluation;
- explicit mock-only / production-style boundaries throughout the README and status docs.

## Public proof

- Live demo: https://ankitparekh007.github.io/angular-ai-copilot-starter/
- Public proof: `docs/public-proof.md`
- Live deployment contract: `LIVE_DEMO_STATUS.md`
- Visual walkthrough: `docs/assets/screenshots/demo-walkthrough.gif`

## Suggested GitHub Release title

`2026.08 Public Proof Edition — Resilient Angular AI Copilot UX`

## Suggested release summary

`angular-ai-copilot-starter` now demonstrates both polished AI UX and truthful degraded-state behavior. The 2026.08 edition adds deterministic failure/recovery scenarios, visible approval and tool states, recruiter-ready public proof, refreshed resilience visuals, deployment smoke checks, and reproducible screenshot capture.

The demo remains credential-free and mock-only by design so reviewers can inspect the frontend architecture without hidden services.

## Best launch links

| Audience | Link |
| --- | --- |
| Recruiter | live demo + `docs/public-proof.md` |
| Angular engineer | repository README + architecture docs |
| AI UX reviewer | resilience showcase + GIF |
| Contributor | contribution docs and open issues |

## Verification before publishing a GitHub Release

Run `npm test` and the production Angular build, then verify the GitHub Pages deployment and post-deploy HTTP smoke check are green.

## Release boundary

This release proves deterministic Angular application behavior. It does not claim a production backend, provider execution, live RAG service, or real external tool mutation.

## Release date

2026-08-10
