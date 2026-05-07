# Contributing

Thanks for considering a contribution. This repo is a public Angular AI frontend proof project, so contributions should stay practical, readable, mock-only, and interview-safe.

## Setup

```bash
git clone https://github.com/AnkitParekh007/angular-ai-copilot-starter.git
cd angular-ai-copilot-starter
npm install
npm start
```

Build before opening a PR:

```bash
npm run build
```

## Branch Naming

Use short, descriptive branch names:

- `docs/add-rag-diagram`
- `feat/add-approval-state`
- `test/add-streaming-service-spec`
- `a11y/improve-keyboard-navigation`

## Commit Style

Use clear conventional prefixes:

- `docs: improve screenshot guide`
- `feat: add mock tool state`
- `test: cover streaming service`
- `fix: correct README command`

## PR Process

1. Pick one focused change.
2. Keep mock data fictional.
3. Update README/docs if behavior changes.
4. Include a screenshot or GIF for UI changes when possible.
5. Document build/test results in the PR.

## UI Contribution Rules

- Keep the three-panel copilot layout readable.
- Preserve visible state for streaming, retrieving context, planning, approval, tool execution, failure, and recovery.
- Prefer reusable TypeScript models over loose objects.
- Do not add heavy UI dependencies without a clear reason.

## Accessibility Expectations

- Use semantic controls for buttons, forms, and navigation.
- Add labels for inputs and icon-only actions.
- Preserve keyboard navigation.
- Keep color contrast readable in light and dark themes.

## Docs Contribution Rules

- Make the architecture understandable in under 30 seconds.
- Be explicit about what is mocked vs real.
- Do not add fake production claims, fake metrics, user counts, or testimonials.

## No Secrets Rule

Do not commit API keys, provider tokens, `.env` files, credentials, private company code, customer data, or live LLM/provider integrations.
