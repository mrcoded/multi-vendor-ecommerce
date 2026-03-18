import React from "react";
import { LucideIcon } from "lucide-react";

// Helper component for summary rows
const SummaryItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | string[];
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
    <div className="mt-1 p-1.5 bg-white dark:bg-slate-700 rounded-md shadow-sm">
      <Icon className="size-3 sm:size-4 text-lime-600 dark:text-lime-400" />
    </div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {Array.isArray(value) ? value.join(", ") : value || "N/A"}
      </p>
    </div>
  </div>
);

export default SummaryItem;
