import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getStoreBySlug } from "@/services/store-service";
import { getAllCategories } from "@/services/category-service";

import { buildPageMetadata } from "@/lib/seo";
import Loading from "@/app/loading";

import { CategoryProps } from "@/types/category";

import StorePageContent from "./_components/StorePageContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const store = await getStoreBySlug(slug);

  if (!store) {
    return {
      title: "Store Not Found",
    };
  }

  return buildPageMetadata({
    title: `${store.title} | BelStore Market`,

    description: store.description,

    path: `/store/${store.slug}`,
    image: store.imageUrl,
  });
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [store, categoriesData] = await Promise.all([
    getStoreBySlug(slug),

    getAllCategories(),
  ]);

  if (!store) {
    notFound();
  }

  const storeCategoryIds = store.categoryIds;

  const storeCategories =
    categoriesData?.filter((category: CategoryProps) => {
      if (!storeCategoryIds?.includes(category.id)) return false;

      return category.products.some((product) => product.storeId === store.id);
    }) ?? [];

  const productCount = storeCategories.reduce((total, category) => {
    const storeProducts =
      category.products?.filter((product) => product.storeId === store.id) ??
      [];

    return total + storeProducts.length;
  }, 0);

  return (
    <div className="animate-fade-in space-y-5 pb-8 sm:space-y-6">
      <Suspense fallback={<Loading />}>
        <StorePageContent
          store={store}
          storeCategories={storeCategories}
          productCount={productCount}
        />
      </Suspense>
    </div>
  );
}

export default Page;
