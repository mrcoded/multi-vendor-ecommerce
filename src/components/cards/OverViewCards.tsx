import React from "react";

import AnalyticsCard from "./AnalyticsCard";

import { StoreProps } from "@/types/store";
import { VendorUIProps } from "@/types/vendors";
import { ProductFormData } from "@/types/products";

function OverViewCards({
  role,
  sales,
  stores,
  vendors,
  vendorId,
  products,
}: {
  role: string | undefined;
  products: ProductFormData[];
  vendorId?: string;
  stores: StoreProps[];
  vendors: VendorUIProps[];
  sales?: {
    total: number;
  }[];
}) {
  // Get the count of stores
  const totalVendorStores = stores
    ?.filter((store: { vendorId: string }) => store.vendorId === vendorId)
    .length.toString()
    .padStart(2, "0");

  const totalStores = stores?.length.toString().padStart(2, "0") ?? "0";

  // const totalStoresByRole = role === "ADMIN" ? totalStores : totalVendorStores;

  // Get the count of vendors
  const totalVendors = vendors?.length.toString().padStart(2, "0") ?? "0";

  // Get the count of products
  const productsCount = products.length.toString().padStart(2, "0") ?? "0";

  // Get the total sales
  const totalSales =
    sales
      ?.reduce((acc, sale) => acc + sale.total, 0)
      .toFixed(2)
      .padStart(2, "0") ?? "0";

  // Analytics data
  const analytics = [
    {
      title: "Total Products",
      count: productsCount,
      link: "/dashboard/products",
    },
    {
      title: "Total Stores",
      count: totalStores,
      link: "/dashboard/stores",
    },
    // If vendors exists, show Revenue. If not, show the fallback object.
    vendorId
      ? {
          title: "Total Revenue",
          count: totalSales,
          link: "/dashboard/sales",
        }
      : {
          title: "Total Vendors",
          count: totalVendors,
          link: "/dashboard/vendors",
        },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
      {analytics.map((item, index) => (
        <AnalyticsCard key={index} data={item} />
      ))}
    </div>
  );
}

export default OverViewCards;
