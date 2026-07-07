import Link from "next/link";
import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function EmptyCart() {
  return (
    <Card className="mx-auto max-w-md border-border/80 shadow-none">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:py-16">
        <div className="relative mb-5">
          <div className="absolute inset-0 scale-150 rounded-full bg-primary/15 blur-2xl" />
          <div className="relative flex size-20 items-center justify-center rounded-2xl border border-border bg-secondary/80">
            <ShoppingBag className="size-9 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          Your cart is empty
        </h2>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Browse our catalog and add items you love — they&apos;ll show up here
          when you&apos;re ready to checkout.
        </p>

        <Button asChild variant="accent" size="sm" className="mt-6">
          <Link href="/">
            Browse products
            <ArrowRight className="size-4" />
          </Link>
        </Button>

        <p className="mt-8 text-xs text-muted-foreground">
          Need help?{" "}
          <Link
            href="#"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default EmptyCart;
