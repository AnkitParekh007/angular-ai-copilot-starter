import { CopilotMessage } from '../models/copilot-message.model';
import { DEMO_RAG_SOURCES } from './demo-rag-sources';
import { DEMO_TOOL_CALLS } from './demo-tool-calls';

export const DEMO_MESSAGES: CopilotMessage[] = [
  {
    id: 'msg-1',
    sessionId: 'session-1',
    role: 'user',
    mode: 'plan',
    content: 'Review this customer onboarding workflow and suggest the next safe action.',
    state: 'completed',
    createdAt: '2026-05-06T09:05:00Z'
  },
  {
    id: 'msg-2',
    sessionId: 'session-1',
    role: 'assistant',
    mode: 'plan',
    content: 'I found two policy-backed next steps. The workflow can be prepared, but submitting it should require human approval.',
    state: 'awaiting_approval',
    createdAt: '2026-05-06T09:05:12Z',
    sources: DEMO_RAG_SOURCES,
    toolCalls: DEMO_TOOL_CALLS
  }
];
