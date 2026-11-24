import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = 'Markdown Converter — convert Markdown to PDF and Word (DOCX) online, free';

/** Branded social card used for both Open Graph and Twitter images. */
export function renderOgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #faf5ff 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 700,
              marginRight: 28,
            }}
          >
            MD
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: '#1f2937' }}>{SITE_NAME}</div>
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, color: '#1f2937', lineHeight: 1.1 }}>
          Markdown to PDF & Word
        </div>
        <div style={{ fontSize: 36, color: '#4b5563', marginTop: 28 }}>
          Upload a .md file, preview it, download PDF or DOCX. Free, in your browser.
        </div>
        <div style={{ display: 'flex', marginTop: 48 }}>
          {['.md → PDF', '.md → DOCX'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                fontSize: 30,
                fontWeight: 600,
                color: '#1d4ed8',
                background: '#ffffff',
                border: '3px solid #2563eb',
                borderRadius: 14,
                padding: '12px 28px',
                marginRight: 20,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
