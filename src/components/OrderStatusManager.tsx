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
} from "@/components/ui/select";

import { OrderStatusManagerProps } from "@/types/order";

const statusMap: Record<string, string> = {
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
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
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* THE CURRENT STATUS BADGE*/}
      <span
        className={cn(
          "px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide",
          colorClass,
        )}
      >
        {currentStatus}
      </span>

      {session?.user?.role !== "USER" && (
        <Select onValueChange={onStatusChange} disabled={isUpdating} value="">
          <SelectTrigger className="h-5 w-auto rounded-full bg-slate-50 px-2 border-slate-200 text-[9px] font-medium text-slate-500 hover:bg-slate-100 transition-colors focus:ring-0 focus:ring-offset-0">
            <div className="flex items-center gap-1 uppercase tracking-tighter">
              {isUpdating ? (
                <Loader2 className="h-2.5 w-2.5 animate-spin" />
              ) : (
                <span>Change</span>
              )}
            </div>
          </SelectTrigger>

          <SelectContent align="end" className="min-w-[120px]">
            {options.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                className="text-xs py-1.5"
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
