import React from "react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";

function SortableColumn({
  column,
  title,
}: {
  column: Column<any, unknown> & { toggleSorting: () => void };
  title: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default SortableColumn;
