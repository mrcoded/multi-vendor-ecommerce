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
    <div className="w-full sm:w-[220px]">
      <Select onValueChange={onStoreChange} defaultValue="all">
        <SelectTrigger className="h-9 w-full">
          <SelectValue placeholder="All stores" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All stores</SelectItem>
          {stores?.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              {store.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
