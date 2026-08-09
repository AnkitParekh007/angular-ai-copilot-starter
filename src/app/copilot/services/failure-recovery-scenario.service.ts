import { Injectable } from '@angular/core';
import { DEMO_RAG_SOURCES } from '../mocks/demo-rag-sources';
import { DEMO_TOOL_CALLS } from '../mocks/demo-tool-calls';
import {
  FailureRecoveryScenario,
  FailureRecoveryScenarioId,
  FailureTraceItem,
} from '../models/failure-recovery-scenario.model';
import { ToolCall } from '../models/tool-call.model';

const PREVIOUS_CONTEXT = [
  'route=/customers/acme-42/onboarding',
  'record=customer:acme-42',
  'role=operations-lead',
  'visibleFields=status,owner,nextReviewDate,blockingTasks',
];

function trace(
  id: string,
  label: string,
  status: FailureTraceItem['status'],
  detail: string,
): FailureTraceItem {
  return { id, label, status, detail };
}

function toolWithStatus(status: ToolCall['status'], outputSummary: string): ToolCall {
  const source = DEMO_TOOL_CALLS.find(tool => tool.requiresApproval) ?? DEMO_TOOL_CALLS[0];
  return {
    ...source,
    id: `failure-${source.id}`,
    status,
    outputSummary,
  };
}

export function buildFailureRecoveryScenario(
  id: FailureRecoveryScenarioId,
): FailureRecoveryScenario {
  switch (id) {
    case 'stalled-stream':
      return {
        id,
        label: 'Stalled stream',
        summary: 'The assistant stream stops before retrieval completes and becomes explicitly retryable.',
        executionState: 'failed',
        previousContext: PREVIOUS_CONTEXT,
        response: 'The response stream stalled. No completion, citation, or tool result is claimed.',
        sources: [],
        tools: [],
        trace: [
          trace('context', 'Serialize page context', 'completed', 'The same safe context snapshot is retained for retry.'),
          trace('stream', 'Stream assistant response', 'failed', 'The deterministic stream fixture stalls before a grounded answer is complete.'),
          trace('retry', 'Expose retry state', 'recovering', 'Retry remains available without discarding prior context.'),
        ],
        retryable: true,
        recovered: false,
        approvalDecision: null,
      };

    case 'retrieval-failure':
      return {
        id,
        label: 'Retrieval failure',
        summary: 'Retrieval fails, so the UI suppresses citations and blocks downstream tool planning.',
        executionState: 'failed',
        previousContext: PREVIOUS_CONTEXT,
        response: 'I could not retrieve trusted evidence, so I will not fabricate citations or recommend execution.',
        sources: [],
        tools: [],
        trace: [
          trace('context', 'Serialize page context', 'completed', 'Visible context is available for review.'),
          trace('retrieval', 'Retrieve grounded sources', 'failed', 'The deterministic retrieval fixture returns an error.'),
          trace('citations', 'Render source cards', 'blocked', 'No source cards render without trusted evidence.'),
          trace('tools', 'Plan tool execution', 'blocked', 'Tool planning is blocked when grounding failed.'),
          trace('result', 'Return safe result', 'completed', 'The response explains the missing evidence instead of inventing a result.'),
        ],
        retryable: true,
        recovered: false,
        approvalDecision: null,
      };

    case 'tool-failure':
      return {
        id,
        label: 'Failed tool call',
        summary: 'Grounding and approval succeed, but the tool fails and remains visible in the execution timeline.',
        executionState: 'failed',
        previousContext: PREVIOUS_CONTEXT,
        response: 'The approved mock tool failed safely. The failure is visible and no successful mutation is claimed.',
        sources: DEMO_RAG_SOURCES.slice(0, 2),
        tools: [toolWithStatus('failed', 'Deterministic tool fixture failed after approval. No mutation was committed.')],
        trace: [
          trace('retrieval', 'Retrieve grounded sources', 'completed', 'Trusted evidence is available.'),
          trace('approval', 'Approve tool proposal', 'completed', 'The operator explicitly approved the mock action.'),
          trace('tool', 'Execute approved tool', 'failed', 'The deterministic tool fixture fails and records the error.'),
          trace('recovery', 'Prepare recovery path', 'recovering', 'The prior context and failure evidence remain available for retry.'),
        ],
        retryable: true,
        recovered: false,
        approvalDecision: 'approved',
      };

    case 'approval-rejection':
      return {
        id,
        label: 'Approval rejected',
        summary: 'The operator rejects the proposed action and the UI never transitions to successful execution.',
        executionState: 'recovering',
        previousContext: PREVIOUS_CONTEXT,
        response: 'The proposed action was rejected. No tool executed and the evidence remains available for review.',
        sources: DEMO_RAG_SOURCES.slice(0, 2),
        tools: [toolWithStatus('skipped', 'Action rejected by the operator. Execution did not start.')],
        trace: [
          trace('retrieval', 'Retrieve grounded sources', 'completed', 'Evidence is available before the decision.'),
          trace('plan', 'Plan risky action', 'completed', 'The UI shows the typed tool proposal.'),
          trace('approval', 'Request approval', 'completed', 'The operator rejected the action.'),
          trace('tool', 'Execute tool', 'blocked', 'Execution is blocked after rejection.'),
          trace('result', 'Record decision', 'completed', 'The result states that no action was executed.'),
        ],
        retryable: false,
        recovered: false,
        approvalDecision: 'rejected',
      };

    case 'recovery-retry':
      return {
        id,
        label: 'Recovery retry',
        summary: 'A retry keeps the prior visible context understandable and reaches a successful deterministic result.',
        executionState: 'completed',
        previousContext: PREVIOUS_CONTEXT,
        response: 'Retry completed in mock mode using the same visible context. Grounded evidence and execution outcome are preserved.',
        sources: DEMO_RAG_SOURCES.slice(0, 2),
        tools: [toolWithStatus('succeeded', 'Deterministic recovery retry completed successfully.')],
        trace: [
          trace('context', 'Restore prior context', 'completed', 'The exact safe context snapshot from the failed attempt is retained.'),
          trace('stream', 'Restart response stream', 'completed', 'The retry starts from a clean deterministic boundary.'),
          trace('retrieval', 'Retrieve grounded sources', 'completed', 'Trusted evidence is restored.'),
          trace('tool', 'Execute recovery tool', 'completed', 'The deterministic retry completes after the existing approval boundary.'),
          trace('result', 'Return recovered result', 'completed', 'The final result stays linked to prior context and evidence.'),
        ],
        retryable: false,
        recovered: true,
        approvalDecision: 'approved',
      };
  }
}

export function retryFailureRecoveryScenario(
  scenario: FailureRecoveryScenario,
): FailureRecoveryScenario {
  if (!scenario.retryable) {
    return scenario;
  }

  return buildFailureRecoveryScenario('recovery-retry');
}

@Injectable({ providedIn: 'root' })
export class FailureRecoveryScenarioService {
  build(id: FailureRecoveryScenarioId): FailureRecoveryScenario {
    return buildFailureRecoveryScenario(id);
  }

  retry(scenario: FailureRecoveryScenario): FailureRecoveryScenario {
    return retryFailureRecoveryScenario(scenario);
  }
}
