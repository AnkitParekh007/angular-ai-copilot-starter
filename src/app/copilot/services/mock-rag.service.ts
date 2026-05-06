import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RagSource } from '../models/rag-source.model';
import { DEMO_RAG_SOURCES } from '../mocks/demo-rag-sources';

@Injectable({ providedIn: 'root' })
export class MockRagService {
  retrieveSources(query: string): Observable<RagSource[]> {
    return of(DEMO_RAG_SOURCES.map(source => ({ ...source, snippet: source.snippet + ' Query: ' + query }))).pipe(delay(250));
  }
}
