import { renderIconMark } from '@/lib/icon-mark';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return renderIconMark(size.width, false);
}
