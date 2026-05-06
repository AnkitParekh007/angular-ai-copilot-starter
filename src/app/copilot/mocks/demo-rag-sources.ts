import { RagSource } from '../models/rag-source.model';

export const DEMO_RAG_SOURCES: RagSource[] = [
  { id: 'source-1', title: 'Onboarding workflow policy', sourceType: 'policy', snippet: 'Approvals are required before submitting workflow-changing actions.', confidence: 0.91 },
  { id: 'source-2', title: 'Selected customer record', sourceType: 'record', snippet: 'Customer status is pending review with two incomplete setup tasks.', confidence: 0.86 }
];
