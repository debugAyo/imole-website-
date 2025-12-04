export enum MessageRole {
  User = 'user',
  Model = 'model',
}

export interface Message {
  role: MessageRole;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface VerificationResult {
  score: number;
  verdict: 'True' | 'Fake' | 'Satire' | 'Unverified';
  summary: string;
}

export interface GeminiError {
  message: string;
}