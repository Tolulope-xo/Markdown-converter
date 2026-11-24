type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Renders a JSON-LD <script>, escaping "<" so content can't break out of the tag. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
