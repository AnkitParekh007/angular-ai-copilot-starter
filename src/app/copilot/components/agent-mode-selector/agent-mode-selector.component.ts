import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgentMode, AgentModeOption } from '../../models/agent-mode.model';
export { getActiveModeLabel } from '../../testing/component-contracts';

@Component({
  selector: 'app-agent-mode-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="mode-tabs" aria-label="Agent modes">
      <button
        *ngFor="let mode of modes"
        type="button"
        class="mode-tab"
        [class.active]="mode.id === activeMode"
        [attr.aria-pressed]="mode.id === activeMode"
        [attr.aria-label]="mode.label + ' mode'"
        (click)="modeSelected.emit(mode.id)">
        <strong>{{ mode.label }}</strong>
        <span>{{ mode.description }}</span>
      </button>
    </nav>
  `,
  styles: [`
    .mode-tabs {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
    }

    .mode-tab {
      border: 1px solid var(--border);
      border-radius: 16px;
      background: linear-gradient(180deg, var(--panel), var(--panel-2));
      color: var(--text);
      padding: 14px;
      text-align: left;
      transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
    }

    .mode-tab:hover {
      transform: translateY(-1px);
      border-color: color-mix(in srgb, var(--accent) 36%, var(--border));
    }

    .mode-tab.active {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, .12);
    }

    .mode-tab:focus-visible {
      outline: 3px solid color-mix(in srgb, var(--accent) 35%, white);
      outline-offset: 2px;
    }

    .mode-tab strong,
    .mode-tab span {
      display: block;
    }

    .mode-tab span {
      margin-top: 6px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.4;
    }

    @media (max-width: 760px) {
      .mode-tabs {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AgentModeSelectorComponent {
  @Input({ required: true }) modes: AgentModeOption[] = [];
  @Input({ required: true }) activeMode!: AgentMode;
  @Output() readonly modeSelected = new EventEmitter<AgentMode>();
}
