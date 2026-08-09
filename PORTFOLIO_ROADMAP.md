# Portfolio Roadmap — Angular AI Copilot Starter

## Now — perfect the five-minute review

- keep startup one-command/simple and API-key-free
- make Ask, Plan, Execute and Debug visibly different
- keep mock-vs-real labels unavoidable
- ensure screenshots and live demo represent current behavior

## Next — failure and recovery showcase

- stalled/retryable stream
- RAG retrieval failure with no fabricated citations
- failed tool timeline item
- rejected approval
- recovery/retry that preserves understandable conversation context

## Next — frontend quality proof

- keyboard-complete approval interactions
- screen-reader status announcements for streaming/tool states
- responsive timeline/source-card behavior
- stronger component and state-transition test coverage

## Later — adapter demonstration

Add one documented example showing how the mock service boundary maps to a real backend contract without putting provider secrets into Angular.

## Quality gates

- the demo remains deterministic
- no API key required for reviewer path
- UI states map to explicit TypeScript contracts
- production claims remain separate from mock behavior
