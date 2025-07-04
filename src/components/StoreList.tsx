import React from "react";

import getData from "@/lib/getData";
import StoreCarousel from "./carousels/StoreCarousel";

async function StoreList() {
  const stores = await getData("stores");

  return (
    <div className="text-white py-16">
      {/* Store Slider */}
      <div className="bg-slate-50 dark:bg-lime-900 rounded-lg p-4">
        <h2 className="py-2 text-center text-2xl text-slate-900 dark:text-slate-50 mb-4">
          Shop By Store
        </h2>
        <StoreCarousel stores={stores} />
      </div>
    </div>
  );
}

export default StoreList;
