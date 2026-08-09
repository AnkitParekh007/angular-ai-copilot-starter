import { ExecutionState } from './execution-state.model';
import { RagSource } from './rag-source.model';
import { ToolCall } from './tool-call.model';

export type FailureRecoveryScenarioId =
  | 'stalled-stream'
  | 'retrieval-failure'
  | 'tool-failure'
  | 'approval-rejection'
  | 'recovery-retry';

export type FailureTraceStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'blocked'
  | 'recovering';

export interface FailureTraceItem {
  id: string;
  label: string;
  status: FailureTraceStatus;
  detail: string;
}

export interface FailureRecoveryScenario {
  id: FailureRecoveryScenarioId;
  label: string;
  summary: string;
  executionState: ExecutionState;
  previousContext: string[];
  response: string;
  sources: RagSource[];
  tools: ToolCall[];
  trace: FailureTraceItem[];
  retryable: boolean;
  recovered: boolean;
  approvalDecision: 'approved' | 'rejected' | null;
}
