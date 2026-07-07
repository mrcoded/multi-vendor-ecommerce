"use client";

import React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { OrderStatusManagerProps } from "@/types/order";

const statusMap: Record<string, string> = {
  DELIVERED: "bg-primary/10 text-primary border-primary/30",
  PENDING: "bg-accent/10 text-accent border-accent/30",
  PROCESSING: "bg-secondary text-secondary-foreground border-border",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/30",
  SHIPPED: "bg-muted text-foreground border-border",
};

export function OrderStatusManager({
  currentStatus,
  options,
  onStatusChange,
  isUpdating = false,
}: OrderStatusManagerProps) {
  const { data: session } = useSession();

  const colorClass =
    statusMap[currentStatus.toUpperCase()] ||
    "bg-muted text-muted-foreground border-border";

  const canUpdate = session?.user?.role !== "USER";

  return (
    <div className="flex shrink-0 flex-col items-end gap-2">
      <span
        className={cn(
          "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
          colorClass,
        )}
      >
        {currentStatus}
      </span>

      {canUpdate && (
        <Select onValueChange={onStatusChange} disabled={isUpdating}>
          <SelectTrigger className="h-8 w-[130px] border-border bg-card text-xs">
            {isUpdating ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <SelectValue placeholder="Update status" />
            )}
          </SelectTrigger>

          <SelectContent align="end">
            {options
              .filter((option) => option.id !== currentStatus)
              .map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.id}
                  className="text-xs"
                >
                  {option.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
