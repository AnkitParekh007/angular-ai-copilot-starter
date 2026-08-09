import { strict as assert } from 'node:assert';
import test from 'node:test';
import {
  buildFailureRecoveryScenario,
  retryFailureRecoveryScenario,
} from './services/failure-recovery-scenario.service';

test('stalled stream is failed, retryable, and retains prior context', () => {
  const scenario = buildFailureRecoveryScenario('stalled-stream');

  assert.equal(scenario.executionState, 'failed');
  assert.equal(scenario.retryable, true);
  assert.equal(scenario.sources.length, 0);
  assert.equal(scenario.tools.length, 0);
  assert.equal(scenario.trace.some(item => item.status === 'recovering'), true);
});

test('retrieval failure never fabricates citations or tool execution', () => {
  const scenario = buildFailureRecoveryScenario('retrieval-failure');

  assert.equal(scenario.sources.length, 0);
  assert.equal(scenario.tools.length, 0);
  assert.equal(scenario.trace.find(item => item.id === 'citations')?.status, 'blocked');
  assert.equal(scenario.trace.find(item => item.id === 'tools')?.status, 'blocked');
  assert.match(scenario.response, /will not fabricate citations/i);
});

test('failed tool is visible as a failed timeline item', () => {
  const scenario = buildFailureRecoveryScenario('tool-failure');

  assert.equal(scenario.tools.length, 1);
  assert.equal(scenario.tools[0]?.status, 'failed');
  assert.equal(scenario.executionState, 'failed');
  assert.equal(scenario.trace.find(item => item.id === 'tool')?.status, 'failed');
  assert.equal(scenario.trace.find(item => item.id === 'recovery')?.status, 'recovering');
});

test('approval rejection never transitions to execution success', () => {
  const scenario = buildFailureRecoveryScenario('approval-rejection');

  assert.equal(scenario.approvalDecision, 'rejected');
  assert.equal(scenario.tools[0]?.status, 'skipped');
  assert.notEqual(scenario.executionState, 'completed');
  assert.equal(scenario.trace.find(item => item.id === 'tool')?.status, 'blocked');
  assert.match(scenario.response, /No tool executed/i);
});

test('recovery retry keeps understandable prior context', () => {
  const failed = buildFailureRecoveryScenario('stalled-stream');
  const recovered = retryFailureRecoveryScenario(failed);

  assert.equal(recovered.recovered, true);
  assert.equal(recovered.executionState, 'completed');
  assert.deepEqual(recovered.previousContext, failed.previousContext);
  assert.equal(recovered.sources.length > 0, true);
  assert.equal(recovered.tools[0]?.status, 'succeeded');
});

test('non-retryable scenario is returned unchanged', () => {
  const rejected = buildFailureRecoveryScenario('approval-rejection');
  const retried = retryFailureRecoveryScenario(rejected);

  assert.equal(retried, rejected);
});
