import { sanitizeJsonLdValue } from "@/lib/sanitize";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

function getJsonLdId(data: JsonLdValue) {
  const entry = (Array.isArray(data) ? data[0] : data) as Record<
    string,
    unknown
  >;
  const type = String(entry?.["@type"] ?? "data").toLowerCase();

  return `jsonld-${type}`;
}

export default function JsonLd({
  data,
  id,
}: {
  data: JsonLdValue;
  id?: string;
}) {
  const scriptId = id ?? getJsonLdId(data);
  const safeData = sanitizeJsonLdValue(data);

  return (
    <script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(safeData) }}
      suppressHydrationWarning
    />
  );
}
