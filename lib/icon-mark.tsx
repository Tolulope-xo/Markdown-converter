import { ImageResponse } from 'next/og';

/** Square "MD" brand mark rendered as a PNG at the given size. */
export function renderIconMark(px: number, rounded = true) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563eb',
          color: '#ffffff',
          fontSize: Math.round(px * 0.46),
          fontWeight: 700,
          fontFamily: 'sans-serif',
          borderRadius: rounded ? Math.round(px * 0.2) : 0,
        }}
      >
        MD
      </div>
    ),
    { width: px, height: px },
  );
}
