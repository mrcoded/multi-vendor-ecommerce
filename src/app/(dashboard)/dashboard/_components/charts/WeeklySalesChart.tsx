"use client";

import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { SalesProps } from "@/types/dashboard";
import { OrderCardProps } from "@/types/order";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function WeeklySalesChart({
  sales = [],
  orders = [],
}: {
  sales: SalesProps["sales"];
  orders: OrderCardProps[];
}) {
  const [chartToDisplay, setChartToDisplay] = useState("sales");

  // Process Data using useMemo for performance
  const weeklyData = useMemo(() => {
    // Initialize buckets
    const salesBuckets = [0, 0, 0, 0]; // Sums
    const salesCounts = [0, 0, 0, 0]; // Counts for average
    const orderBuckets = [0, 0, 0, 0]; // Length/Counts

    // Process Sales (Averages)
    sales.forEach((item) => {
      const day = new Date(item.createdAt).getDate();
      let weekIndex = Math.floor((day - 1) / 7);
      if (weekIndex > 3) weekIndex = 3; // Handle 29th-31st as Week 4

      salesBuckets[weekIndex] += item.total || 0;
      salesCounts[weekIndex] += 1;
    });

    const averageSales = salesBuckets.map((sum, i) =>
      salesCounts[i] > 0 ? parseFloat((sum / salesCounts[i]).toFixed(2)) : 0,
    );

    // Process Orders (Length/Count)
    orders.forEach((item) => {
      const day = new Date(item.createdAt).getDate();
      let weekIndex = Math.floor((day - 1) / 7);
      if (weekIndex > 3) weekIndex = 3;

      orderBuckets[weekIndex] += 1;
    });

    return { averageSales, orderBuckets };
  }, [sales, orders]);

  const tabs = [
    {
      title: "Sales (Avg)",
      type: "sales",
      data: weeklyData.averageSales,
      borderColor: "hsl(25, 95%, 50%)",
      backgroundColor: "hsla(25, 95%, 50%, 0.15)",
    },
    {
      title: "Orders",
      type: "orders",
      data: weeklyData.orderBuckets,
      borderColor: "hsl(84 65% 38%)",
      backgroundColor: "hsla(84, 65%, 38%, 0.2)",
    },
  ];

  //Set Active Tab
  const activeTab = tabs.find((t) => t.type === chartToDisplay) || tabs[0];

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        fill: true,
        label: activeTab.title,
        data: activeTab.data,
        borderColor: activeTab.borderColor,
        backgroundColor: activeTab.backgroundColor,
        tension: 0.4,
      },
    ],
  };

  // Check if data exists
  const hasData = activeTab.data.some((val) => val > 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center lg:flex-col xl:flex-row">
        <h2 className="text-lg font-bold text-foreground">
          Performance Overview
        </h2>

        <div className="flex w-full rounded-lg bg-muted p-1 sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setChartToDisplay(tab.type)}
              className={`flex-1 rounded-md px-6 py-2 text-sm font-medium transition-all duration-200 sm:flex-none ${
                chartToDisplay === tab.type
                  ? "bg-card text-accent shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px] w-full">
        {hasData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
            }}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground">
            <p className="text-sm font-medium">
              No {activeTab.type} activity for this month
            </p>
            <p className="text-xs">
              Data will appear once orders are processed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeeklySalesChart;
