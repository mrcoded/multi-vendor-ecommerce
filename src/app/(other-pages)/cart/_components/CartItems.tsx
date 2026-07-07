import React from "react";
import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import EmptyCart from "./EmptyCart";
import CartProduct from "./CartProduct";

interface ItemProps {
  cartItems: {
    id: string;
    title: string;
    imageUrl: string;
    qty: number;
    salePrice: number;
  }[];
  itemCount: number;
}

function CartItems({ cartItems, itemCount }: ItemProps) {
  const hasItems = cartItems.length > 0;

  return (
    <div className="lg:col-span-8">
      {hasItems ? (
        <div className="space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-none">
            <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border bg-muted/30 px-4 py-3 sm:px-5">
              <CardTitle className="text-sm font-semibold text-foreground sm:text-base">
                Your items
              </CardTitle>
              <Badge variant="primary" className="text-[11px] font-medium">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
            </CardHeader>

            <CardContent className="divide-y divide-border p-0">
              {cartItems.map((item) => (
                <CartProduct cartItem={item} key={item.id} />
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-none">
            <CardContent className="p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-md bg-secondary text-primary">
                  <Tag className="size-3.5" />
                </span>
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Promo code
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Enter a code to apply a discount at checkout
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  type="text"
                  placeholder="e.g. SAVE10"
                  className="h-9 bg-background sm:flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full shrink-0 sm:w-auto"
                >
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default CartItems;
