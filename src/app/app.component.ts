import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AGENT_MODES } from './copilot/models/agent-mode.model';
import { DEMO_RAG_SOURCES } from './copilot/mocks/demo-rag-sources';
import { DEMO_TOOL_CALLS } from './copilot/mocks/demo-tool-calls';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="shell">
      <aside class="sessions">
        <h1>Angular AI Copilot</h1>
        <button *ngFor="let mode of modes" type="button">{{ mode.label }}</button>
      </aside>
      <section class="thread">
        <p class="eyebrow">Mock enterprise copilot</p>
        <h2>Streaming UX, RAG evidence, tool calls, and approvals</h2>
        <article class="message">
          <p>This demo uses typed Angular services and mock data only. No provider keys are required.</p>
        </article>
        <h3>RAG Sources</h3>
        <ul><li *ngFor="let source of sources">{{ source.title }} - {{ source.sourceType }}</li></ul>
        <h3>Tool Timeline</h3>
        <ol><li *ngFor="let tool of tools">{{ tool.label }}: {{ tool.status }}</li></ol>
      </section>
    </main>
  `,
  styles: [`
    .shell { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; }
    .sessions { background: #111827; color: white; padding: 24px; }
    .sessions button { display: block; width: 100%; margin: 8px 0; padding: 10px; text-align: left; }
    .thread { padding: 32px; max-width: 900px; }
    .eyebrow { color: #2563eb; font-weight: 700; text-transform: uppercase; }
    .message { background: white; border: 1px solid #d1d5db; border-radius: 8px; padding: 16px; }
  `]
})
export class AppComponent {
  readonly modes = AGENT_MODES;
  readonly sources = DEMO_RAG_SOURCES;
  readonly tools = DEMO_TOOL_CALLS;
}
