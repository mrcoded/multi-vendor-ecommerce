import React from "react";
import { ArrowUpDown } from "lucide-react";

import { RowDatas } from "@/types/table";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";

function SortableColumn({
  column,
  title,
}: {
  column: Column<RowDatas, unknown> & { toggleSorting: () => void };
  title: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      <p className="line-clamp-1 truncate">{title}</p>
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default SortableColumn;
