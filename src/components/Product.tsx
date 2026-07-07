import React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ProductProp } from "@/types/products";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AddToCartButton from "@/components/buttons/AddToCartButton";

function formatPrice(price: number) {
  return Number.isInteger(price) ? `${price}` : price.toFixed(2);
}

function Product({
  product,
  className,
  style,
  compact = false,
}: {
  product: ProductProp;
  className?: string;
  style?: React.CSSProperties;
  compact?: boolean;
}) {
  const hasDiscount =
    product.productPrice != null && product.productPrice > product.salePrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.productPrice! - product.salePrice) / product.productPrice!) *
          100,
      )
    : 0;

  return (
    <Card
      data-product-card
      className={cn(
        "group flex h-full flex-col overflow-hidden border-border/80 bg-card shadow-none transition-shadow duration-300 hover:border-border hover:shadow-md",
        compact && "rounded-md",
        className,
      )}
      style={style}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block shrink-0 overflow-hidden bg-muted"
      >
        <div
          className={cn(
            "relative w-full",
            compact ? "h-28 sm:h-36 lg:h-48" : "h-32 sm:h-40 lg:h-48",
          )}
        >
          <Image
            src={product.imageUrl ?? ""}
            alt={product.title}
            width={556}
            height={556}
            sizes={
              compact
                ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            }
            loading="lazy"
            className="image-zoom size-full object-cover"
          />
        </div>

        {hasDiscount && discountPercent > 0 && (
          <Badge
            variant="accent"
            className="absolute left-1.5 top-1.5 z-10 rounded-full border-0 bg-accent px-1.5 py-0.5 text-[9px] font-bold text-accent-foreground shadow-sm sm:left-2 sm:top-2 sm:px-2 sm:text-xs"
          >
            -{discountPercent}%
          </Badge>
        )}
      </Link>

      <CardContent
        className={cn(
          "flex flex-1 flex-col justify-between gap-1.5 sm:gap-2",
          compact ? "p-2 sm:p-2.5 lg:p-3" : "p-2 sm:p-3 lg:p-3.5",
        )}
      >
        <Link
          href={`/products/${product.slug}`}
          className={cn(
            "block",
            compact
              ? "min-h-[1.75rem] sm:min-h-[2.25rem]"
              : "min-h-[2rem] sm:min-h-[2.75rem]",
          )}
        >
          <h2
            className={cn(
              "line-clamp-2 font-medium leading-snug text-card-foreground hover:text-primary",
              compact
                ? "text-[11px] sm:text-xs lg:text-sm"
                : "text-xs sm:text-sm lg:text-base",
            )}
          >
            {product.title}
          </h2>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-1.5 sm:gap-2">
          <div className="min-w-0 space-y-0.5">
            <p className="truncate text-xs font-semibold tabular-nums text-foreground sm:text-sm lg:text-base">
              ${formatPrice(product.salePrice)}
            </p>
            {hasDiscount && product.productPrice != null && (
              <del className="block text-[10px] tabular-nums tracking-tighter text-muted-foreground sm:text-sm">
                ${formatPrice(product.productPrice)}
              </del>
            )}
          </div>

          <AddToCartButton product={product} compact={compact} />
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;
