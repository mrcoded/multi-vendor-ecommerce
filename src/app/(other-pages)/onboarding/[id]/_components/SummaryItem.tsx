import React from "react";
import { LucideIcon } from "lucide-react";

const SummaryItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | string[];
}) => (
  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-3.5 transition-colors hover:bg-muted/60">
    <div className="mt-0.5 rounded-md bg-card p-1.5 shadow-sm ring-1 ring-border">
      <Icon className="size-3.5 text-primary" aria-hidden />
    </div>
    <div className="min-w-0 flex-1">
      <p className="mb-1 text-[10px] font-medium uppercase leading-none tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="break-words text-sm font-semibold text-foreground">
        {Array.isArray(value) ? value.join(", ") : value || "N/A"}
      </p>
    </div>
  </div>
);

export default SummaryItem;
