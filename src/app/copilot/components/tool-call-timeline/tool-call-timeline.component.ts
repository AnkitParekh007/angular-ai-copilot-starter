import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToolCall } from '../../models/tool-call.model';

@Component({
  selector: 'app-tool-call-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="timeline-wrapper">
      <ol class="timeline" *ngIf="tools.length; else emptyTimeline">
        <li *ngFor="let tool of tools">
          <span class="timeline-dot" [ngClass]="tool.status"></span>
          <div>
            <strong>{{ tool.label }}</strong>
            <small>{{ tool.status }} · {{ tool.type }}</small>
            <p>{{ tool.outputSummary || tool.inputSummary }}</p>
          </div>
        </li>
      </ol>
      <ng-template #emptyTimeline>
        <p class="empty">Tool calls appear after planning.</p>
      </ng-template>
    </section>
  `,
  styles: [`
    .timeline {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 13px;
    }

    .timeline li {
      display: grid;
      grid-template-columns: 14px 1fr;
      gap: 10px;
    }

    .timeline strong,
    .timeline small {
      display: block;
    }

    .timeline small {
      margin-top: 2px;
      color: var(--muted);
    }

    .timeline p,
    .empty {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.45;
      margin: 6px 0 0;
    }

    .timeline-dot {
      width: 11px;
      height: 11px;
      margin-top: 5px;
      border-radius: 50%;
      background: var(--muted);
    }

    .timeline-dot.succeeded { background: var(--success); }
    .timeline-dot.running { background: var(--accent); }
    .timeline-dot.awaiting_approval { background: var(--warning); }
    .timeline-dot.skipped,
    .timeline-dot.failed { background: var(--danger); }
  `]
})
export class ToolCallTimelineComponent {
  @Input({ required: true }) tools: ToolCall[] = [];
}
