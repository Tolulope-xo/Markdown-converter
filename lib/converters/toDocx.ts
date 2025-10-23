import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export async function convertToDocx(markdown: string, fileName: string): Promise<Blob> {
  const lines = markdown.split('\n');
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace('# ', ''),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
        })
      );
    } else if (line.startsWith('## ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace('## ', ''),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (line.startsWith('### ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace('### ', ''),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 80 },
        })
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^[-*]\s/, ''),
          bullet: { level: 0 },
          spacing: { before: 60, after: 60 },
        })
      );
    } else if (line.trim() === '') {
      paragraphs.push(
        new Paragraph({
          text: '',
          spacing: { before: 120, after: 120 },
        })
      );
    } else if (line.trim() !== '') {
      // Handle bold and italic text
      const children: TextRun[] = [];
      const boldRegex = /\*\*(.+?)\*\*/g;
      const italicRegex = /\*(.+?)\*/g;

      let lastIndex = 0;
      let match;

      // Simple bold text handling
      const parts = line.split(/(\*\*.*?\*\*)/g);
      for (const part of parts) {
        if (part.startsWith('**') && part.endsWith('**')) {
          children.push(
            new TextRun({
              text: part.replace(/\*\*/g, ''),
              bold: true,
            })
          );
        } else if (part) {
          children.push(new TextRun(part));
        }
      }

      paragraphs.push(
        new Paragraph({
          children: children.length > 0 ? children : [new TextRun(line)],
          spacing: { before: 60, after: 60 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
