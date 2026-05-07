# Validation Results

Validation date: 2026-05-07

## Environment

- Angular CLI: 20.3.13
- Node: 24.14.0
- npm: 11.9.0

## Commands Run

```bash
npm install --package-lock-only
npm run
npm run build
npm start -- --host 127.0.0.1 --port 4307
```

## Results

| Check | Result | Notes |
| --- | --- | --- |
| Dependency lock check | Passed | `npm install --package-lock-only` completed with 0 vulnerabilities. |
| Available scripts check | Passed | `start` and `build` are configured. |
| Build | Passed | `npm run build` completed successfully. |
| Local run smoke test | Passed | Angular dev server started on `http://127.0.0.1:4307/` and served the app. The temporary server was stopped after validation. |
| Test | Not configured | No Angular test target or npm test script is configured. No passing test result is claimed. |
| Lint | Not configured | No Angular lint target or npm lint script is configured. No passing lint result is claimed. |

## Build Output

Angular generated the application bundle in:

```text
dist/angular-ai-copilot-starter
```

## Notes

This project is mock-only. No API keys, backend services, or paid LLM providers are required to run the demo.
