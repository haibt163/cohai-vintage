export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // "<" is escaped so content can never close the script element early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
