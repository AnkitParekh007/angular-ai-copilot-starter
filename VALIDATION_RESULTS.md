# Validation Results

Validation date: 2026-05-07

## Environment

- Angular CLI: 20.3.13
- Node: 24.14.0
- npm: 11.9.0

## Commands Run

```bash
npm install
npm run build
npm start -- --host 127.0.0.1 --port 4310
chrome --headless=new --window-size=1600,900 --screenshot=docs/assets/screenshots/copilot-shell-light.png http://127.0.0.1:4310/
chrome --headless=new --window-size=390,844 --screenshot=docs/assets/screenshots/responsive-mobile.png http://127.0.0.1:4310/
```

## Results

| Check | Result | Notes |
| --- | --- | --- |
| Dependency install | Passed | `npm install` completed with 0 vulnerabilities. |
| Build | Passed | `npm run build` completed successfully. |
| Local screenshot smoke test | Passed | Angular dev server started on `http://127.0.0.1:4310/`; headless Chrome captured desktop and mobile screenshots; the temporary server was stopped. |
| Test | Not configured | No Angular test target or npm test script is configured. No passing test result is claimed. |
| Lint | Not configured | No Angular lint target or npm lint script is configured. No passing lint result is claimed. |

## Build Output

Angular generated the application bundle in:

```text
dist/angular-ai-copilot-starter
```

## Notes

This project is mock-only. No API keys, backend services, or paid LLM providers are required to run the demo.
