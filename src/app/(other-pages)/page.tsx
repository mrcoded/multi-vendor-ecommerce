import type { Metadata } from "next";
import { Suspense } from "react";

import { getAllCategories } from "@/services/category-service";
import { buildPageMetadata } from "@/lib/seo";
import { safeServerRead } from "@/lib/api/resilient-read";

import HeroSection from "@/components/HeroSection";
import StoreList from "@/components/StoreList";
import CommunityPost from "@/components/community/CommunityPost";
import CategoryList from "./category/_components/CategoryList";
import SearchForm from "@/components/forms/SearchForm";
import { CategoryProps } from "@/types/category";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Home",
  description:
    "Discover products from multiple vendors on BelStore. Shop categories, explore stores, and read community posts.",
  path: "/",
});

export default async function Home() {
  const [categoriesData] = await Promise.all([
    safeServerRead(() => getAllCategories(), {
      source: "home:categories",
      fallback: [],
    }),
  ]);

  const categories =
    categoriesData?.filter((category: CategoryProps) => {
      return category.products.length > 1;
    }) ?? [];

  const categoryTitleById = Object.fromEntries(
    (categoriesData ?? []).map((category) => [category.id, category.title]),
  );

  return (
    <div className="min-h-screen">
      <HeroSection categories={categoriesData ?? []} />

      <div className="flex max-w-md flex-1 sm:hidden">
        {/* <SearchForm /> */}
      </div>

      <StoreList />

      {categories.map((category) => (
        <div key={category.id} className="py-3 sm:py-5">
          <CategoryList isStorePage={false} category={category} />
        </div>
      ))}

      <CommunityPost
        title="Featured Community Posts"
        categoryTitleById={categoryTitleById}
      />
    </div>
  );
}
