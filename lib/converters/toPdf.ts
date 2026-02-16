import jsPDF from 'jspdf';
import { marked } from 'marked';

export async function convertToPdf(markdown: string, fileName: string): Promise<Blob> {
  const doc = new jsPDF();
  const tokens = marked.lexer(markdown);
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  const checkPageBreak = (height: number) => {
    if (yPosition + height > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  const addText = (text: string, fontSize: number, fontStyle: string = 'normal', indent: number = 0) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    
    // Split text to fit width
    const currentMaxWidth = maxWidth - indent;
    const lines = doc.splitTextToSize(text, currentMaxWidth);
    const lineHeight = fontSize * 0.5; // Approx line height in mm
    const blockHeight = lines.length * lineHeight;

    checkPageBreak(blockHeight);

    doc.text(lines, margin + indent, yPosition);
    yPosition += blockHeight + (fontSize * 0.2); // Add some spacing after block
  };

  for (const token of tokens) {
    if (token.type === 'heading') {
      const sizes = [24, 20, 16, 14, 12, 10];
      const size = sizes[(token.depth || 1) - 1];
      yPosition += 5; // Spacing before heading
      addText(token.text, size, 'bold');
      yPosition += 5; // Spacing after heading
    } else if (token.type === 'paragraph') {
      addText(token.text, 12, 'normal');
      yPosition += 2; // Spacing after paragraph
    } else if (token.type === 'list') {
        token.items.forEach((item: any) => {
            const bullet = token.ordered ? `1. ` : `• `;
            // Simplified: just taking the raw text of the item, ignoring nested tokens for now to keep it simple
            // For a robust implementation, we'd need to recursively process item.tokens
            addText(`${bullet}${item.text}`, 12, 'normal', 10);
        });
        yPosition += 2;
    } else if (token.type === 'blockquote') {
         addText(token.text, 12, 'italic', 10); // Indent blockquote
         yPosition += 2;
    } else if (token.type === 'code') {
        doc.setFont('courier', 'normal');
        addText(token.text, 10, 'normal', 0);
        doc.setFont('helvetica', 'normal'); // Reset font
        yPosition += 2;
    } else if (token.type === 'space') {
        yPosition += 5;
    }
  }

  return doc.output('blob');
}
