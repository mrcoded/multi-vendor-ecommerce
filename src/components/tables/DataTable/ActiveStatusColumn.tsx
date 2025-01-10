import React from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Row } from "@tanstack/react-table";
import { RowDatas } from "@/app/dashboard/(catalogue)/categories/columns";

import EditBtn from "@/components/buttons/EditBtn";
import DeleteBtn from "@/components/buttons/DeleteBtn";

function ActiveStatusColumn({
  row,
  title,
  endpoint,
  editEndpoint,
}: {
  row: Row<RowDatas>;
  title: string;
  endpoint?: string;
  editEndpoint: string;
}) {
  // const isActive = row.isActive;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteBtn endpoint={endpoint} title={title} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EditBtn editEndpoint={editEndpoint} title={title} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActiveStatusColumn;
