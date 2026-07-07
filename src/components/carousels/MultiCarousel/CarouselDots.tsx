"use client";

import { cn } from "@/lib/utils";

type CarouselDotsProps = {
  dotCount: number;
  activeDot: number;
  dotListClass?: string;
  onDotClick: (index: number) => void;
};

export function CarouselDots({
  dotCount,
  activeDot,
  dotListClass,
  onDotClick,
}: CarouselDotsProps) {
  if (dotCount <= 1) return null;

  return (
    <ul
      className={cn("multi-carousel__dots", dotListClass)}
      role="tablist"
      aria-label="Carousel pagination"
    >
      {Array.from({ length: dotCount }, (_, index) => (
        <li key={index} role="presentation">
          <button
            type="button"
            role="tab"
            aria-selected={index === activeDot}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "multi-carousel__dot",
              index === activeDot && "multi-carousel__dot--active",
            )}
            onClick={() => onDotClick(index)}
          />
        </li>
      ))}
    </ul>
  );
}
