import { ActionApproval } from '../models/action-approval.model';

export const DEMO_APPROVALS: ActionApproval[] = [
  {
    id: 'approval-1',
    toolType: 'run_workflow',
    title: 'Submit onboarding workflow',
    riskLevel: 'high',
    requestedByMessageId: 'msg-2',
    summary: 'Submit setup checklist and notify the approval owner for customer-42.',
    approved: null
  }
];
