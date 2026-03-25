"use client";

import React from "react";
import { Loader2 } from "lucide-react";

import { Row } from "@tanstack/react-table";

import { RowDatas } from "@/types/table";

import { useUpdateVendorStatus } from "@/hooks/useVendor";

function StatusColumn({
  row,
  accessorKey,
}: {
  row: Row<RowDatas>;
  accessorKey: string;
}) {
  const userId = row.original.id;
  const currentStatus = !!row.getValue(accessorKey);

  // Using our optimized mutation hook
  const { mutate, isPending } = useUpdateVendorStatus();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value === "true";
    mutate({ id: userId, status: newStatus });
  };

  // Border logic based on your previous style
  const selectBorderStyle = {
    borderColor: currentStatus ? "#22c55e" : "#ef4444",
  };

  return (
    <div className="min-w-[150px]">
      {isPending ? (
        <div className="flex items-center gap-2 px-2.5 py-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Changing...</span>
        </div>
      ) : (
        <select
          id={`status-${userId}`}
          className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500 cursor-pointer"
          style={selectBorderStyle}
          value={currentStatus.toString()}
          onChange={handleChange}
        >
          <option value="true">APPROVED</option>
          <option value="false">PENDING</option>
        </select>
      )}
    </div>
  );
}

export default StatusColumn;
