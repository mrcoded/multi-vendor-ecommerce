import React from "react";
import AnalyticsCard from "./AnalyticsCard";

function OverViewCards({
  sales,
  products,
}: {
  sales: {
    total: number;
  }[];
  products: number[];
}) {
  // Get the count of orders
  const salesCount = sales.length.toString().padStart(2, "0");
  // Get the count of products
  const productsCount = products.length.toString().padStart(2, "0");
  // Get the total sales
  const totalSales =
    sales.reduce(
      (total: number, sale: { total: number }) => total + sale.total,
      0,
    ) ?? 0;

  // Analytics data
  const analytics = [
    {
      title: "Products Revenue",
      count: productsCount,
      link: "/dashboard/products",
    },
    {
      title: "Sales Revenue",
      count: salesCount,
      link: "/dashboard/sales",
    },
    {
      title: "Total Revenue",
      count: totalSales.toString(),
      link: "/dashboard/sales",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {analytics.map((item, index) => (
        <AnalyticsCard key={index} data={item} />
      ))}
    </div>
  );
}

export default OverViewCards;
