import pptxgen from 'pptxgenjs';
import { splitByHeadings } from '../utils/markdownParser';

export async function convertToPptx(markdown: string, fileName: string): Promise<Blob> {
  const pptx = new pptxgen();

  // Split markdown by headings to create slides
  const sections = splitByHeadings(markdown);

  for (const section of sections) {
    const slide = pptx.addSlide();

    // Add title
    slide.addText(section.heading, {
      x: 0.5,
      y: 0.5,
      w: '90%',
      h: 1,
      fontSize: 32,
      bold: true,
      color: '363636',
    });

    // Process content
    const contentLines = section.content.split('\n').filter(line => line.trim() !== '');
    const bulletPoints: string[] = [];
    const regularText: string[] = [];

    for (const line of contentLines) {
      if (line.startsWith('- ') || line.startsWith('* ')) {
        bulletPoints.push(line.replace(/^[-*]\s/, ''));
      } else if (!line.startsWith('#')) {
        regularText.push(line);
      }
    }

    let yPosition = 1.8;

    // Add regular text
    if (regularText.length > 0) {
      slide.addText(regularText.join('\n'), {
        x: 0.5,
        y: yPosition,
        w: '90%',
        h: 1,
        fontSize: 14,
        color: '363636',
      });
      yPosition += 1.2;
    }

    // Add bullet points
    if (bulletPoints.length > 0) {
      slide.addText(bulletPoints.map(point => ({ text: point, options: { bullet: true } })), {
        x: 0.5,
        y: yPosition,
        w: '90%',
        h: 4,
        fontSize: 16,
        color: '363636',
      });
    }
  }

  // Return as Blob
  const pptxBlob = await pptx.write({ outputType: 'blob' }) as Blob;
  return pptxBlob;
}
