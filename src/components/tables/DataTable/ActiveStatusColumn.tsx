import React, { useState } from "react";
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

import EditBtn from "@/components/buttons/EditBtn";
import DeleteBtn from "@/components/buttons/DeleteBtn";

import { UseMutationResult } from "@tanstack/react-query";

function ActiveStatusColumn({
  rowId,
  title,
  editPageRoute,
  deleteMutation,
}: {
  rowId: string;
  title: string;
  editPageRoute: string;
  deleteMutation?: UseMutationResult<any, any, any, any>;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Destructure the passed mutation
  const { mutate: onDelete, isPending } = deleteMutation ?? {};

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Pass the mutation trigger to the button */}
        {deleteMutation && (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DeleteBtn
              title={title}
              isDeleting={isPending ?? false}
              onDelete={() => {
                onDelete?.(rowId);
                setDropdownOpen(false);
                setDropdownOpen(false);
              }}
              onCancel={() => setDropdownOpen(false)}
            />
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <EditBtn editPageRoute={editPageRoute} title={title} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActiveStatusColumn;
