import { CopilotSession } from '../models/copilot-session.model';

export const DEMO_SESSIONS: CopilotSession[] = [
  { id: 'session-1', title: 'Customer onboarding plan', mode: 'plan', updatedAt: '2026-05-06T09:00:00Z', messageCount: 6 },
  { id: 'session-2', title: 'Investigate failed workflow', mode: 'debug', updatedAt: '2026-05-06T10:15:00Z', messageCount: 4 }
];
