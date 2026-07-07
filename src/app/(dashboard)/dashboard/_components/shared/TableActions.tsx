import React from "react";

import { Download, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TableActions() {
  return (
    <div className="flex items-center justify-between gap-8 rounded-lg bg-card px-12 py-6">
      <Button variant="outline">
        <Download />
        Export
      </Button>

      <div className="grow">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <Search className="size-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            id="table-search"
            className="py-3 ps-10"
            placeholder="Search for items"
          />
        </div>
      </div>

      <Button variant="destructive">
        <Trash2 />
        Bulk delete
      </Button>
    </div>
  );
}

export default TableActions;
