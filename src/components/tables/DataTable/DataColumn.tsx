import React from "react";
import { Row } from "@tanstack/react-table";
import { RowDatas } from "@/types/table";

function DataColumn({
  row,
  accessorKey,
}: {
  row: Row<RowDatas>;
  accessorKey: keyof RowDatas; // 🎯 Better type safety
}) {
  // Get the value directly as a Date or string
  const rawValue = row.getValue(accessorKey);

  if (!rawValue) return <div className="text-slate-400">N/A</div>;

  // Convert to Date safely (handles both Date objects and ISO strings)
  const date =
    rawValue instanceof Date ? rawValue : new Date(rawValue as string);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return (
    <div className="line-clamp-1 font-medium text-slate-700 dark:text-slate-300">
      {`${day} ${month}, ${year}`}
    </div>
  );
}

export default DataColumn;
