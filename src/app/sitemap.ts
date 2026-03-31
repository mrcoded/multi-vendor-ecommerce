import { MetadataRoute } from "next";
import { fetchAllCategoriesAction } from "@/lib/actions/category-actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const { data: category } = await fetchAllCategoriesAction();
  const categoryUrls =
    category?.map((item: { slug: string }) => {
      return {
        url: `${baseUrl}/category/${item.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
    },
    ...categoryUrls,
  ];
}
