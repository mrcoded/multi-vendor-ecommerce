import React from "react";
import LargeCard from "./LargeCard";

function LargeCardGroups({ sales }: { sales: any }) {
  const today = new Date();

  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );

  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  //Get today's sales
  const todaySales = sales
    .filter((sale: { createdAt: Date }) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.toDateString() === today.toDateString();
    })
    .reduce((total: number, sale: { total: number }) => total + sale.total, 0);

  //Get this week's sales
  const thisWeekSales = sales
    .filter((sale: { createdAt: Date }) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisWeekStart && saleDate <= today;
    })
    .reduce((total: number, sale: { total: number }) => total + sale.total, 0);

  //Get this month's sales
  const thisMonthSales = sales
    .filter((sale: { createdAt: Date }) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= thisMonthStart && saleDate <= today;
    })
    .reduce((total: number, sale: { total: number }) => total + sale.total, 0);

  //Get total sales
  const totalSales =
    sales
      .reduce((total: number, sale: { total: number }) => total + sale.total, 0)
      .toFixed(2) ?? 0;

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
      sales: totalSales,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {salesStats.map((item, i) => (
        <LargeCard key={i} data={item} />
      ))}
    </div>
  );
}

export default LargeCardGroups;
