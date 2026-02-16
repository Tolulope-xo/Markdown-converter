import pptxgen from 'pptxgenjs';
import { marked } from 'marked';

export async function convertToPptx(markdown: string, fileName: string): Promise<Blob> {
  const pptx = new pptxgen();
  const tokens = marked.lexer(markdown);

  // Start with a title slide if the first token is a heading, otherwise create a blank slide
  let currentSlide = pptx.addSlide();
  let yPosition = 1.0;

  for (const token of tokens) {
    if (token.type === 'heading') {
      if (token.depth <= 2) {
        // Create new slide for major headings
        currentSlide = pptx.addSlide();
        yPosition = 1.5;
        
        // Add title
        currentSlide.addText(token.text, {
          x: 0.5,
          y: 0.5,
          w: '90%',
          h: 1,
          fontSize: 32,
          bold: true,
          color: '363636',
        });
      } else {
        // Sub-headings on same slide
        currentSlide.addText(token.text, {
          x: 0.5,
          y: yPosition,
          w: '90%',
          h: 0.5,
          fontSize: 24,
          bold: true,
          color: '555555',
        });
        yPosition += 0.8;
      }
    } else if (token.type === 'paragraph') {
      currentSlide.addText(token.text, {
        x: 0.5,
        y: yPosition,
        w: '90%',
        h: 0.5,
        fontSize: 18,
        color: '363636',
      });
      yPosition += 0.7;
    } else if (token.type === 'list') {
      const items = token.items.map((item: any) => ({
        text: item.text,
        options: { bullet: true, fontSize: 16, color: '363636' }
      }));
      
      const listHeight = items.length * 0.5;
      currentSlide.addText(items, {
        x: 0.5,
        y: yPosition,
        w: '90%',
        h: listHeight,
      });
      yPosition += listHeight + 0.2;
    } else if (token.type === 'image') {
       // Placeholder for images - pptxgenjs needs base64 or url, complicate to support local user uploads without more context
       currentSlide.addText(`[Image: ${token.text || 'image'}]`, {
           x: 0.5,
           y: yPosition,
           w: '90%',
           h: 0.5,
           fontSize: 14,
           italic: true,
           color: '888888'
       });
       yPosition += 0.6;

    } else if (token.type === 'code') {
       currentSlide.addText(token.text, {
           x: 0.5,
           y: yPosition,
           w: '90%',
           h: 0.5,
           fontSize: 14,
           fontFace: 'Courier New',
           color: '333333',
           fill: { color: 'F0F0F0' }
       });
       yPosition += 0.8;
    }
    
    // Safety check for overflow - very basic
    if (yPosition > 6.5) {
        currentSlide = pptx.addSlide();
        yPosition = 1.0;
        currentSlide.addText("(Continued)", { x: 0.5, y: 0.5, fontSize: 18, bold: true });
    }
  }

  // Return as Blob
  return await pptx.write({ outputType: 'blob' }) as Blob;
}
