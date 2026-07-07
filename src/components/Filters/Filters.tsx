import React from "react";
import { SlidersHorizontal } from "lucide-react";

import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Filters({
  slug,
  isSearch,
}: {
  slug: string | undefined;
  isSearch: boolean | undefined;
}) {
  return (
    <Card className="sticky top-24 overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/30 pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <SlidersHorizontal className="size-4 text-primary" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <PriceFilter slug={slug} isSearch={isSearch} />
        <BrandFilter />
      </CardContent>
    </Card>
  );
}

export default Filters;
