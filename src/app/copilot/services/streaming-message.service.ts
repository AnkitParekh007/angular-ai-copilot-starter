import { Injectable } from '@angular/core';
import { Observable, concatMap, from, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StreamingMessageService {
  streamText(text: string): Observable<string> {
    return from(text.split(' ')).pipe(concatMap(token => of(token + ' ').pipe(delay(45))));
  }
}
