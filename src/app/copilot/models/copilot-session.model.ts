import { AgentMode } from './agent-mode.model';

export interface CopilotSession {
  id: string;
  title: string;
  mode: AgentMode;
  updatedAt: string;
  messageCount: number;
}
