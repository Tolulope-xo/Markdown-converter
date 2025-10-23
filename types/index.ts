export type ConversionFormat = 'pdf' | 'docx' | 'pptx';

export interface MarkdownContent {
  content: string;
  fileName: string;
}

export interface ConversionOptions {
  format: ConversionFormat;
  content: string;
  fileName: string;
}
