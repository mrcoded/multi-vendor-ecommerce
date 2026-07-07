import React from "react";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Package,
  LayoutGrid,
  Store,
} from "lucide-react";

import { StoreProps } from "@/types/store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StoreDetailsProps {
  store?: StoreProps;
  productCount?: number;
  categoryCount?: number;
}

const StoreDetails = ({
  store,
  productCount = 0,
  categoryCount = 0,
}: StoreDetailsProps) => {
  const whatsappNumber = store?.storePhone?.replace(/\D/g, "");
  const hasWhatsApp = Boolean(whatsappNumber);

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Cover */}
      <div className="relative h-20 overflow-hidden sm:h-24">
        {store?.imageUrl ? (
          <Image
            src={store.imageUrl}
            alt=""
            fill
            unoptimized
            className="object-cover blur-sm brightness-75"
            aria-hidden
          />
        ) : (
          <div className="size-full bg-gradient-to-r from-primary/15 via-secondary to-accent/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />
      </div>

      <div className="relative px-3 pb-4 sm:px-5 sm:pb-5">
        {/* Identity row */}
        <div className="-mt-10 flex flex-col gap-3 sm:-mt-11 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 items-end gap-3">
            <div className="relative shrink-0">
              <Image
                src={store?.imageUrl || "/assets/icon.png"}
                width={80}
                height={80}
                unoptimized
                alt={store?.title ?? "Store"}
                className="size-16 rounded-xl border-2 border-card object-cover shadow-md ring-1 ring-border sm:size-20"
              />
              <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <Store className="size-2.5" />
              </span>
            </div>

            <div className="min-w-0 space-y-1 pb-0.5">
              <h1 className="truncate text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                {store?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="primary"
                  className="gap-1 px-2 py-0 text-[10px] sm:text-xs"
                >
                  <MapPin className="size-2.5" />
                  {store?.city}, {store?.country}
                </Badge>
              </div>
            </div>
          </div>

          {hasWhatsApp && (
            <Button
              variant="accent"
              size="sm"
              asChild
              className="h-8 shrink-0 self-start px-3 text-xs sm:self-auto sm:h-9 sm:px-4 sm:text-sm"
            >
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="size-3.5 sm:size-4" />
                <span className="hidden sm:inline">Chat on WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Stats */}
        {(productCount > 0 || categoryCount > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {productCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                <Package className="size-3.5 text-primary" />
                <span>
                  <strong className="font-semibold text-foreground">
                    {productCount}
                  </strong>{" "}
                  {productCount === 1 ? "Product" : "Products"}
                </span>
              </span>
            )}
            {categoryCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                <LayoutGrid className="size-3.5 text-primary" />
                <span>
                  <strong className="font-semibold text-foreground">
                    {categoryCount}
                  </strong>{" "}
                  {categoryCount === 1 ? "Category" : "Categories"}
                </span>
              </span>
            )}
          </div>
        )}

        {/* Description */}
        {store?.description && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-sm">
            {store.description}
          </p>
        )}

        {/* Contact strip */}
        <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
          {store?.storePhone && (
            <ContactChip
              href={`tel:${store.storePhone}`}
              icon={Phone}
              label={store.storePhone}
            />
          )}
          {store?.storeEmail && (
            <ContactChip
              href={`mailto:${store.storeEmail}`}
              icon={Mail}
              label={store.storeEmail}
            />
          )}
          {store?.streetAddress && (
            <ContactChip
              icon={MapPin}
              label={store.streetAddress}
              className="max-w-full sm:max-w-xs"
            />
          )}
        </div>
      </div>
    </section>
  );
};

function ContactChip({
  href,
  icon: Icon,
  label,
  className,
}: {
  href?: string;
  icon: React.ElementType;
  label: string;
  className?: string;
}) {
  const content = (
    <>
      <Icon className="size-3 shrink-0 text-primary" />
      <span className="truncate">{label}</span>
    </>
  );

  const baseClass = cn(
    "inline-flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-[11px] font-medium text-foreground transition-colors sm:max-w-none sm:text-xs",
    href && "hover:border-primary/30 hover:bg-muted/60",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return <span className={baseClass}>{content}</span>;
}

export default StoreDetails;
