import { AgentMode } from './agent-mode.model';
import { RagSource } from './rag-source.model';
import { ToolCall } from './tool-call.model';

export type CopilotRole = 'user' | 'assistant' | 'system';
export type ExecutionState = 'idle' | 'thinking' | 'retrieving_context' | 'planning' | 'awaiting_approval' | 'executing_tool' | 'completed' | 'failed' | 'recovering';

export interface CopilotMessage {
  id: string;
  sessionId: string;
  role: CopilotRole;
  mode: AgentMode;
  content: string;
  state: ExecutionState;
  createdAt: string;
  sources?: RagSource[];
  toolCalls?: ToolCall[];
}
