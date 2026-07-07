"use client";

import { cloneElement, type ReactElement } from "react";

import { cn } from "@/lib/utils";

import {
  CarouselLeftArrow,
  CarouselRightArrow,
} from "../components/carousels/MultiCarousel/CarouselArrows";
import type { CarouselArrowProps } from "../types/carousel";

type RenderArrowOptions = {
  arrow?: ReactElement<CarouselArrowProps>;
  direction: "left" | "right";
  canNavigate: boolean;
  onClick: () => void;
};

export function renderArrow({
  arrow,
  direction,
  canNavigate,
  onClick,
}: RenderArrowOptions) {
  const className = cn(
    "multi-carousel__arrow",
    direction === "left"
      ? "multi-carousel__arrow--left"
      : "multi-carousel__arrow--right",
    arrow?.props.className,
  );

  if (arrow) {
    return cloneElement(arrow, {
      onClick: canNavigate ? onClick : undefined,
      className,
    } satisfies CarouselArrowProps);
  }

  return direction === "left" ? (
    <CarouselLeftArrow
      onClick={canNavigate ? onClick : undefined}
      className={className}
    />
  ) : (
    <CarouselRightArrow
      onClick={canNavigate ? onClick : undefined}
      className={className}
    />
  );
}
