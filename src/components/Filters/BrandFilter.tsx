import React from "react";
import { Tag } from "lucide-react";

function BrandFilter() {
  return (
    <div className="space-y-3 border-t border-border pt-4">
      <h3 className="text-sm font-semibold text-foreground">Brand</h3>
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-3 py-4">
        <Tag className="size-4 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Brand filters coming soon
        </p>
      </div>
    </div>
  );
}

export default BrandFilter;
