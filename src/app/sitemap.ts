import { MetadataRoute } from "next";
import { getAllCategories } from "@/services/category-service";
import { getAllProducts } from "@/services/product-service";
import { getAllStores } from "@/services/store-service";
import { getAllCommunityPosts } from "@/services/community-service";
import { getSiteUrl } from "@/lib/seo";
import { safeServerRead } from "@/lib/api/resilient-read";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const [categories, products, stores, posts] = await Promise.all([
    safeServerRead(() => getAllCategories(), {
      source: "sitemap:categories",
      fallback: [],
    }),
    safeServerRead(() => getAllProducts(), {
      source: "sitemap:products",
      fallback: [],
    }),
    safeServerRead(() => getAllStores(), {
      source: "sitemap:stores",
      fallback: [],
    }),
    safeServerRead(() => getAllCommunityPosts(), {
      source: "sitemap:posts",
      fallback: [],
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/community-blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vendor-pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categoryUrls: MetadataRoute.Sitemap =
    categories?.map((item) => ({
      url: `${baseUrl}/category/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) ?? [];

  const productUrls: MetadataRoute.Sitemap =
    products?.map((item) => ({
      url: `${baseUrl}/products/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })) ?? [];

  const storeUrls: MetadataRoute.Sitemap =
    stores?.map((item) => ({
      url: `${baseUrl}/store/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) ?? [];

  const blogUrls: MetadataRoute.Sitemap =
    posts?.map((item) => ({
      url: `${baseUrl}/community-blogs/${item.slug}`,
      lastModified: item.createdAt ? new Date(item.createdAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) ?? [];

  return [
    ...staticRoutes,
    ...categoryUrls,
    ...productUrls,
    ...storeUrls,
    ...blogUrls,
  ];
}
