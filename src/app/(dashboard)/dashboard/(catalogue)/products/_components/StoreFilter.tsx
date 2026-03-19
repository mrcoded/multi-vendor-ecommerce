import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StoreFilterProps } from "@/types/store";

export function StoreFilter({ stores, onStoreChange }: StoreFilterProps) {
  return (
    <div className="w-[150px] sm:w-[200px]">
      <Select onValueChange={onStoreChange} defaultValue="all">
        <SelectTrigger className="w-full bg-background text-primary">
          <SelectValue placeholder="Filter by Store" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="bg-muted">
            Remove Filter
          </SelectItem>
          {stores.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              {store.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
