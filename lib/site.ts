const DEFAULT_SITE_URL = "https://markdown-converter-blond.vercel.app";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  return DEFAULT_SITE_URL;
}

/** Canonical origin for the site (no trailing slash). */
export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Markdown Converter";

export const SITE_TITLE = "Markdown to PDF & Word (DOCX) Converter — Free Online";

export const SITE_DESCRIPTION =
  "Free online Markdown converter. Upload a .md file, preview it, and download it as a PDF or Word (.docx) document. Conversion runs in your browser — no sign-up.";

export const SITE_KEYWORDS = [
  "markdown to pdf",
  "markdown to word",
  "markdown to docx",
  "md to pdf",
  "md to docx",
  "convert markdown to pdf",
  "convert markdown to word",
  "markdown converter online",
  "free markdown converter",
  "markdown preview",
];

/** Features that the app actually implements. */
export const FEATURES = [
  "Convert Markdown to PDF",
  "Convert Markdown to Word (.docx)",
  "Upload .md, .markdown and .txt files",
  "Live Markdown preview with GitHub Flavored Markdown (tables, task lists, strikethrough)",
  "Headings, paragraphs, lists, blockquotes, code blocks and horizontal rules",
  "Conversion runs entirely in the browser",
  "Free, no account required",
];

export const FAQS: Array<{ question: string; answer: string }> = [
  {
    question: "How do I convert Markdown to PDF?",
    answer:
      "Click “Upload Markdown File” and choose a .md, .markdown or .txt file. Check the preview, select PDF as the output format, then click “Download as PDF”.",
  },
  {
    question: "Can I convert Markdown to Word (DOCX)?",
    answer:
      "Yes. After uploading your file, select Word as the output format and click “Download as DOCX” to get a .docx document you can open in Microsoft Word, Google Docs or LibreOffice.",
  },
  {
    question: "Is my file uploaded to a server?",
    answer:
      "No. Your file is read and converted locally in your browser, so the content of your document is not sent to a server.",
  },
  {
    question: "Which Markdown elements are supported?",
    answer:
      "Headings, paragraphs, bulleted and numbered lists, blockquotes, code blocks and horizontal rules are converted. The Word export also keeps bold, italic and inline code formatting.",
  },
  {
    question: "Is the Markdown converter free?",
    answer: "Yes. It is free to use and does not require an account.",
  },
];
