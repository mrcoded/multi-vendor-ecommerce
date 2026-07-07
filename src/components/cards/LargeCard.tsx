import React from "react";
import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { StatVariant, statVariants } from "../../constants/stat-card-styles";

export interface LargeCardData {
  period: string;
  sales: string;
  icon: LucideIcon;
  variant: StatVariant;
}

function LargeCard({ data }: { data: LargeCardData }) {
  const { period, sales, icon: Icon, variant } = data;

  return (
    <Card className="hover-lift overflow-hidden">
      <CardContent className="flex items-center gap-4 p-4 sm:p-5">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            statVariants[variant],
          )}
        >
          <Icon className="size-5" aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {period}
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-3xl">
            ${sales}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default LargeCard;
