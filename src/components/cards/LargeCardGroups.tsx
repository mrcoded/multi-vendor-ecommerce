import React from "react";
import {
  CalendarDays,
  CalendarRange,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import { SalesProps } from "@/types/dashboard";

import LargeCard from "./LargeCard";

type SaleRecord = { createdAt: Date; total: number };

function sumSalesInRange(sales: SaleRecord[], start: Date, end: Date) {
  return sales
    .filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= start && saleDate <= end;
    })
    .reduce((acc, sale) => acc + sale.total, 0)
    .toFixed(2);
}

function LargeCardGroups({ sales }: { sales: SalesProps["sales"] }) {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay(),
  );

  const todaySales = sumSalesInRange(sales, todayStart, today);
  const thisWeekSales = sumSalesInRange(sales, thisWeekStart, today);
  const thisMonthSales = sumSalesInRange(sales, thisMonthStart, today);
  const totalSales = sales
    .reduce((acc, sale) => acc + sale.total, 0)
    .toFixed(2);

  const salesStats = [
    {
      period: "Today's Sales",
      sales: todaySales,
      icon: DollarSign,
      variant: "primary" as const,
    },
    {
      period: "This Week",
      sales: thisWeekSales,
      icon: CalendarDays,
      variant: "secondary" as const,
    },
    {
      period: "This Month",
      sales: thisMonthSales,
      icon: CalendarRange,
      variant: "accent" as const,
    },
    {
      period: "All-Time Revenue",
      sales: totalSales,
      icon: TrendingUp,
      variant: "muted" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {salesStats.map((item) => (
        <LargeCard key={item.period} data={item} />
      ))}
    </div>
  );
}

export default LargeCardGroups;
