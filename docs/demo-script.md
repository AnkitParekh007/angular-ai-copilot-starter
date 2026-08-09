# Demo Script

## Happy path

1. Open the copilot shell.
2. Select Ask mode and ask: "Summarize the selected customer record."
3. Show the streaming response area.
4. Switch to Plan mode and ask for a workflow plan.
5. Show RAG sources and tool call timeline.
6. Switch to Execute mode and trigger a mock workflow.
7. Show the approval card before execution.
8. Approve the action and show completed timeline state.

## Failure and recovery path

9. Scroll to **Failure and recovery showcase**.
10. Select **Stalled stream** and point out that no completion, citation, or tool result is claimed.
11. Choose **Retry with prior context** and show that the same safe context snapshot remains visible.
12. Select **Retrieval failure** and show zero RAG source cards plus blocked tool planning.
13. Select **Failed tool** and show the failed item in the tool timeline plus the recovery state.
14. Select **Rejected approval** and show that the tool is skipped/blocked and the global state never becomes completed.
15. Select **Recovery retry** and show the retained context, restored evidence, and deterministic successful result.

## Reviewer talking points

- Success and failure states use the same visible state vocabulary.
- Retrieval failure never fabricates citations.
- Approval rejection never produces an execution-success state.
- Failed tools remain visible rather than being replaced by a generic assistant message.
- Recovery keeps prior context understandable instead of silently rebuilding hidden browser state.
- All behavior is deterministic and requires no provider/API key.

See [failure-recovery-showcase.md](failure-recovery-showcase.md) for scenario, accessibility, screenshot, and production-boundary details.
