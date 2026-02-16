import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { marked } from 'marked';

export async function convertToDocx(markdown: string, fileName: string): Promise<Blob> {
  const tokens = marked.lexer(markdown);
  const docChildren: Paragraph[] = [];

  // Helper function to process inline tokens (strong, em, text, codespan, etc.)
  const processInlineTokens = (inlineTokens: any[]): TextRun[] => {
    return inlineTokens.map((token: any) => {
      if (token.type === 'text') {
        return new TextRun(token.text);
      } else if (token.type === 'strong') {
        return new TextRun({
          text: token.text,
          bold: true,
        });
      } else if (token.type === 'em') {
        return new TextRun({
          text: token.text,
          italics: true,
        });
      } else if (token.type === 'codespan') {
        return new TextRun({
          text: token.text,
          font: 'Courier New',
          color: '333333',
        });
      } else if (token.type === 'link') {
        return new TextRun({
            text: token.text,
            style: 'Hyperlink',
        });
      }
       else {
        return new TextRun(token.text || '');
      }
    });
  };

  for (const token of tokens) {
    if (token.type === 'heading') {
      const headingLevel = (() => {
        switch (token.depth) {
          case 1: return HeadingLevel.HEADING_1;
          case 2: return HeadingLevel.HEADING_2;
          case 3: return HeadingLevel.HEADING_3;
          case 4: return HeadingLevel.HEADING_4;
          case 5: return HeadingLevel.HEADING_5;
          case 6: return HeadingLevel.HEADING_6;
          default: return HeadingLevel.HEADING_1;
        }
      })();

      docChildren.push(
        new Paragraph({
          children: processInlineTokens(token.tokens || []),
          heading: headingLevel,
          spacing: { before: 240, after: 120 },
        })
      );
    } else if (token.type === 'paragraph') {
      docChildren.push(
        new Paragraph({
          children: processInlineTokens(token.tokens || []),
          spacing: { before: 120, after: 120 },
        })
      );
    } else if (token.type === 'list') {
      const isOrdered = token.ordered;
      token.items.forEach((item: any) => {
        // Iterate over the tokens within the list item
         item.tokens.forEach((childToken:any) => {
             if(childToken.type === 'text') {
                 // For simple list items, the content is often in a 'text' token with inline tokens
                  docChildren.push(
                    new Paragraph({
                      children: processInlineTokens(childToken.tokens || []),
                      bullet: { level: 0 }, // Simplified bullet handling
                      spacing: { before: 60, after: 60 },
                    })
                  );
             }
         });
      });
    } else if (token.type === 'blockquote') {
         token.tokens?.forEach((childToken: any) => {
            if (childToken.type === 'paragraph') {
                 docChildren.push(
                    new Paragraph({
                        children: processInlineTokens(childToken.tokens || []),
                        indent: { left: 720 }, // Indent for blockquote
                        spacing: { before: 120, after: 120 },
                         border: {
                            left: {
                                color: "999999",
                                space: 1,
                                style: "single",
                                size: 6,
                            },
                        },
                    })
                );
            }
         });
    } else if (token.type === 'code') {
      const codeLines = token.text.split('\n');
      codeLines.forEach((line: string) => {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                font: 'Courier New',
                size: 20, // 10pt
              }),
            ],
            spacing: { before: 0, after: 0 },
             shading: {
                fill: "F5F5F5",
            },
          })
        );
      });
       // Add some spacing after code block
       docChildren.push(new Paragraph({ spacing: { before: 120 }}));
    } else if (token.type === 'space') {
        // Ignore or handle explicit spacing
    } else if (token.type === 'hr') {
        docChildren.push(
            new Paragraph({
                border: {
                    bottom: {
                        color: "auto",
                        space: 1,
                        style: "single",
                        size: 6,
                    },
                },
                 spacing: { before: 120, after: 120 },
            })
        );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
