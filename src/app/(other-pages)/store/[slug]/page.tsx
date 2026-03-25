import React, { Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";

import { CategoryProps } from "@/types/category";

import BreadCrumb from "@/components/BreadCrumb";
import StoreDetails from "./_components/StoreDetails";
import CategoryList from "../../category/_components/CategoryList";

import { fetchStoreBySlugAction } from "@/lib/actions/store-actions";
import { fetchAllCategoriesAction } from "@/lib/actions/category-actions";

interface Props {
  params: Promise<{ slug: string }>;
}

//This function handles the SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: store } = await fetchStoreBySlugAction(slug);

  if (!store) {
    return {
      title: "Store Not Found",
    };
  }

  return {
    title: `${store.title} | Belstore Market`,
    description: store.description,
    openGraph: {
      title: store.title,
      description: store.description || "Store description",
      url: `${process.env.NEXT_PUBLIC_URL}/store/${store.slug}`,
      siteName: " Belstore Market",
      images: [
        {
          url: store.imageUrl || "/default-store-banner.jpg",
          width: 1200,
          height: 630,
          alt: store.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: store.title,
      description: store.description || "Store description",
      images: [store.imageUrl || "/default-store-banner.jpg"],
    },
  };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: store } = await fetchStoreBySlugAction(slug);
  const storeCategoriyIds = store?.categoryIds;

  //Get Categories
  const { data: categoriesData } = await fetchAllCategoriesAction();

  //get store categories
  const storeCategories = categoriesData?.filter((category: CategoryProps) => {
    return storeCategoriyIds?.includes(category.id);
  });

  return (
    <>
      <BreadCrumb />
      <Suspense fallback={<Loading />}>
        <StoreDetails store={store} />
        <div className="grid grid-cols-12 gap-6 py-8 w-full">
          <div className="space-y-5 md:space-y-8 col-span-full sm:col-span-12 rounded-md">
            {storeCategories?.map((category: CategoryProps) => {
              return (
                <div key={category.id}>
                  <CategoryList
                    storeId={store?.id}
                    isStorePage={true}
                    category={category}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Page;
