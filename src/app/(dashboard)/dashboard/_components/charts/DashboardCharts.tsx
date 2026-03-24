import React from "react";
import WeeklySalesChart from "./WeeklySalesChart";
import BestSellingProductsChart from "./BestSellingProductsChart";

import { SalesProps } from "@/types/dashboard";
import { OrderCardProps } from "@/types/order";

function DashboardCharts({
  orders,
  sales,
}: {
  orders?: OrderCardProps[];
  sales?: SalesProps["sales"];
}) {
  const allOrders = orders ?? [];
  const allSales = sales ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <WeeklySalesChart orders={allOrders} sales={allSales} />
      <BestSellingProductsChart sales={sales} />
    </div>
  );
}

export default DashboardCharts;
