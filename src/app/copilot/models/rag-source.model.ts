export interface RagSource {
  id: string;
  title: string;
  sourceType: 'document' | 'route' | 'record' | 'policy' | 'workflow';
  snippet: string;
  confidence: number;
  url?: string;
}
