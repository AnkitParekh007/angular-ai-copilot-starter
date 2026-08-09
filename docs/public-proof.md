# Public Proof Review Path

`angular-ai-copilot-starter` is the fastest visual proof in this portfolio: a polished Angular 20 copilot UI that demonstrates both happy-path AI interaction and resilient failure/recovery behavior without pretending that mock services are production integrations.

## 30-second review

![Angular AI Copilot happy path, failure, and recovery walkthrough](assets/screenshots/demo-walkthrough.gif)

The animation is generated from the exact Angular branch build at a 1440×900 recruiter viewport. It pairs the primary deterministic flow with explicit failure and recovery states without implying a production backend.

1. Open the [live demo](https://ankitparekh007.github.io/angular-ai-copilot-starter/).
2. Scan the three-panel copilot shell and switch between Ask, Plan, Execute, and Debug.
3. Run the deterministic demo flow and look for visible streaming, RAG sources, the tool timeline, and the approval gate.
4. Continue into the resilience showcase and inspect a failure state instead of stopping at the happy path.

The key question is simple: **does the UI tell the truth about what the AI system is doing?**

## 3-minute review

Exercise these states:

| State | What a reviewer should see |
| --- | --- |
| Streaming | partial output is visibly in-progress instead of looking complete |
| Retrieval | source cards are shown only when evidence exists |
| Tool planning | proposed work is visible before execution |
| Approval | risky action pauses for a human decision |
| Rejection | rejected work never becomes a successful execution state |
| Tool failure | failed tool remains failed in the timeline |
| Stalled stream | retry is explicit and safe prior context remains understandable |
| Recovery | UI distinguishes retry/recovery from a fresh successful run |

No API key is required. The demo is intentionally deterministic.

## 15-minute code review

Inspect:

- `src/app/copilot/models/` — typed UI contracts
- `src/app/copilot/services/` — deterministic mock orchestration and streaming behavior
- `src/app/copilot/components/` — reusable copilot surfaces
- the resilience/failure scenario implementation under `src/app/`
- the transition tests that verify failure and recovery states
- [Architecture](architecture.md)
- [Demo script](demo-script.md)
- [Recruiter notes](recruiter-notes.md)

Then run:

```bash
npm install
npm test
npm run build
npm start
```

## Screenshot/GIF sequence

A strong public proof asset should capture one coherent workflow:

1. Ask mode and visible page context;
2. streaming response;
3. RAG citations;
4. tool proposal/timeline;
5. approval pause;
6. reject or trigger a deterministic failure;
7. retry/recovery;
8. final state that remains truthful about what did or did not execute.

Keep the mock-only label visible. The goal is to prove frontend architecture, not to imply a live LLM or production tool backend.

## What this proves to different reviewers

### Frontend architect

- standalone Angular composition
- strict TypeScript state contracts
- responsive and theme-aware UI
- explicit state transitions instead of boolean-heavy chat UI
- accessibility-aware interaction surfaces

### AI application architect

- grounding is visible
- tool execution is inspectable
- approval is a first-class state
- failure/retry is modeled explicitly
- frontend does not own production policy enforcement

### Recruiter or hiring manager

- the project can be understood without reading every file
- the live demo has a clear review script
- mock vs real boundaries are documented instead of hidden

## Ecosystem path

This repository is the **runnable frontend implementation** layer:

[AI Tools Cheatsheets](https://github.com/AnkitParekh007/ai-tools-cheatsheets) → [Frontend AI Patterns](https://github.com/AnkitParekh007/frontend-ai-patterns) → **Angular AI Copilot Starter** → [ngx-copilot-platform](https://github.com/AnkitParekh007/ngx-copilot-platform) → [Agent Studio](https://github.com/AnkitParekh007/agent-studio) → [Org AI Force](https://github.com/AnkitParekh007/org-ai-force)

**Learn → Pattern → Run → Platform → Govern → Operate**
