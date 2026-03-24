import React from "react";
import LargeCard from "./LargeCard";

import { SalesProps } from "@/types/dashboard";

function LargeCardGroups({
  sales,
}: {
  sales: SalesProps["sales"] | undefined;
}) {
  const allSales = sales ?? [];

  const today = new Date();

  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay(),
  );

  //Get today's sales
  const todaySales = allSales
    .filter((sale: { createdAt: Date; total: number }) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.toDateString() === today.toDateString();
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  //Get this week's sales
  const thisWeekSales = allSales
    .filter((sale: { createdAt: Date; total: number }) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisWeekStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  //Get this month's sales
  const thisMonthSales = allSales
    .filter((sale: { createdAt: Date; total: number }) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisMonthStart && saleDate <= today;
    })
    .reduce((acc, sale) => acc + sale.total, 0);

  //Get total sales
  const totalSales =
    allSales.reduce((acc, sale) => acc + sale.total, 0).toFixed(2) ?? 0;

  const salesStats = [
    {
      period: "Today Sales",
      sales: todaySales,
      color: "bg-green-600",
    },
    {
      period: "This week Sales",
      sales: thisWeekSales,
      color: "bg-blue-600",
    },
    {
      period: "This Month Sales",
      sales: thisMonthSales,
      color: "bg-orange-600",
    },
    {
      period: "All-Time Sales",
      sales: parseFloat(totalSales),
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-3.5 lg:py-8">
      {salesStats.map((item, i) => (
        <LargeCard key={i} data={item} />
      ))}
    </div>
  );
}

export default LargeCardGroups;
