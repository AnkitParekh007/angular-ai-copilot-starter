import { ToolCallType } from './tool-call.model';

export interface ActionApproval {
  id: string;
  toolType: ToolCallType;
  title: string;
  riskLevel: 'low' | 'medium' | 'high';
  requestedByMessageId: string;
  summary: string;
  approved: boolean | null;
}
