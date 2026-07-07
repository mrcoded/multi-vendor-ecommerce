import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Store, Tag, Truck } from "lucide-react";

import { ProductFormData, ProductProp } from "@/types/products";

import { Badge } from "@/components/ui/badge";
import BreadCrumb from "@/components/BreadCrumb";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import ProductImageGallery from "./ProductImageGallery";
import ProductShareButton from "./ProductShareButton";
import SimilarProducts from "./SimilarProducts";

type ProductWithRelations = ProductFormData & {
  store?: { id: string; title: string; slug: string } | null;
  category?: { id: string; title: string; slug: string } | null;
};

const ProductDetail = ({
  product,
  similarProducts = [],
}: {
  product: ProductWithRelations;
  similarProducts?: ProductProp[];
}) => {
  const hasDiscount = product.productPrice > product.salePrice;
  const hasMultipleImages = (product.productImages?.length ?? 0) > 1;
  const heroImage = product.productImages?.[0] ?? product.imageUrl;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.productPrice - product.salePrice) / product.productPrice) *
          100,
      )
    : 0;

  const inStock = product.qty > 0;

  return (
    <article className="overflow-x-hidden">
      <BreadCrumb
        labels={{ [product.slug]: product.title }}
        hiddenSegments={["products"]}
        className="hidden sm:flex pt-5"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-[5.5rem] lg:self-start">
          {hasMultipleImages ? (
            <ProductImageGallery
              thumbnail={product.imageUrl}
              productImages={product.productImages}
              title={product.title}
            />
          ) : (
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted/20">
              <Image
                src={heroImage}
                alt={product.title}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain p-3 sm:p-6"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {product.category && (
              <Link
                href={`/category/${product.category.slug}`}
                className="text-xs font-medium uppercase tracking-wide text-primary hover:underline"
              >
                {product.category.title}
              </Link>
            )}
            {product.store && (
              <Link
                href={`/store/${product.store.slug}`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Store className="size-3.5" />
                {product.store.title}
              </Link>
            )}
          </div>

          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-3">
              <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {product.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={inStock ? "primary" : "outline"}
                  className={
                    !inStock ? "border-destructive/30 text-destructive" : ""
                  }
                >
                  {inStock ? `In Stock (${product.qty})` : "Out of Stock"}
                </Badge>
                {product.sku && (
                  <Badge variant="outline">SKU: {product.sku}</Badge>
                )}
              </div>
            </div>

            <ProductShareButton
              urlToShare={`/products/${product.slug}`}
              title={product.title}
            />
          </div>

          <div className="flex flex-col gap-3 border-y border-border py-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
                ${product.salePrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <del className="text-lg text-muted-foreground">
                  ${product.productPrice.toFixed(2)}
                </del>
              )}
            </div>

            {hasDiscount && discountPercent > 0 && (
              <p className="flex items-center text-sm font-medium text-accent">
                <Tag className="mr-1.5 size-4" />
                Save {discountPercent}% today
              </p>
            )}
          </div>

          <div className="mt-6">
            <AddToCartButton
              product={product}
              disabled={!inStock}
              className="h-11 w-full px-6 text-sm sm:w-auto"
            />
          </div>

          {product.description && (
            <div className="mt-8">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                Description
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {product.description}
              </p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
              <Truck className="size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Free Delivery
                </p>
                <p className="text-xs text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
              <ShieldCheck className="size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Secure Checkout
                </p>
                <p className="text-xs text-muted-foreground">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section
          className="mt-12 overflow-hidden"
          aria-label="Similar products"
        >
          <SimilarProducts products={similarProducts} />
        </section>
      )}
    </article>
  );
};

export default ProductDetail;
