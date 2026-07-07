"use client";

import { Table } from "@tanstack/react-table";
import { X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnKey: string;
  filterKeys: Array<string>;
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
          filter.id === key &&
          filter.value !== undefined &&
          filter.value !== "",
      ),
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex flex-1 items-center gap-2">
        <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={(table.getColumn(columnKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            handleInputChange({ key: columnKey, value: event.target.value })
          }
          className="h-9 pl-9 sm:max-w-xs"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-9 shrink-0 gap-1 px-2 text-muted-foreground"
          >
            Reset
            <X className="size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
