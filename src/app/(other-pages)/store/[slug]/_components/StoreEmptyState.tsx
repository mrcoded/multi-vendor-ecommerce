import Link from "next/link";
import { PackageOpen, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

function StoreEmptyState({ storeTitle }: { storeTitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-4 py-10 text-center sm:py-14">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <PackageOpen className="size-7 text-muted-foreground" />
      </div>

      <h2 className="text-base font-semibold text-foreground sm:text-lg">
        No products yet
      </h2>

      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground sm:text-sm">
        {storeTitle
          ? `${storeTitle} hasn't listed any products yet. Check back soon or explore other stores.`
          : "This store hasn't listed any products yet. Check back soon."}
      </p>

      <Button variant="outline" size="sm" className="mt-5" asChild>
        <Link href="/">
          <ArrowLeft className="size-3.5" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}

export default StoreEmptyState;
