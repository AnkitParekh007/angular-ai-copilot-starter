# Architecture

The copilot is modeled as a visible workflow layer inside Angular, not a standalone chatbot. The shell coordinates sessions, message streaming, RAG evidence, tool calls, and approvals through typed services.

## Design Principles

- Keep model/provider calls behind backend contracts.
- Show users what context was retrieved.
- Show tool execution as an inspectable timeline.
- Require approval for workflow-changing actions.
- Model agent state explicitly so loading, failure, recovery, and completion are visible.

## Runtime Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as CopilotShell
    participant S as CopilotService
    participant R as MockRagService
    participant T as MockToolRegistry
    participant M as StreamingMessageService

    U->>C: Submit prompt
    C->>S: sendMessage(prompt, mode)
    S->>R: retrieveSources(prompt)
    R-->>S: sources
    S->>T: planToolCalls(mode, context)
    T-->>S: tool timeline
    S->>M: streamResponse(tokens)
    M-->>C: token chunks
    C-->>U: response, sources, tools, approvals
```
