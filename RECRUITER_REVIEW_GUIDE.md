# Recruiter Review Guide

## 30-Second Review

- View the README hero screenshot.
- Read the one-line pitch.
- Scan the Features section.
- Scan What This Proves.

## 2-Minute Technical Review

- Inspect `src/app/copilot/models/`.
- Inspect `src/app/copilot/services/`.
- Inspect `src/app/copilot/components/`.
- Inspect `src/app/app.component.ts` for the running demo flow.
- Inspect `WHAT_THIS_PROVES.md`.

## Best Files To Inspect

- `src/app/copilot/models/`
- `src/app/copilot/services/`
- `src/app/copilot/components/`
- `src/app/copilot/mocks/`
- `WHAT_THIS_PROVES.md`
- `README.md`

## Interview Questions

1. How would you connect this mock copilot to a real NestJS backend?
2. How would you stream real LLM responses into the UI?
3. How would you secure tool execution?
4. How would you represent RAG citations?
5. How would you add MCP tool integration?
6. How would you handle user approval before actions?
7. How would this scale inside an enterprise Angular app?

## What A Reviewer Should Notice

The project treats AI frontend work as a complete product workflow: context, messages, sources, tool state, approvals, execution status, and recovery paths.
