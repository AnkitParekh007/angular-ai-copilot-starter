import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CopilotMessage } from '../../models/copilot-message.model';
export { summarizeMessageThread } from '../../testing/component-contracts';

@Component({
  selector: 'app-message-thread',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="message-thread" aria-label="Messages">
      <div class="empty-state" *ngIf="!messages.length">
        <strong>No messages yet</strong>
        <p>Choose a mode and run the demo flow to preview streaming, RAG evidence, and approval UX.</p>
      </div>

      <article class="message" *ngFor="let message of messages" [class.assistant]="message.role === 'assistant'">
        <div class="message-meta">
          <span>{{ message.role }}</span>
          <small>{{ message.mode }} · {{ message.state.replaceAll('_', ' ') }}</small>
        </div>
        <p>{{ message.content || 'Thinking…' }}</p>
        <div class="typing-indicator" *ngIf="message.role === 'assistant' && message.state !== 'completed'">
          <span></span><span></span><span></span>
        </div>
      </article>
    </section>
  `,
  styles: [`
    .message-thread {
      display: grid;
      gap: 14px;
      overflow: auto;
      padding-right: 6px;
    }

    .message {
      width: min(780px, 100%);
      border: 1px solid var(--border);
      border-radius: 18px;
      background: var(--panel);
      padding: 16px;
      box-shadow: 0 16px 35px rgba(15, 23, 42, .06);
    }

    .message.assistant {
      border-left: 5px solid var(--accent);
    }

    .message-meta {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
    }

    .message p {
      margin: 10px 0 0;
      line-height: 1.65;
    }

    .typing-indicator {
      display: inline-flex;
      gap: 5px;
      margin-top: 12px;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      animation: pulse 1.1s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(2) { animation-delay: .16s; }
    .typing-indicator span:nth-child(3) { animation-delay: .32s; }

    .empty-state {
      border: 1px dashed var(--border);
      border-radius: 18px;
      background: color-mix(in srgb, var(--panel) 86%, var(--panel-2));
      padding: 28px;
      color: var(--muted);
    }

    .empty-state strong {
      display: block;
      margin-bottom: 8px;
      color: var(--text);
    }

    @keyframes pulse {
      0%, 80%, 100% { transform: translateY(0); opacity: .35; }
      40% { transform: translateY(-2px); opacity: 1; }
    }
  `]
})
export class MessageThreadComponent {
  @Input({ required: true }) messages: CopilotMessage[] = [];
}
