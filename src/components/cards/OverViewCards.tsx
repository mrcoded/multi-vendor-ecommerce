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
  const salesCount = sales.length.toString().padStart(2, "0");
  const productsCount = products.length.toString().padStart(2, "0");

  const totalSales =
    sales.reduce(
      (total: number, sale: { total: number }) => total + sale.total,
      0
    ) ?? 0;

  const analytics = [
    {
      title: "Products Revenue",
      count: productsCount,
      unit: "",
      link: "/dashboard/products",
      icon: "",
    },
    {
      title: "Sales Revenue",
      count: salesCount,
      unit: "",
      link: "/dashboard/sales",
      icon: "",
    },
    {
      title: "Total Revenue",
      count: totalSales.toString(),
      unit: "",
      link: "/dashboard/sales",
      icon: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {analytics.map((item, index) => (
        <AnalyticsCard key={index} data={item} />
      ))}
    </div>
  );
}

export default OverViewCards;
