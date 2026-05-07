import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly mode = signal<ThemeMode>('light');

  toggle(): void {
    this.mode.update(mode => mode === 'light' ? 'dark' : 'light');
  }
}
