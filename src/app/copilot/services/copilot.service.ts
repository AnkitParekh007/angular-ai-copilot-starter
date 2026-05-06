import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, switchMap, scan, startWith } from 'rxjs';
import { AgentMode } from '../models/agent-mode.model';
import { CopilotMessage } from '../models/copilot-message.model';
import { MockRagService } from './mock-rag.service';
import { MockToolRegistryService } from './mock-tool-registry.service';
import { StreamingMessageService } from './streaming-message.service';

@Injectable({ providedIn: 'root' })
export class CopilotService {
  constructor(
    private readonly rag: MockRagService,
    private readonly tools: MockToolRegistryService,
    private readonly streaming: StreamingMessageService
  ) {}

  sendMessage(sessionId: string, prompt: string, mode: AgentMode): Observable<CopilotMessage> {
    return combineLatest([this.rag.retrieveSources(prompt), this.tools.planToolCalls(mode)]).pipe(
      switchMap(([sources, toolCalls]) => this.streaming.streamText(this.buildMockResponse(prompt, mode)).pipe(
        scan((content, token) => content + token, ''),
        startWith(''),
        map(content => ({
          id: 'message-' + Date.now(),
          sessionId,
          role: 'assistant' as const,
          mode,
          content,
          state: content.length ? 'completed' as const : 'thinking' as const,
          createdAt: new Date().toISOString(),
          sources,
          toolCalls
        }))
      ))
    );
  }

  private buildMockResponse(prompt: string, mode: AgentMode): string {
    return 'Mode ' + mode + ': I reviewed the mock page context and prepared a safe response for "' + prompt + '" with visible sources and tool state.';
  }
}
