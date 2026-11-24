import { renderIconMark } from '@/lib/icon-mark';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return renderIconMark(size.width);
}
