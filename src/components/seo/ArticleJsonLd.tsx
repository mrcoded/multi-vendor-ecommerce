import JsonLd from "./JsonLd";
import { buildCanonical } from "@/lib/seo";

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  publishedAt: string | Date;
}

export default function ArticleJsonLd({
  title,
  description,
  slug,
  imageUrl,
  publishedAt,
}: ArticleJsonLdProps) {
  const url = buildCanonical(`/community-blogs/${slug}`);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: imageUrl ? [imageUrl] : undefined,
        datePublished: new Date(publishedAt).toISOString(),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }}
    />
  );
}
