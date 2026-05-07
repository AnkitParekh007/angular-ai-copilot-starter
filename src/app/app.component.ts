import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AGENT_MODES, AgentMode } from './copilot/models/agent-mode.model';
import { ActionApproval } from './copilot/models/action-approval.model';
import { CopilotMessage } from './copilot/models/copilot-message.model';
import { ExecutionState } from './copilot/models/execution-state.model';
import { RagSource } from './copilot/models/rag-source.model';
import { ToolCall } from './copilot/models/tool-call.model';
import { DEMO_APPROVALS } from './copilot/mocks/demo-approvals';
import { DEMO_CONTEXT } from './copilot/mocks/demo-context';
import { DEMO_MESSAGES } from './copilot/mocks/demo-messages';
import { DEMO_RAG_SOURCES } from './copilot/mocks/demo-rag-sources';
import { DEMO_SESSIONS } from './copilot/mocks/demo-sessions';
import { DEMO_TOOL_CALLS } from './copilot/mocks/demo-tool-calls';
import { ThemeService } from './copilot/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="copilot-app" [class.dark]="theme.mode() === 'dark'">
      <aside class="session-sidebar" aria-label="Copilot sessions">
        <div class="brand">
          <span class="brand-mark">AI</span>
          <div>
            <p>Angular starter</p>
            <h1>Copilot Workspace</h1>
          </div>
        </div>

        <button class="new-session" type="button" (click)="runDemoFlow()">Run Demo Flow</button>

        <section class="session-list" aria-label="Recent sessions">
          <button class="session-card active" *ngFor="let session of sessions" type="button">
            <strong>{{ session.title }}</strong>
            <span>{{ session.mode }} mode - {{ session.messageCount }} messages</span>
          </button>
        </section>

        <div class="sidebar-note">
          <strong>Mock-only architecture</strong>
          <span>No API keys. No backend. All RAG/tool execution is simulated.</span>
        </div>
      </aside>

      <section class="conversation" aria-label="Copilot conversation">
        <header class="topbar">
          <div>
            <p class="eyebrow">Enterprise-safe AI copilot UI</p>
            <h2>Streaming chat with RAG evidence, MCP tools, and approvals</h2>
          </div>
          <div class="topbar-actions">
            <span class="status-pill" [ngClass]="executionState()">{{ executionLabel() }}</span>
            <button class="theme-toggle" type="button" (click)="theme.toggle()">
              {{ theme.mode() === 'dark' ? 'Light' : 'Dark' }}
            </button>
          </div>
        </header>

        <nav class="mode-tabs" aria-label="Agent modes">
          <button
            *ngFor="let mode of modes"
            type="button"
            [class.active]="mode.id === activeMode()"
            (click)="activeMode.set(mode.id)">
            <strong>{{ mode.label }}</strong>
            <span>{{ mode.description }}</span>
          </button>
        </nav>

        <section class="message-thread" aria-label="Messages">
          <article class="message" *ngFor="let message of messages()" [class.assistant]="message.role === 'assistant'">
            <div class="message-meta">
              <span>{{ message.role }}</span>
              <small>{{ message.mode }} - {{ message.state }}</small>
            </div>
            <p>{{ message.content || 'Thinking...' }}</p>
          </article>
        </section>

        <form class="composer" (submit)="submitPrompt($event)">
          <input name="prompt" [(ngModel)]="prompt" aria-label="Prompt" />
          <button type="button" class="secondary" (click)="runDemoFlow()">Run Demo</button>
          <button type="submit">Send</button>
        </form>
      </section>

      <aside class="context-panel" aria-label="Context and tools">
        <section class="panel-card context-card">
          <div class="section-title">
            <p>Page context</p>
            <strong>{{ context.pageTitle }}</strong>
          </div>
          <dl>
            <div><dt>Route</dt><dd>{{ context.route }}</dd></div>
            <div><dt>Record</dt><dd>{{ context.selectedRecordType }} - {{ context.selectedRecordId }}</dd></div>
            <div><dt>Role</dt><dd>{{ context.userRole }}</dd></div>
            <div><dt>Tenant</dt><dd>{{ context.tenant }}</dd></div>
          </dl>
          <div class="chips">
            <span *ngFor="let field of context.visibleFields">{{ field }}</span>
          </div>
        </section>

        <section class="panel-card">
          <div class="section-title">
            <p>RAG sources</p>
            <strong>{{ sources().length }} grounded sources</strong>
          </div>
          <article class="source-card" *ngFor="let source of sources()">
            <div>
              <strong>{{ source.title }}</strong>
              <span>{{ source.sourceType }}</span>
            </div>
            <p>{{ source.snippet }}</p>
            <meter min="0" max="1" [value]="source.confidence"></meter>
            <small>{{ source.confidence | percent }} confidence</small>
          </article>
          <p class="empty" *ngIf="!sources().length">Sources appear after retrieving context.</p>
        </section>

        <section class="panel-card">
          <div class="section-title">
            <p>MCP/tool timeline</p>
            <strong>{{ tools().length }} planned calls</strong>
          </div>
          <ol class="timeline">
            <li *ngFor="let tool of tools()">
              <span class="timeline-dot" [ngClass]="tool.status"></span>
              <div>
                <strong>{{ tool.label }}</strong>
                <small>{{ tool.status }} - {{ tool.type }}</small>
                <p>{{ tool.outputSummary || tool.inputSummary }}</p>
              </div>
            </li>
          </ol>
          <p class="empty" *ngIf="!tools().length">Tool calls appear after planning.</p>
        </section>

        <section class="approval-card" *ngIf="approval() as approvalItem">
          <p>Human approval</p>
          <h3>{{ approvalItem.title }}</h3>
          <span class="risk">Risk: {{ approvalItem.riskLevel }}</span>
          <p>{{ approvalItem.summary }}</p>
          <div class="approval-actions">
            <button type="button" (click)="resolveApproval(true)">Approve mock action</button>
            <button type="button" class="secondary" (click)="resolveApproval(false)">Reject</button>
          </div>
        </section>
      </aside>
    </main>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
    .copilot-app {
      --bg: #f5f7fb;
      --panel: #ffffff;
      --panel-2: #f8fafc;
      --text: #111827;
      --muted: #64748b;
      --border: #dbe3ef;
      --accent: #2563eb;
      --accent-2: #06b6d4;
      --success: #16a34a;
      --warning: #d97706;
      --danger: #dc2626;
      min-height: 100vh;
      display: grid;
      grid-template-columns: 292px minmax(0, 1fr) 390px;
      background: radial-gradient(circle at top left, rgba(59, 130, 246, .14), transparent 30%), var(--bg);
      color: var(--text);
    }
    .copilot-app.dark {
      --bg: #07111f;
      --panel: #101827;
      --panel-2: #0f172a;
      --text: #e5edf7;
      --muted: #94a3b8;
      --border: #263449;
      --accent: #60a5fa;
      --accent-2: #22d3ee;
    }
    button, input { font: inherit; }
    button { cursor: pointer; }
    .session-sidebar {
      min-height: 100vh;
      padding: 24px;
      color: #fff;
      background: linear-gradient(180deg, #0f172a, #111827 45%, #172554);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .brand { display: flex; gap: 12px; align-items: center; }
    .brand-mark {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: linear-gradient(135deg, #22d3ee, #7c3aed);
      font-weight: 800;
    }
    .brand p, .eyebrow, .section-title p, .approval-card > p {
      margin: 0 0 4px;
      color: var(--accent-2);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0;
      text-transform: uppercase;
    }
    .brand h1, h2, h3 { margin: 0; }
    .brand h1 { font-size: 20px; }
    .new-session, .composer button, .approval-actions button {
      border: 0;
      border-radius: 10px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: #fff;
      padding: 11px 14px;
      font-weight: 800;
      box-shadow: 0 14px 28px rgba(37, 99, 235, .22);
    }
    .session-list { display: grid; gap: 10px; }
    .session-card {
      border: 1px solid rgba(255, 255, 255, .14);
      border-radius: 12px;
      background: rgba(255, 255, 255, .07);
      color: #fff;
      padding: 13px;
      text-align: left;
    }
    .session-card span, .sidebar-note span {
      display: block;
      margin-top: 6px;
      color: #cbd5e1;
      font-size: 13px;
      line-height: 1.45;
    }
    .sidebar-note { margin-top: auto; padding: 14px; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; background: rgba(255,255,255,.06); }
    .conversation { min-width: 0; padding: 28px; display: flex; flex-direction: column; gap: 18px; }
    .topbar, .topbar-actions { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
    .topbar h2 { max-width: 800px; font-size: clamp(24px, 3vw, 38px); line-height: 1.1; }
    .topbar-actions { align-items: center; }
    .status-pill, .theme-toggle {
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--panel);
      color: var(--text);
      padding: 8px 11px;
      font-size: 13px;
      font-weight: 800;
      white-space: nowrap;
    }
    .status-pill.thinking, .status-pill.retrieving_context, .status-pill.planning { color: #075985; background: #e0f2fe; }
    .status-pill.awaiting_approval { color: #92400e; background: #fef3c7; }
    .status-pill.executing_tool { color: #5b21b6; background: #ede9fe; }
    .status-pill.completed { color: #166534; background: #dcfce7; }
    .mode-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
    .mode-tabs button {
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--panel);
      color: var(--text);
      padding: 13px;
      text-align: left;
    }
    .mode-tabs button.active { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37, 99, 235, .12); }
    .mode-tabs span { display: block; margin-top: 4px; color: var(--muted); font-size: 12px; line-height: 1.35; }
    .message-thread { display: grid; gap: 14px; overflow: auto; padding-right: 6px; }
    .message {
      width: min(780px, 100%);
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--panel);
      padding: 16px;
      box-shadow: 0 16px 35px rgba(15, 23, 42, .06);
    }
    .message.assistant { border-left: 5px solid var(--accent); }
    .message-meta { display: flex; justify-content: space-between; gap: 12px; color: var(--muted); font-size: 12px; font-weight: 800; text-transform: uppercase; }
    .message p { margin: 10px 0 0; line-height: 1.65; }
    .composer {
      margin-top: auto;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      gap: 10px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--panel);
      padding: 10px;
      box-shadow: 0 18px 40px rgba(15, 23, 42, .08);
    }
    .composer input { min-width: 0; border: 0; outline: 0; background: transparent; color: var(--text); padding: 9px 10px; }
    .composer .secondary, .approval-actions .secondary { background: var(--panel-2); color: var(--text); border: 1px solid var(--border); box-shadow: none; }
    .context-panel { border-left: 1px solid var(--border); background: var(--panel); padding: 24px; display: grid; align-content: start; gap: 16px; }
    .panel-card, .approval-card { border: 1px solid var(--border); border-radius: 16px; background: var(--panel); padding: 16px; }
    .section-title { margin-bottom: 12px; }
    dl { display: grid; gap: 8px; margin: 0; }
    dl div { display: grid; grid-template-columns: 82px 1fr; gap: 8px; }
    dt { color: var(--muted); font-size: 12px; font-weight: 800; text-transform: uppercase; }
    dd { margin: 0; font-size: 13px; }
    .chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
    .chips span, .source-card span, .risk { border-radius: 999px; background: var(--panel-2); color: var(--muted); padding: 5px 8px; font-size: 12px; font-weight: 700; }
    .source-card { border-top: 1px solid var(--border); padding-top: 12px; margin-top: 12px; }
    .source-card div { display: flex; justify-content: space-between; gap: 10px; }
    .source-card p, .timeline p, .empty { color: var(--muted); font-size: 13px; line-height: 1.45; }
    meter { width: 100%; height: 8px; }
    .timeline { list-style: none; padding: 0; margin: 0; display: grid; gap: 13px; }
    .timeline li { display: grid; grid-template-columns: 14px 1fr; gap: 10px; }
    .timeline strong, .timeline small { display: block; }
    .timeline small { margin-top: 2px; }
    .timeline-dot { width: 11px; height: 11px; margin-top: 5px; border-radius: 50%; background: var(--muted); }
    .timeline-dot.succeeded { background: var(--success); }
    .timeline-dot.running { background: var(--accent); }
    .timeline-dot.awaiting_approval { background: var(--warning); }
    .approval-card { background: linear-gradient(135deg, rgba(251, 191, 36, .14), rgba(59, 130, 246, .08)); border-color: rgba(217, 119, 6, .4); }
    .approval-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    @media (max-width: 1180px) {
      .copilot-app { grid-template-columns: 240px minmax(0, 1fr); }
      .context-panel { grid-column: 1 / -1; border-left: 0; grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 760px) {
      .copilot-app { grid-template-columns: 1fr; }
      .session-sidebar { min-height: auto; }
      .topbar, .topbar-actions, .composer { grid-template-columns: 1fr; flex-direction: column; }
      .mode-tabs, .context-panel { grid-template-columns: 1fr; }
    }
  `]
})
export class AppComponent {
  readonly theme = inject(ThemeService);
  readonly modes = AGENT_MODES;
  readonly sessions = DEMO_SESSIONS;
  readonly context = DEMO_CONTEXT;

  readonly activeMode = signal<AgentMode>('plan');
  readonly executionState = signal<ExecutionState>('awaiting_approval');
  readonly messages = signal<CopilotMessage[]>(DEMO_MESSAGES);
  readonly sources = signal<RagSource[]>(DEMO_RAG_SOURCES);
  readonly tools = signal<ToolCall[]>(DEMO_TOOL_CALLS);
  readonly approval = signal<ActionApproval | null>(DEMO_APPROVALS[0]);
  readonly executionLabel = computed(() => this.executionState().replace(/_/g, ' '));

  prompt = 'Plan the safest next step for the selected customer onboarding record.';

  submitPrompt(event: Event): void {
    event.preventDefault();
    this.runDemoFlow();
  }

  runDemoFlow(): void {
    const sessionId = 'session-1';
    const prompt = this.prompt.trim() || 'Review the selected onboarding workflow.';
    const userMessage: CopilotMessage = {
      id: 'msg-user-' + Date.now(),
      sessionId,
      role: 'user',
      mode: this.activeMode(),
      content: prompt,
      state: 'completed',
      createdAt: new Date().toISOString()
    };
    const assistantMessage: CopilotMessage = {
      id: 'msg-assistant-' + Date.now(),
      sessionId,
      role: 'assistant',
      mode: this.activeMode(),
      content: '',
      state: 'thinking',
      createdAt: new Date().toISOString()
    };

    this.messages.set([userMessage, assistantMessage]);
    this.sources.set([]);
    this.tools.set([]);
    this.approval.set(null);
    this.executionState.set('thinking');

    window.setTimeout(() => this.executionState.set('retrieving_context'), 450);
    window.setTimeout(() => this.sources.set(DEMO_RAG_SOURCES), 950);
    window.setTimeout(() => this.executionState.set('planning'), 1250);
    window.setTimeout(() => this.tools.set(DEMO_TOOL_CALLS.map(tool => ({ ...tool, status: tool.requiresApproval ? 'awaiting_approval' : 'succeeded' }))), 1700);
    window.setTimeout(() => this.executionState.set('awaiting_approval'), 2100);
    window.setTimeout(() => this.approval.set(DEMO_APPROVALS[0]), 2300);
    this.streamAssistantMessage(assistantMessage.id, this.buildMockResponse(prompt));
  }

  resolveApproval(approved: boolean): void {
    this.approval.update(item => item ? { ...item, approved } : item);
    this.executionState.set(approved ? 'executing_tool' : 'recovering');
    this.tools.update(tools => tools.map(tool => tool.requiresApproval ? {
      ...tool,
      status: approved ? 'running' : 'skipped',
      outputSummary: approved ? 'Mock workflow execution started.' : 'Action rejected. Recovery path prepared.'
    } : tool));

    if (approved) {
      window.setTimeout(() => {
        this.executionState.set('completed');
        this.tools.update(tools => tools.map(tool => tool.requiresApproval ? {
          ...tool,
          status: 'succeeded',
          outputSummary: 'Mock onboarding workflow completed after approval.'
        } : tool));
      }, 900);
    }
  }

  private streamAssistantMessage(messageId: string, response: string): void {
    const tokens = response.split(' ');
    tokens.forEach((token, index) => {
      window.setTimeout(() => {
        this.messages.update(messages => messages.map(message => message.id === messageId ? {
          ...message,
          content: (message.content + ' ' + token).trim(),
          state: index === tokens.length - 1 ? 'awaiting_approval' : this.executionState()
        } : message));
      }, 80 * index);
    });
  }

  private buildMockResponse(prompt: string): string {
    return `I inspected the selected customer context for "${prompt}". I found policy-backed evidence, prepared a safe plan, and queued one workflow tool that requires human approval before execution.`;
  }
}
