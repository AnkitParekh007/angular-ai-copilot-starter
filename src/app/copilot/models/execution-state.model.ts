export type ExecutionState =
  | 'idle'
  | 'thinking'
  | 'retrieving_context'
  | 'planning'
  | 'awaiting_approval'
  | 'executing_tool'
  | 'completed'
  | 'failed'
  | 'recovering';

export interface ExecutionStateView {
  state: ExecutionState;
  label: string;
  tone: 'neutral' | 'info' | 'warning' | 'success' | 'danger';
}
