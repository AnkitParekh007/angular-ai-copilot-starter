import { CopilotContext } from '../models/copilot-context.model';

export const DEMO_CONTEXT: CopilotContext = {
  route: '/customers/42/onboarding',
  pageTitle: 'Customer Onboarding Workspace',
  selectedRecordId: 'customer-42',
  selectedRecordType: 'Customer',
  userRole: 'Operations Manager',
  visibleFields: ['status', 'riskScore', 'approvalOwner', 'pendingTasks'],
  tenant: 'northwind-enterprise'
};
