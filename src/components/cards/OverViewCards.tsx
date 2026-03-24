import React from "react";

import AnalyticsCard from "./AnalyticsCard";

import { StoreProps } from "@/types/store";
import { VendorProps } from "@/types/vendors";
import { ProductFormData } from "@/types/products";

function OverViewCards({
  sales,
  stores,
  vendors,
  vendorId,
  products,
}: {
  products: ProductFormData[] | undefined;
  vendorId?: string;
  stores: StoreProps[] | undefined;
  vendors?: VendorProps[];
  sales?: {
    total: number;
  }[];
}) {
  const allProducts = products ?? [];

  // Get the count of orders
  const totalStores = stores
    ?.filter((store: { vendorId: string }) => store.vendorId === vendorId)
    .length.toString()
    .padStart(2, "0");

  // Get the count of vendors
  const totalVendors = vendors?.length.toString().padStart(2, "0") ?? "0";

  // Get the count of products
  const productsCount = allProducts.length.toString().padStart(2, "0");

  // Get the total sales
  const totalSales = sales?.reduce((acc, sale) => acc + sale.total, 0) ?? 0;

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
    vendors
      ? {
          title: "Total Vendors",
          count: totalVendors,
          link: "/dashboard/vendors",
        }
      : {
          title: "Total Revenue",
          count: totalSales.toString(),
          link: "/dashboard/sales",
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
