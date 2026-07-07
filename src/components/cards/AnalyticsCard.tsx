import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function AnalyticsCard({
  data,
}: {
  data: { title: string; count: string | undefined; link: string };
}) {
  return (
    <Card className="hover-lift overflow-hidden">
      <CardHeader className="space-y-3 pb-3 text-center">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {data.title}
        </CardTitle>
        <p className="text-3xl font-bold tabular-nums text-foreground">
          {data.count ?? "0"}
        </p>
      </CardHeader>

      <div className="mx-4 h-px bg-border" />

      <CardContent className="pt-3">
        <Link
          href={data.link}
          className={cn(
            "group flex items-center justify-end gap-2 text-sm font-medium",
            "text-primary transition-colors hover:text-primary/80",
          )}
        >
          View More
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}

export default AnalyticsCard;
