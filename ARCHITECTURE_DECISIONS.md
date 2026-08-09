# Architecture Decisions — Angular AI Copilot Starter

## ADR-001 — Keep the starter deterministic and API-key-free

**Context:** the project is primarily a frontend architecture proof and should be reviewable without external accounts.

**Decision:** use deterministic mock adapters for streaming, retrieval, tools and approvals while preserving production-shaped TypeScript boundaries.

**Tradeoff:** the repo does not prove a live provider backend; it provides a stable, honest UI architecture demonstration.

## ADR-002 — Represent AI behavior as explicit states

**Context:** AI UX contains more intermediate work than ordinary request/response UI.

**Decision:** model thinking, retrieving, planning, approval, execution, completion, failure and recovery explicitly.

**Tradeoff:** more state to manage, with much better rendering, testing and operator clarity.

## ADR-003 — Separate citations and tools from assistant text

**Context:** source evidence and executed actions should not be indistinguishable from generated prose.

**Decision:** render RAG evidence and tool timeline items as structured components with their own state.

**Tradeoff:** component structure is richer, while trust and inspectability improve.

## ADR-004 — Keep production secrets out of Angular

**Context:** a future real backend integration must not put provider credentials into browser bundles.

**Decision:** the starter documents a backend/gateway adapter boundary for any production provider, retrieval or protected tool integration.

**Tradeoff:** production use requires a backend service.
