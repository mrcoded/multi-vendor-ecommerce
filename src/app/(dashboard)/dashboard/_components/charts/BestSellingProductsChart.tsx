"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function BestSellingProductsChart({ sales = [] }: { sales: any[] }) {
  const productData = useMemo(() => {
    const counts: Record<string, number> = {};

    // Count occurrences of each product title
    sales.forEach((sale) => {
      const title = sale.productTitle || "Unknown Product";
      counts[title] = (counts[title] || 0) + 1;
    });

    // Convert to array, sort by count descending, and take top 5
    const sortedProducts = Object.entries(counts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Change this to 4 or 5 as needed

    return {
      labels: sortedProducts.map((p) => p.title),
      values: sortedProducts.map((p) => p.count),
    };
  }, [sales]);

  const data = {
    labels:
      productData.labels.length > 0 ? productData.labels : ["No Products"],
    datasets: [
      {
        label: "Times Ordered",
        data: productData.values.length > 0 ? productData.values : [1],
        backgroundColor: [
          "rgba(132, 204, 22, 0.7)", // Lime (Rank 1)
          "rgba(34, 197, 94, 0.7)", // Green (Rank 2)
          "rgba(54, 162, 235, 0.7)", // Blue (Rank 3)
          "rgba(255, 206, 86, 0.7)", // Yellow (Rank 4)
          "rgba(255, 99, 132, 0.7)", // Pink (Rank 5)
        ],
        borderColor: [
          "rgba(132, 204, 22, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          color: "rgb(156, 163, 175)",
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw} orders`,
        },
      },
    },
  };

  return (
    <div className="dark:bg-slate-800 bg-white p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50">
          Best Selling Products
        </h2>
        <p className="text-sm text-slate-500">Based on all-time order volume</p>
      </div>

      <div className="h-[300px] md:h-[350px] w-full relative">
        {productData.labels.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-700">
            <p className="text-slate-400 text-sm">No order history available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BestSellingProductsChart;
