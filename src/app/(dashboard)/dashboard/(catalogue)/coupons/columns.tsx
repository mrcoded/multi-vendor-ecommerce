"use client";

import { RowDatas } from "@/types/table";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import DataColumn from "@/components/tables/DataTable/DataColumn";
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
    accessorKey: "couponCode",
    header: "Coupon Code",
    cell: ({ row }) => {
      const couponCode = row.getValue("couponCode") as string;

      return <div className="line-clamp-1">{couponCode}</div>;
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <DataColumn row={row} accessorKey="expiryDate" />,
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
      const coupon = row.original;

      return (
        <ActiveStatusColumn
          title="Coupon"
          endpoint={`coupons/${coupon.id}`}
          editEndpoint={`coupons/update/${coupon.id}`}
        />
      );
    },
  },
];
