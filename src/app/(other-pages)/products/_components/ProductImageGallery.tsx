"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function ProductImageGallery({
  thumbnail,
  productImages = [],
  title = "Product",
}: {
  thumbnail: string;
  productImages?: string[];
  title?: string;
}) {
  const images = productImages.length > 0 ? productImages : [thumbnail];
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length],
  );

  return (
    <div className="space-y-3">
      <div className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted/20">
        <Image
          src={images[activeIndex]}
          alt={`${title} — image ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          fetchPriority={activeIndex === 0 ? "high" : "auto"}
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-contain p-3 sm:p-6"
        />

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/90 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/90 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Product image thumbnails"
      >
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={`View image ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:size-20",
              activeIndex === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-border",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              loading="lazy"
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;
