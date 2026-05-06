export type ToolCallType = 'search_docs' | 'inspect_route' | 'get_selected_record' | 'run_workflow' | 'navigate' | 'fill_form' | 'submit_action';
export type ToolCallStatus = 'queued' | 'running' | 'awaiting_approval' | 'succeeded' | 'failed' | 'skipped';

export interface ToolCall {
  id: string;
  type: ToolCallType;
  label: string;
  status: ToolCallStatus;
  inputSummary: string;
  outputSummary?: string;
  requiresApproval: boolean;
  startedAt?: string;
  completedAt?: string;
}
