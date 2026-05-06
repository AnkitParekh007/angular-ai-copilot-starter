export type AgentMode = 'ask' | 'plan' | 'execute' | 'debug';

export interface AgentModeOption {
  id: AgentMode;
  label: string;
  description: string;
}

export const AGENT_MODES: AgentModeOption[] = [
  { id: 'ask', label: 'Ask', description: 'Answer questions using available context.' },
  { id: 'plan', label: 'Plan', description: 'Break a task into reviewable steps.' },
  { id: 'execute', label: 'Execute', description: 'Prepare tool-backed actions that require approval.' },
  { id: 'debug', label: 'Debug', description: 'Inspect failures, recovery steps, and state transitions.' }
];
