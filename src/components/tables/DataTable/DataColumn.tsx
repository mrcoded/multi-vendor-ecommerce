import React from "react";
import { Row } from "@tanstack/react-table";
import { RowDatas } from "@/types/table";

// This type is used to define the shape of our data.
function DataColumn({
  row,
  accessorKey,
}: {
  row: Row<RowDatas>;
  accessorKey: string;
}) {
  const createdAt = row.getValue(`${accessorKey}`) as string;
  const originalDate = new Date(createdAt);

  const day = originalDate.getDate();
  const month = originalDate.toLocaleString("default", { month: "short" });
  const year = originalDate.getFullYear();

  return <div className="line-clamp-1">{`${day} ${month}, ${year}`}</div>;
}

export default DataColumn;
