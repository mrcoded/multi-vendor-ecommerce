"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ArrowProps = {
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
};

export function CarouselLeftArrow({
  onClick,
  className,
  "aria-label": ariaLabel = "Previous slide",
}: ArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn("multi-carousel__arrow multi-carousel__arrow--left", className)}
    >
      <ChevronLeft className="size-4" aria-hidden />
    </button>
  );
}

export function CarouselRightArrow({
  onClick,
  className,
  "aria-label": ariaLabel = "Next slide",
}: ArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "multi-carousel__arrow multi-carousel__arrow--right",
        className,
      )}
    >
      <ChevronRight className="size-4" aria-hidden />
    </button>
  );
}
