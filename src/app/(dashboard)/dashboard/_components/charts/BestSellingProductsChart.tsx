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
import { SalesProps } from "@/types/dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  "hsla(84, 65%, 38%, 0.85)",
  "hsla(25, 95%, 50%, 0.85)",
  "hsla(84, 40%, 55%, 0.85)",
  "hsla(25, 80%, 60%, 0.85)",
  "hsla(0, 0%, 60%, 0.85)",
];

const CHART_BORDERS = [
  "hsl(84, 65%, 38%)",
  "hsl(25, 95%, 50%)",
  "hsl(84, 40%, 55%)",
  "hsl(25, 80%, 60%)",
  "hsl(0, 0%, 60%)",
];

function BestSellingProductsChart({
  sales = [],
}: {
  sales: SalesProps["sales"] | undefined;
}) {
  const productData = useMemo(() => {
    const counts: Record<string, number> = {};

    sales.forEach((sale) => {
      const title = sale.productTitle || "Unknown Product";
      counts[title] = (counts[title] || 0) + 1;
    });

    const sortedProducts = Object.entries(counts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

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
        backgroundColor: CHART_COLORS,
        borderColor: CHART_BORDERS,
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
          color: "hsl(var(--muted-foreground))",
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
    <div className="h-full rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Best Selling Products
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on all-time order volume
        </p>
      </div>

      <div className="relative h-[300px] w-full md:h-[350px]">
        {productData.labels.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              No order history available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BestSellingProductsChart;
