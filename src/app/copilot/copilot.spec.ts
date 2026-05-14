import { strict as assert } from 'node:assert';
import test from 'node:test';
import { toArray } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { AGENT_MODES } from './models/agent-mode.model';
import { DEMO_APPROVALS } from './mocks/demo-approvals';
import { DEMO_MESSAGES } from './mocks/demo-messages';
import { DEMO_RAG_SOURCES } from './mocks/demo-rag-sources';
import { formatConfidenceLabel, getActiveModeLabel, getApprovalTone, summarizeMessageThread } from './testing/component-contracts';
import { StreamingMessageService, tokenizeText } from './services/streaming-message.service';

test('mode selector exposes the active mode label', () => {
  assert.equal(getActiveModeLabel(AGENT_MODES, 'plan'), 'Plan');
  assert.equal(getActiveModeLabel(AGENT_MODES, 'execute'), 'Execute');
});

test('message thread summary counts total and assistant messages', () => {
  const summary = summarizeMessageThread(DEMO_MESSAGES);
  assert.equal(summary.total, 2);
  assert.equal(summary.assistantCount, 1);
  assert.equal(summary.lastState, 'awaiting_approval');
});

test('rag source card formats confidence labels for recruiter-readable UI', () => {
  assert.equal(formatConfidenceLabel(DEMO_RAG_SOURCES[0].confidence), '91% confidence');
});

test('approval card maps risk levels to UI tones', () => {
  assert.equal(getApprovalTone(DEMO_APPROVALS[0].riskLevel), 'danger');
  assert.equal(getApprovalTone('medium'), 'warning');
  assert.equal(getApprovalTone('low'), 'neutral');
});

test('mock streaming service tokenizes and streams text in order', async () => {
  const service = new StreamingMessageService();
  assert.deepEqual(tokenizeText('hello world'), ['hello ', 'world ']);

  const result = await lastValueFrom(service.streamText('hello world').pipe(toArray()));
  assert.deepEqual(result, ['hello ', 'world ']);
});
