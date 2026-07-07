import type { Metadata } from "next";

import FilterComponent from "@/components/Filters/FilterComponent";
import { getFilteredProducts } from "@/services/product-service";
import { noIndexMetadata } from "@/lib/seo";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const search = (params.search as string) || "";
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value) {
      query.set(key, value);
    }
  }

  const path = query.size ? `/search?${query.toString()}` : "/search";

  return noIndexMetadata(
    search ? `Search: ${search}` : "Search Products",
    search
      ? `Browse products matching "${search}" on BelStore.`
      : "Search BelStore for products across all vendors and categories.",
    path,
  );
}

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const sort = (params.sort as "asc" | "desc") || "asc";
  const min = (params.min as string) || "0";
  const max = (params.max as string) || "";
  const page = (params.page as string) || "1";
  const search = (params.search as string) || "";

  const products = await getFilteredProducts({
    search,
    page,
    sort,
    min,
    max,
  });

  const category = {
    title: search,
    slug: "",
    products: [],
    isSearch: true,
  };

  return (
    <div className="container mx-auto py-8">
      <FilterComponent category={category} products={products} />
    </div>
  );
}

export default Page;
