import React from "react";
import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { StatVariant, statVariants } from "../../constants/stat-card-styles";

export interface SmallCardData {
  title: string;
  number: string;
  icon: LucideIcon;
  variant: StatVariant;
}

function SmallCard({ data }: { data: SmallCardData }) {
  const { title, number, icon: Icon, variant } = data;

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
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="mt-0.5 text-2xl font-bold tabular-nums tracking-tight text-foreground">
            {number}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default SmallCard;
