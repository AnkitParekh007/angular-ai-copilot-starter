import { ToolCall } from '../models/tool-call.model';

export const DEMO_TOOL_CALLS: ToolCall[] = [
  { id: 'tool-1', type: 'inspect_route', label: 'Inspect current route', status: 'succeeded', inputSummary: '/customers/42/onboarding', outputSummary: 'Route context captured.', requiresApproval: false },
  { id: 'tool-2', type: 'search_docs', label: 'Search onboarding policy', status: 'succeeded', inputSummary: 'approval requirements', outputSummary: 'Found two relevant policy sources.', requiresApproval: false },
  { id: 'tool-3', type: 'run_workflow', label: 'Run onboarding workflow', status: 'awaiting_approval', inputSummary: 'Submit setup checklist for customer 42.', requiresApproval: true }
];
