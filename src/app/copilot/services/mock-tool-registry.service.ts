import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AgentMode } from '../models/agent-mode.model';
import { ToolCall } from '../models/tool-call.model';
import { DEMO_TOOL_CALLS } from '../mocks/demo-tool-calls';

@Injectable({ providedIn: 'root' })
export class MockToolRegistryService {
  planToolCalls(mode: AgentMode): Observable<ToolCall[]> {
    const calls = mode === 'execute' ? DEMO_TOOL_CALLS : DEMO_TOOL_CALLS.filter(call => !call.requiresApproval);
    return of(calls).pipe(delay(200));
  }
}
