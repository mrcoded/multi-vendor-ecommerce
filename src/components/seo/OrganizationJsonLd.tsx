import JsonLd from "./JsonLd";
import { getSiteUrl, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function OrganizationJsonLd() {
  const url = getSiteUrl();

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url,
        logo: `${url}/assets/icon.png`,
        description: DEFAULT_DESCRIPTION,
        sameAs: [
          "https://github.com/BelStore",
          "https://twitter.com/CodedLibra",
        ],
      }}
    />
  );
}
