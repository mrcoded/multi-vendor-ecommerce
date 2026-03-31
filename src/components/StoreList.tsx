import React from "react";

import StoreCarousel from "./carousels/StoreCarousel";
import { fetchAllStoresAction } from "@/lib/actions/store-actions";

async function StoreList() {
  const { data: stores } = await fetchAllStoresAction();
  const storesData = stores ?? [];

  return (
    <div className="text-white py-10 sm:py-16">
      {/* Store Slider */}
      <div className="bg-slate-50 dark:bg-lime-900 rounded-lg p-4">
        <h2 className="py-2 text-center text-lg sm:text-2xl text-slate-900 dark:text-slate-50 mb-4">
          Shop By Store
        </h2>
        <StoreCarousel stores={storesData} />
      </div>
    </div>
  );
}

export default StoreList;
