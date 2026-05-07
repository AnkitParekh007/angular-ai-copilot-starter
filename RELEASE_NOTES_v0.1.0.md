# v0.1.0 - Initial Angular AI Copilot Starter

## What Is Included

- Angular mock copilot workspace structure.
- Three-panel copilot layout concept with session, conversation, and context/tool areas.
- Simulated streaming UX for AI responses.
- RAG source card pattern.
- MCP/tool-call timeline pattern.
- Human approval card pattern.
- Agent modes: ask, plan, execute, and debug.
- Enterprise-safe documentation around mocked services, tool execution, and approvals.

## What Is Mocked

- LLM responses.
- RAG retrieval.
- MCP/tool execution.
- Approval flow state.
- Demo sessions and conversation data.

## What Is Real

- Angular project structure.
- TypeScript models.
- Component architecture.
- Mock service boundaries.
- Recruiter-facing documentation.
- Contributor-facing documentation.
- Buildable Angular demo foundation.

## What Recruiters Should Review

- `README.md`
- `WHAT_THIS_PROVES.md`
- `RECRUITER_REVIEW_GUIDE.md`
- `src/app`
- `docs/assets/screenshots/README.md`

## What Contributors Can Help With

- Real screenshots and GIF walkthroughs.
- Accessibility improvements.
- More mock MCP tools.
- Unit tests for services and models.
- Responsive layout polish.
- Storybook or component previews.

## Next Roadmap Items

- Capture real screenshots.
- Deploy the demo to GitHub Pages.
- Add test coverage.
- Add a Storybook or component preview workflow.
- Add Angular Material or PrimeNG variants.

## Prepared Release Command

Do not run this until the local changes are reviewed and pushed:

```bash
gh release create v0.1.0 --title "v0.1.0 - Initial Angular AI Copilot Starter" --notes-file RELEASE_NOTES_v0.1.0.md
```

