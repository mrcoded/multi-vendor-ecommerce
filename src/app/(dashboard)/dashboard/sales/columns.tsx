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
    accessorKey: "productImageUrl",
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="productImageUrl" />,
  },
  {
    accessorKey: "productTitle",
    header: ({ column }) => (
      <SortableColumn column={column} title="Product Title" />
    ),
  },
  { accessorKey: "productPrice", header: "Price" },
  { accessorKey: "productQty", header: "Qty" },
  { accessorKey: "total", header: "Total" },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DataColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vendor = row.original;

      return (
        <ActiveStatusColumn
          row={row}
          title="Vendor"
          endpoint={`customer/${vendor.id}`}
          editEndpoint={`customer/update/${vendor.id}`}
        />
      );
    },
  },
];
