# Failure and Recovery Showcase

The live Angular demo now includes a second section dedicated to deterministic failure and recovery behavior. It is intentionally separate from the happy-path copilot workflow so reviewers can compare successful orchestration with degraded states without changing providers or credentials.

## Scenarios

### Stalled stream

- visible execution state becomes `failed`
- no citations or tool results are claimed
- retry is exposed as a native button
- the safe prior context snapshot remains visible
- retry transitions to the deterministic recovery scenario

### Retrieval failure

- retrieval visibly fails
- RAG source cards remain empty
- the UI explicitly says citations are unavailable
- tool planning/execution remains blocked
- the response does not invent evidence

### Failed tool call

- grounding succeeds
- approval is recorded as approved
- the tool timeline contains a `failed` item
- the global execution state remains failed
- recovery remains a separate, visible state

### Approval rejection

- grounded evidence remains visible
- the proposed action is marked `skipped`
- the execution trace is `blocked`
- the global execution state never becomes `completed`
- the response records that no action executed

### Recovery retry

- the exact safe prior context stays understandable
- grounding returns
- the recovery tool succeeds in mock mode
- the result is linked to the retained context and evidence

## Accessibility

The scenario selector and retry action use native `button` elements with at least 44px interactive targets. The active scenario exposes `aria-pressed`, visible focus is retained, and a polite `aria-live` region announces scenario changes and retry results.

Failure states always include text labels such as `failed`, `blocked`, and `recovering`; color is supplemental.

## Screenshot / GIF capture

Capture at least these two states for recruiter-facing documentation:

1. **Retrieval failure** — show zero source cards, the blocked trace, and the safe result text.
2. **Failed tool** — show grounded sources, the failed tool timeline item, and the recovery state.

Recommended short GIF sequence:

1. Scroll from the normal copilot demo into **Failure and recovery showcase**.
2. Select **Stalled stream**.
3. Trigger **Retry with prior context**.
4. Switch to **Retrieval failure** and show the empty citation state.
5. Switch to **Failed tool** and show the failed tool item.
6. Switch to **Rejected approval** and show that execution never becomes successful.

## Production boundary

The showcase is frontend-only and deterministic. A real backend remains authoritative for retrieval authorization, model/provider credentials, approval policy, tool permissions, idempotency, execution, and audit logs.
