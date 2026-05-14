import { Injectable } from '@angular/core';
import { Observable, concatMap, from, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function tokenizeText(text: string): string[] {
  return text.split(' ').map((token) => token + ' ');
}

@Injectable({ providedIn: 'root' })
export class StreamingMessageService {
  streamText(text: string): Observable<string> {
    return from(tokenizeText(text)).pipe(concatMap(token => of(token).pipe(delay(45))));
  }
}
