import { Suspense } from "react";

import { getAllStores } from "@/services/store-service";
import { serverRead } from "@/lib/api/resilient-read";

import StoreCarousel from "./carousels/StoreCarousel";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import StoreListSkeleton from "@/components/feedback/skeletons/StoreListSkeleton";

async function StoreList() {
  const stores = await serverRead(() => getAllStores(), {
    source: "home:stores",
  });

  if (!stores.length) return null;

  return (
    <ErrorBoundary variant="inline" showHomeLink={false} showToast>
      <Suspense fallback={<StoreListSkeleton />}>
        <section className="overflow-hidden py-4 sm:py-5">
          <div className="mb-3 flex items-center justify-center px-0.5 sm:mb-4">
            <h2 className="text-sm font-semibold text-foreground sm:text-base">
              Shop by Store
            </h2>
          </div>
          <StoreCarousel stores={stores} />
        </section>
      </Suspense>
    </ErrorBoundary>
  );
}

export default StoreList;
