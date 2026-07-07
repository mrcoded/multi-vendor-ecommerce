import React, { Suspense } from "react";
import Link from "next/link";

import { CategoryProps } from "@/types/category";

import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/ErrorBoundary";
import CategoryCarousel from "@/components/carousels/CategoryCarousel";
import CategoryListsSkeleton from "@/components/feedback/skeletons/CategoryListsSkeleton";

function CategoryList({
  storeId,
  category,
  isStorePage,
}: {
  storeId?: string;
  storeSlug?: string;
  category: CategoryProps | null | undefined;
  isStorePage?: boolean;
}) {
  const categoryProducts = isStorePage
    ? category?.products.filter((product) => product.storeId === storeId)
    : category?.products;

  if (!categoryProducts?.length) return null;

  const seeAllHref = `/category/${category?.slug}`;

  return (
    <ErrorBoundary variant="inline" showHomeLink={false} showToast>
      <Suspense fallback={<CategoryListsSkeleton />}>
        <section className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-3.5">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground">
                {category?.title}
              </h2>
              {isStorePage && (
                <p className="text-[10px] text-muted-foreground sm:text-[11px]">
                  {categoryProducts.length}{" "}
                  {categoryProducts.length === 1 ? "product" : "products"}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 shrink-0 px-2 text-xs text-accent hover:text-accent sm:h-8 sm:px-2.5"
              asChild
            >
              <Link href={seeAllHref}>See all</Link>
            </Button>
          </div>

          <div className="px-1 py-2 sm:px-2 sm:py-2.5">
            <CategoryCarousel products={categoryProducts} />
          </div>
        </section>
      </Suspense>
    </ErrorBoundary>
  );
}

export default CategoryList;
