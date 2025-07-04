"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnKey: string;
  filterKeys: Array<string>; // Ensure filterKeys are valid keys of TData and strings
}

export function DataTableToolbar<TData>({
  table,
  columnKey,
  filterKeys,
}: DataTableToolbarProps<TData>) {
  const isFiltered = filterKeys?.some((key) =>
    table
      .getState()
      .columnFilters?.some(
        (filter) =>
          filter.id === key && filter.value !== undefined && filter.value !== ""
      )
  );

  const handleInputChange = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    filterKeys.forEach((key) => {
      table.getColumn(key)?.setFilterValue("");
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn(columnKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            handleInputChange({ key: columnKey, value: event.target.value })
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
