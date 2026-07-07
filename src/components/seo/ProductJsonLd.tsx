import JsonLd from "./JsonLd";
import { buildCanonical } from "@/lib/seo";

interface ProductJsonLdProps {
  name: string;
  description?: string | null;
  slug: string;
  imageUrl?: string | null;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock";
}

export default function ProductJsonLd({
  name,
  description,
  slug,
  imageUrl,
  price,
  currency = "USD",
  availability = "InStock",
}: ProductJsonLdProps) {
  const url = buildCanonical(`/products/${slug}`);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description: description ?? name,
        image: imageUrl ? [imageUrl] : undefined,
        url,
        offers: {
          "@type": "Offer",
          price: price.toFixed(2),
          priceCurrency: currency,
          availability: `https://schema.org/${availability}`,
          url,
        },
      }}
    />
  );
}
