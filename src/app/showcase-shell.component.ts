import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { FailureRecoveryShowcaseComponent } from './copilot/components/failure-recovery-showcase/failure-recovery-showcase.component';

@Component({
  selector: 'app-showcase-shell',
  standalone: true,
  imports: [AppComponent, FailureRecoveryShowcaseComponent],
  template: `
    <app-root></app-root>
    <app-failure-recovery-showcase></app-failure-recovery-showcase>
  `,
})
export class ShowcaseShellComponent {}
