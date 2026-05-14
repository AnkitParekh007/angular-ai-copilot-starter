import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionApproval } from '../../models/action-approval.model';
import { getApprovalTone } from '../../testing/component-contracts';
export { getApprovalTone } from '../../testing/component-contracts';

@Component({
  selector: 'app-action-approval-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="approval-card" *ngIf="approval">
      <p>Human approval</p>
      <h3>{{ approval.title }}</h3>
      <span class="risk" [attr.data-tone]="getApprovalTone(approval.riskLevel)">Risk: {{ approval.riskLevel }}</span>
      <p>{{ approval.summary }}</p>
      <div class="approval-actions">
        <button type="button" (click)="decision.emit(true)">Approve mock action</button>
        <button type="button" class="secondary" (click)="decision.emit(false)">Reject</button>
      </div>
    </section>
  `,
  styles: [`
    .approval-card {
      background: linear-gradient(135deg, rgba(251, 191, 36, .14), rgba(59, 130, 246, .08));
      border: 1px solid rgba(217, 119, 6, .4);
      border-radius: 16px;
      padding: 16px;
    }

    .risk {
      display: inline-flex;
      border-radius: 999px;
      background: var(--panel-2);
      color: var(--muted);
      padding: 5px 8px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .approval-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .approval-actions button {
      border: 0;
      border-radius: 10px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: #fff;
      padding: 11px 14px;
      font-weight: 800;
      box-shadow: 0 14px 28px rgba(37, 99, 235, .22);
    }

    .approval-actions .secondary {
      background: var(--panel-2);
      color: var(--text);
      border: 1px solid var(--border);
      box-shadow: none;
    }
  `]
})
export class ActionApprovalCardComponent {
  @Input({ required: true }) approval: ActionApproval | null = null;
  @Output() readonly decision = new EventEmitter<boolean>();
  readonly getApprovalTone = getApprovalTone;
}
