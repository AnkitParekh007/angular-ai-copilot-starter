import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AGENT_MODES, AgentMode } from './copilot/models/agent-mode.model';
import { DEMO_MESSAGES } from './copilot/mocks/demo-messages';
import { DEMO_RAG_SOURCES } from './copilot/mocks/demo-rag-sources';
import { DEMO_SESSIONS } from './copilot/mocks/demo-sessions';
import { DEMO_TOOL_CALLS } from './copilot/mocks/demo-tool-calls';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="copilot-shell">
      <aside class="sidebar" aria-label="Copilot sessions">
        <div class="brand">
          <p>AI Frontend Proof</p>
          <h1>Angular Copilot</h1>
        </div>
        <button class="session" *ngFor="let session of sessions" type="button">
          <strong>{{ session.title }}</strong>
          <span>{{ session.mode }} mode · {{ session.messageCount }} messages</span>
        </button>
      </aside>

      <section class="thread" aria-label="Copilot conversation">
        <div class="toolbar">
          <div>
            <p class="eyebrow">Enterprise-safe mock copilot</p>
            <h2>Streaming chat, RAG evidence, tools, and approvals</h2>
          </div>
          <span class="status-pill">{{ executionLabel }}</span>
        </div>

        <nav class="mode-tabs" aria-label="Agent modes">
          <button *ngFor="let mode of modes" type="button" [class.active]="mode.id === activeMode" (click)="activeMode = mode.id">
            {{ mode.label }}
          </button>
        </nav>

        <article class="message" *ngFor="let message of messages" [class.assistant]="message.role === 'assistant'">
          <span class="role">{{ message.role }}</span>
          <p>{{ message.content }}</p>
        </article>

        <form class="composer" (submit)="$event.preventDefault()">
          <input name="prompt" [(ngModel)]="prompt" aria-label="Prompt" />
          <button type="submit">Send mock prompt</button>
        </form>
      </section>

      <aside class="context-panel" aria-label="Context and tools">
        <section>
          <h3>RAG Sources</h3>
          <article class="source-card" *ngFor="let source of sources">
            <div><strong>{{ source.title }}</strong><span>{{ source.sourceType }}</span></div>
            <p>{{ source.snippet }}</p>
            <small>Confidence {{ source.confidence | percent }}</small>
          </article>
        </section>

        <section>
          <h3>Tool Timeline</h3>
          <ol class="timeline">
            <li *ngFor="let tool of tools">
              <span class="dot"></span>
              <div><strong>{{ tool.label }}</strong><small>{{ tool.status }} · {{ tool.type }}</small></div>
            </li>
          </ol>
        </section>

        <section class="approval">
          <h3>Approval Required</h3>
          <p>Submit onboarding workflow for customer-42.</p>
          <div class="actions"><button type="button">Approve mock action</button><button type="button" class="secondary">Reject</button></div>
        </section>
      </aside>
    </main>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: #f5f7fb; color: #172033; }
    .copilot-shell { display: grid; grid-template-columns: 280px minmax(0, 1fr) 360px; min-height: 100vh; }
    .sidebar { background: #111827; color: #fff; padding: 24px; display: flex; flex-direction: column; gap: 14px; }
    .brand p, .eyebrow { margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; color: #60a5fa; }
    .brand h1 { margin: 6px 0 18px; font-size: 24px; }
    .session { text-align: left; border: 1px solid #374151; background: #1f2937; color: #fff; border-radius: 8px; padding: 12px; }
    .session span { display: block; margin-top: 6px; color: #cbd5e1; font-size: 13px; }
    .thread { padding: 28px; display: flex; flex-direction: column; gap: 18px; }
    .toolbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
    h2, h3 { margin: 0; }
    .status-pill { padding: 6px 10px; border-radius: 999px; background: #dcfce7; color: #166534; font-weight: 700; font-size: 13px; }
    .mode-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
    .mode-tabs button { border: 1px solid #cbd5e1; background: #fff; border-radius: 999px; padding: 8px 14px; }
    .mode-tabs button.active { background: #1d4ed8; border-color: #1d4ed8; color: #fff; }
    .message { max-width: 760px; background: #fff; border: 1px solid #d8dee9; border-radius: 8px; padding: 16px; }
    .message.assistant { border-left: 4px solid #2563eb; }
    .role { display: inline-block; margin-bottom: 8px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .composer { margin-top: auto; display: flex; gap: 10px; background: #fff; border: 1px solid #d8dee9; border-radius: 8px; padding: 10px; }
    .composer input { flex: 1; border: 0; outline: 0; font: inherit; }
    button { cursor: pointer; }
    .composer button, .approval button { background: #111827; color: #fff; border: 0; border-radius: 6px; padding: 10px 12px; }
    .context-panel { background: #fff; border-left: 1px solid #d8dee9; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
    .source-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-top: 10px; }
    .source-card div { display: flex; justify-content: space-between; gap: 8px; }
    .source-card span, .timeline small { color: #64748b; font-size: 12px; }
    .timeline { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 12px; }
    .timeline li { display: grid; grid-template-columns: 14px 1fr; gap: 10px; align-items: start; }
    .dot { width: 10px; height: 10px; margin-top: 4px; border-radius: 50%; background: #2563eb; }
    .approval { border: 1px solid #f59e0b; background: #fffbeb; border-radius: 8px; padding: 14px; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .approval .secondary { background: #fff; color: #111827; border: 1px solid #d1d5db; }
    @media (max-width: 1040px) { .copilot-shell { grid-template-columns: 1fr; } .sidebar, .context-panel { border: 0; } }
  `]
})
export class AppComponent {
  readonly modes = AGENT_MODES;
  readonly sessions = DEMO_SESSIONS;
  readonly messages = DEMO_MESSAGES;
  readonly sources = DEMO_RAG_SOURCES;
  readonly tools = DEMO_TOOL_CALLS;
  activeMode: AgentMode = 'plan';
  prompt = 'Plan the safest next step for the selected customer record.';
  executionLabel = 'awaiting approval';
}
