"use client";

import { RowDatas } from "@/types/table";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import DataColumn from "@/components/tables/DataTable/DataColumn";
import StatusColumn from "@/components/tables/DataTable/StatusColumn";
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
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusColumn row={row} accessorKey="status" />,
  },
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
          title="Vendor"
          endpoint={`vendors/${vendor.id}`}
          editEndpoint={`vendors/update/${vendor.id}`}
        />
      );
    },
  },
];
