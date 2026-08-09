import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FailureRecoveryScenarioId } from '../../models/failure-recovery-scenario.model';
import { FailureRecoveryScenarioService } from '../../services/failure-recovery-scenario.service';
import { RagSourceCardComponent } from '../rag-source-card/rag-source-card.component';
import { ToolCallTimelineComponent } from '../tool-call-timeline/tool-call-timeline.component';

@Component({
  selector: 'app-failure-recovery-showcase',
  standalone: true,
  imports: [CommonModule, RagSourceCardComponent, ToolCallTimelineComponent],
  template: `
    <section class="recovery-showcase" aria-labelledby="recovery-showcase-title">
      <header class="showcase-header">
        <div>
          <p class="eyebrow">Resilient AI UX</p>
          <h2 id="recovery-showcase-title">Failure and recovery showcase</h2>
          <p class="intro">
            Deterministic failure paths prove that the UI remains truthful when streams stall,
            retrieval fails, tools error, or approval is rejected.
          </p>
        </div>
        <span class="mock-badge">No API keys · deterministic fixtures</span>
      </header>

      <div class="scenario-selector" aria-label="Failure and recovery scenarios">
        <button
          *ngFor="let option of scenarios"
          type="button"
          [class.active]="scenario().id === option.id"
          [attr.aria-pressed]="scenario().id === option.id"
          (click)="selectScenario(option.id)">
          <strong>{{ option.label }}</strong>
          <span>{{ option.detail }}</span>
        </button>
      </div>

      <div class="showcase-grid">
        <div class="main-column">
          <article class="showcase-card state-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">Current execution state</p>
                <h3>{{ scenario().label }}</h3>
              </div>
              <span class="state-pill" [attr.data-state]="scenario().executionState">
                {{ stateLabel() }}
              </span>
            </div>
            <p>{{ scenario().summary }}</p>
            <div class="response-box">
              <strong>Assistant-visible result</strong>
              <p>{{ scenario().response }}</p>
            </div>
            <button
              *ngIf="scenario().retryable"
              type="button"
              class="retry-button"
              (click)="retry()">
              Retry with prior context
            </button>
            <p class="live-status" aria-live="polite" aria-atomic="true">{{ announcement() }}</p>
          </article>

          <article class="showcase-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">State transitions</p>
                <h3>Failure trace</h3>
              </div>
              <span class="trace-count">{{ scenario().trace.length }} states</span>
            </div>
            <ol class="failure-trace">
              <li *ngFor="let item of scenario().trace">
                <span class="trace-status" [attr.data-state]="item.status">{{ item.status }}</span>
                <div>
                  <strong>{{ item.label }}</strong>
                  <p>{{ item.detail }}</p>
                </div>
              </li>
            </ol>
          </article>
        </div>

        <aside class="side-column">
          <article class="showcase-card">
            <p class="eyebrow">Prior context</p>
            <h3>Understandable across retry</h3>
            <ul class="context-list">
              <li *ngFor="let item of scenario().previousContext"><code>{{ item }}</code></li>
            </ul>
            <p *ngIf="scenario().recovered" class="recovered-note">
              Recovery reused this exact safe snapshot rather than silently rebuilding hidden state.
            </p>
          </article>

          <article class="showcase-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">Grounding</p>
                <h3>RAG evidence</h3>
              </div>
              <span class="trace-count">{{ scenario().sources.length }} sources</span>
            </div>
            <ng-container *ngIf="scenario().sources.length; else noSources">
              <app-rag-source-card
                *ngFor="let source of scenario().sources"
                [source]="source">
              </app-rag-source-card>
            </ng-container>
            <ng-template #noSources>
              <p class="empty-state">
                No citations are rendered. Missing or failed retrieval never produces fabricated evidence.
              </p>
            </ng-template>
          </article>

          <article class="showcase-card">
            <div class="card-header">
              <div>
                <p class="eyebrow">Execution visibility</p>
                <h3>Tool timeline</h3>
              </div>
              <span class="trace-count">{{ scenario().tools.length }} calls</span>
            </div>
            <app-tool-call-timeline [tools]="scenario().tools"></app-tool-call-timeline>
            <p *ngIf="!scenario().tools.length" class="empty-state">
              Tool planning is absent or blocked for this scenario.
            </p>
          </article>
        </aside>
      </div>

      <footer class="boundary-note">
        <strong>Production boundary:</strong>
        this showcase models frontend state only. A real backend must enforce retrieval authorization,
        approval policy, idempotent execution, audit logs, credentials, and tool permissions.
      </footer>
    </section>
  `,
  styleUrls: ['./failure-recovery-showcase.component.css'],
})
export class FailureRecoveryShowcaseComponent {
  private readonly scenarioService = inject(FailureRecoveryScenarioService);

  readonly scenarios: ReadonlyArray<{
    id: FailureRecoveryScenarioId;
    label: string;
    detail: string;
  }> = [
    { id: 'stalled-stream', label: 'Stalled stream', detail: 'Retryable response state' },
    { id: 'retrieval-failure', label: 'Retrieval failure', detail: 'No fabricated citations' },
    { id: 'tool-failure', label: 'Failed tool', detail: 'Visible failed timeline item' },
    { id: 'approval-rejection', label: 'Rejected approval', detail: 'No execution success' },
    { id: 'recovery-retry', label: 'Recovery retry', detail: 'Prior context retained' },
  ];

  readonly scenario = signal(this.scenarioService.build('stalled-stream'));
  readonly announcement = signal('Stalled stream scenario loaded. Retry is available after the visible failure.');

  selectScenario(id: FailureRecoveryScenarioId): void {
    this.scenario.set(this.scenarioService.build(id));
    this.announcement.set(`${this.scenario().label} scenario loaded. ${this.scenario().summary}`);
  }

  retry(): void {
    const before = this.scenario();
    this.scenario.set(this.scenarioService.retry(before));
    this.announcement.set(
      this.scenario().recovered
        ? 'Recovery retry completed with the same safe prior context and a truthful successful result.'
        : 'This scenario does not expose a retry action.',
    );
  }

  stateLabel(): string {
    return this.scenario().executionState.replace(/_/g, ' ');
  }
}
