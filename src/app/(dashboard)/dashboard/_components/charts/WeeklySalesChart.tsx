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
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      title: "Orders",
      type: "orders",
      data: weeklyData.orderBuckets,
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.2)",
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
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-50">
          Performance Overview
        </h2>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-lg w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setChartToDisplay(tab.type)}
              className={`flex-1 sm:flex-none px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                chartToDisplay === tab.type
                  ? "bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
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
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400">
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
