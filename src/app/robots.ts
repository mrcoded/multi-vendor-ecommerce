import { MetadataRoute } from "next";

import { getSiteUrl, ROBOTS_DISALLOW_PATHS } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...ROBOTS_DISALLOW_PATHS],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
