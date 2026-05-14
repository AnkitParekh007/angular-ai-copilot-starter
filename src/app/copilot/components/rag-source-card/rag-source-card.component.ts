import { CommonModule, PercentPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RagSource } from '../../models/rag-source.model';
export { formatConfidenceLabel } from '../../testing/component-contracts';

@Component({
  selector: 'app-rag-source-card',
  standalone: true,
  imports: [CommonModule, PercentPipe],
  template: `
    <article class="source-card">
      <div class="source-header">
        <strong>{{ source.title }}</strong>
        <span>{{ source.sourceType }}</span>
      </div>
      <p>{{ source.snippet }}</p>
      <meter min="0" max="1" [value]="source.confidence"></meter>
      <small>{{ source.confidence | percent }} confidence</small>
    </article>
  `,
  styles: [`
    .source-card {
      border-top: 1px solid var(--border);
      padding-top: 12px;
      margin-top: 12px;
    }

    .source-header {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .source-header span {
      border-radius: 999px;
      background: var(--panel-2);
      color: var(--muted);
      padding: 5px 8px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }

    p,
    small {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.45;
    }

    p {
      margin: 10px 0;
    }

    meter {
      width: 100%;
      height: 8px;
    }
  `]
})
export class RagSourceCardComponent {
  @Input({ required: true }) source!: RagSource;
}
