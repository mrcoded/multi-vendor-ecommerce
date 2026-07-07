"use client";

import React, { Children, useEffect, useId, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

import { CarouselDots } from "./CarouselDots";
import { CarouselTrack } from "./CarouselTrack";
import {
  generateArrowVisibilityStyles,
  generateResponsiveStyles,
} from "@/lib/generateResponsiveStyles";
import { renderArrow } from "@/lib/renderArrow";
import type { MultiCarouselProps } from "../../../types/carousel";
import { useCarousel } from "@/hooks/useCarousel";
import { useItemsVisible } from "@/hooks/useItemsVisible";

function MultiCarousel({
  children,
  responsive,
  partialVisible = false,
  swipeable = true,
  draggable = true,
  showDots = false,
  infinite = false,
  autoPlay = false,
  autoPlaySpeed = 3000,
  keyBoardControl = false,
  customTransition = "transform 400ms ease-out",
  transitionDuration = 400,
  containerClass,
  itemClass,
  dotListClass,
  removeArrowOnDeviceType,
  customLeftArrow,
  customRightArrow,
}: MultiCarouselProps) {
  const carouselId = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const slideCount = slides.length;

  const extendedSlides = useMemo(() => {
    if (!infinite || slideCount === 0) return slides;
    return [...slides, ...slides, ...slides];
  }, [infinite, slideCount, slides]);

  const itemsVisible = useItemsVisible(rootRef, responsive);

  const {
    currentIndex,
    dragOffset,
    transitionEnabled,
    goTo,
    goNext,
    goPrev,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
    dotCount,
    activeDot,
    slidesToSlide,
    canGoPrev,
    canGoNext,
  } = useCarousel({
    rootRef,
    slideCount,
    responsive,
    itemsVisible,
    infinite,
    autoPlay,
    autoPlaySpeed,
    keyBoardControl,
    swipeable,
    draggable,
  });

  const responsiveStyles = useMemo(
    () =>
      generateResponsiveStyles(carouselId, responsive) +
      generateArrowVisibilityStyles(carouselId, removeArrowOnDeviceType),
    [carouselId, responsive, removeArrowOnDeviceType],
  );

  const transition =
    customTransition || `transform ${transitionDuration}ms ease-out`;

  if (slideCount === 0) return null;

  const trackStyle: React.CSSProperties = {
    transform:
      "translate3d(calc(-1 * var(--carousel-index) * var(--slide-step) + var(--carousel-drag)), 0, 0)",
    transition: transitionEnabled ? transition : "none",
  };

  return (
    <div
      ref={rootRef}
      data-carousel={carouselId}
      className={cn(
        "multi-carousel",
        partialVisible && "multi-carousel--partial",
        containerClass?.includes("carousel-container--clip") &&
          "multi-carousel--clip",
        containerClass,
      )}
      style={
        {
          "--carousel-index": currentIndex,
          "--carousel-drag": `${dragOffset}px`,
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />

      <div className="multi-carousel__viewport">
        {renderArrow({
          arrow: customLeftArrow,
          direction: "left",
          canNavigate: canGoPrev,
          onClick: goPrev,
        })}
        {renderArrow({
          arrow: customRightArrow,
          direction: "right",
          canNavigate: canGoNext,
          onClick: goNext,
        })}

        <CarouselTrack
          slides={extendedSlides}
          infinite={infinite}
          slideCount={slideCount}
          itemClass={itemClass}
          trackStyle={trackStyle}
          onTransitionEnd={onTransitionEnd}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        />
      </div>

      {showDots && (
        <CarouselDots
          dotCount={dotCount}
          activeDot={activeDot}
          dotListClass={dotListClass}
          onDotClick={(index) =>
            goTo(
              infinite
                ? slideCount + index * slidesToSlide
                : index * slidesToSlide,
            )
          }
        />
      )}
    </div>
  );
}

export default MultiCarousel;
