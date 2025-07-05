"use client";

import { RowDatas } from "@/types/table";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import DataColumn from "@/components/tables/DataTable/DataColumn";
import ImageColumn from "@/components/tables/DataTable/ImageColumn";
import SortableColumn from "@/components/tables/DataTable/SortableColumn";
import ActiveStatusColumn from "@/components/tables/DataTable/ActiveStatusColumn";

export const columns: ColumnDef<RowDatas>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "imageUrl",
    header: "Category Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DataColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const store = row.original;

      return (
        <ActiveStatusColumn
          title="store"
          endpoint={`stores/${store.id}`}
          editEndpoint={`stores/update/${store.id}`}
        />
      );
    },
  },
];
