import jsPDF from 'jspdf';
import { parseMarkdown } from '../utils/markdownParser';

export async function convertToPdf(markdown: string, fileName: string): Promise<Blob> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Parse markdown into lines and apply basic formatting
  const lines = markdown.split('\n');

  for (const line of lines) {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    // Handle different markdown elements
    if (line.startsWith('# ')) {
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      const text = line.replace('# ', '');
      const splitText = doc.splitTextToSize(text, maxWidth);
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * 12;
    } else if (line.startsWith('## ')) {
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      const text = line.replace('## ', '');
      const splitText = doc.splitTextToSize(text, maxWidth);
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * 10;
    } else if (line.startsWith('### ')) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      const text = line.replace('### ', '');
      const splitText = doc.splitTextToSize(text, maxWidth);
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * 8;
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const text = '• ' + line.replace(/^[-*]\s/, '');
      const splitText = doc.splitTextToSize(text, maxWidth - 10);
      doc.text(splitText, margin + 10, yPosition);
      yPosition += splitText.length * 7;
    } else if (line.trim() === '') {
      yPosition += 5;
    } else if (line.trim() !== '') {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      // Handle bold text
      let processedLine = line.replace(/\*\*(.+?)\*\*/g, '$1');
      const splitText = doc.splitTextToSize(processedLine, maxWidth);
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * 7;
    }
  }

  return doc.output('blob');
}
