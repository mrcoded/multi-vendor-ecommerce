import type { Metadata } from "next";

import CommunityPost from "@/components/community/CommunityPost";
import { buildPageMetadata } from "@/lib/seo";
import { safeServerRead } from "@/lib/api/resilient-read";
import { getAllCategories } from "@/services/category-service";

export const revalidate = 300;

export const metadata: Metadata = buildPageMetadata({
  title: "Community Blogs",
  description:
    "Read tips, guides, and updates from the BelStore community and vendor network.",
  path: "/community-blogs",
});

export default async function Page() {
  const categoriesData = await safeServerRead(() => getAllCategories(), {
    source: "community-blogs:categories",
    fallback: [],
  });

  const categoryTitleById = Object.fromEntries(
    categoriesData.map((category) => [category.id, category.title]),
  );

  return (
    <CommunityPost
      title="Read All Our Community Posts"
      limit={Number.POSITIVE_INFINITY}
      categoryTitleById={categoryTitleById}
    />
  );
}
