import React from "react";
import AnalyticsCard from "./AnalyticsCard";

function OverViewCards({
  sales,
  products,
  stores,
  vendors,
  vendorId,
}: {
  vendorId?: string;
  stores: Array<{ vendorId: string }>;
  vendors?: number[];
  sales?: {
    total: number;
  }[];
  products: number[];
}) {
  // Get the count of orders
  const totalStores = stores
    .filter((store: { vendorId: string }) => store.vendorId === vendorId)
    .length.toString()
    .padStart(2, "0");
  // Get the count of vendors
  const totalVendors = vendors?.length.toString().padStart(2, "0") ?? "0";
  // Get the count of products
  const productsCount = products.length.toString().padStart(2, "0");
  // Get the total sales
  const totalSales =
    sales?.reduce(
      (total: number, sale: { total: number }) => total + sale.total,
      0,
    ) ?? 0;

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
