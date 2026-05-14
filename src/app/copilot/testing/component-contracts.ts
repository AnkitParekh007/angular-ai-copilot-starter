import { AgentMode, AgentModeOption } from '../models/agent-mode.model';
import { ActionApproval } from '../models/action-approval.model';
import { CopilotMessage } from '../models/copilot-message.model';

export function getActiveModeLabel(modes: AgentModeOption[], activeMode: AgentMode): string {
  return modes.find((mode) => mode.id === activeMode)?.label ?? 'Unknown';
}

export function summarizeMessageThread(messages: CopilotMessage[]): { total: number; assistantCount: number; lastState: string } {
  const assistantMessages = messages.filter((message) => message.role === 'assistant');
  return {
    total: messages.length,
    assistantCount: assistantMessages.length,
    lastState: messages.at(-1)?.state ?? 'idle',
  };
}

export function formatConfidenceLabel(confidence: number): string {
  return `${Math.round(confidence * 100)}% confidence`;
}

export function getApprovalTone(risk: ActionApproval['riskLevel']): 'neutral' | 'warning' | 'danger' {
  if (risk === 'high') return 'danger';
  if (risk === 'medium') return 'warning';
  return 'neutral';
}
