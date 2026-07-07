"use client";

import type {
  PointerEventHandler,
  ReactNode,
  TransitionEventHandler,
} from "react";

import { cn } from "@/lib/utils";

type CarouselTrackProps = {
  slides: ReactNode[];
  infinite: boolean;
  slideCount: number;
  itemClass?: string;
  trackStyle: React.CSSProperties;
  onTransitionEnd: TransitionEventHandler<HTMLDivElement>;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onPointerCancel: PointerEventHandler<HTMLDivElement>;
};

export function CarouselTrack({
  slides,
  infinite,
  slideCount,
  itemClass,
  trackStyle,
  onTransitionEnd,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: CarouselTrackProps) {
  return (
    <div
      className="multi-carousel__track"
      style={trackStyle}
      onTransitionEnd={onTransitionEnd}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {slides.map((slide, index) => (
        <div
          key={
            infinite ? `slide-${index % slideCount}-${index}` : `slide-${index}`
          }
          className={cn("multi-carousel__slide", itemClass)}
          aria-hidden={
            infinite ? index < slideCount || index >= slideCount * 2 : undefined
          }
        >
          {slide}
        </div>
      ))}
    </div>
  );
}
