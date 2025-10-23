import { marked } from 'marked';

export function parseMarkdown(markdown: string): string {
  return marked(markdown) as string;
}

export function extractHeadings(markdown: string): string[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings: string[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push(match[1]);
  }

  return headings;
}

export function splitByHeadings(markdown: string): Array<{ heading: string; content: string }> {
  const sections: Array<{ heading: string; content: string }> = [];
  const lines = markdown.split('\n');
  let currentHeading = 'Introduction';
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.match(/^#{1,2}\s+/)) {
      if (currentContent.length > 0) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join('\n').trim(),
        });
      }
      currentHeading = line.replace(/^#{1,2}\s+/, '');
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentContent.length > 0) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join('\n').trim(),
    });
  }

  return sections;
}
