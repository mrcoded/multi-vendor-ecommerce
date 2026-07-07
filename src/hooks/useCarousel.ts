"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

import type { CarouselResponsive } from "../types/carousel";
import { getSlidesToSlide } from "../lib/generateResponsiveStyles";

type UseCarouselOptions = {
  rootRef: RefObject<HTMLDivElement | null>;
  slideCount: number;
  responsive: CarouselResponsive;
  itemsVisible: number;
  infinite?: boolean;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  keyBoardControl?: boolean;
  swipeable?: boolean;
  draggable?: boolean;
};

export function useCarousel({
  rootRef,
  slideCount,
  responsive,
  itemsVisible,
  infinite = false,
  autoPlay = false,
  autoPlaySpeed = 3000,
  keyBoardControl = false,
  swipeable = true,
  draggable = true,
}: UseCarouselOptions) {
  const slidesToSlide = getSlidesToSlide(responsive, itemsVisible);
  const loopStart = infinite && slideCount > 0 ? slideCount : 0;
  const [currentIndex, setCurrentIndex] = useState(loopStart);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);

  const maxIndex = Math.max(0, slideCount - itemsVisible);

  const normalizeInfiniteIndex = useCallback(
    (index: number) => {
      if (!infinite || slideCount <= 0) {
        return Math.min(Math.max(index, 0), maxIndex);
      }

      if (index >= slideCount * 2) {
        return index - slideCount;
      }
      if (index < slideCount) {
        return index + slideCount;
      }
      return index;
    },
    [infinite, maxIndex, slideCount],
  );

  const goTo = useCallback(
    (index: number, withTransition = true) => {
      setTransitionEnabled(withTransition);
      setCurrentIndex((prev) => {
        const next =
          infinite && slideCount > 0
            ? index
            : Math.min(Math.max(index, 0), maxIndex);
        return next === prev ? prev : next;
      });
      setDragOffset(0);
      dragOffsetRef.current = 0;
    },
    [infinite, maxIndex, slideCount],
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + slidesToSlide);
  }, [currentIndex, goTo, slidesToSlide]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - slidesToSlide);
  }, [currentIndex, goTo, slidesToSlide]);

  const handleTransitionEnd = useCallback(() => {
    if (!infinite || slideCount <= 0) return;

    if (currentIndex >= slideCount * 2 || currentIndex < slideCount) {
      const normalized = normalizeInfiniteIndex(currentIndex);
      setTransitionEnabled(false);
      setCurrentIndex(normalized);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }
  }, [currentIndex, infinite, normalizeInfiniteIndex, slideCount]);

  useEffect(() => {
    if (!autoPlay || slideCount <= itemsVisible) return;

    const timer = window.setInterval(goNext, autoPlaySpeed);
    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlaySpeed, goNext, itemsVisible, slideCount]);

  useEffect(() => {
    if (!keyBoardControl) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, keyBoardControl]);

  const canDrag = swipeable || draggable;

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!canDrag || slideCount <= itemsVisible) return;

      pointerIdRef.current = event.pointerId;
      startXRef.current = event.clientX;
      dragOffsetRef.current = 0;
      setIsDragging(true);
      setTransitionEnabled(false);
      setDragOffset(0);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [canDrag, itemsVisible, slideCount],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || pointerIdRef.current !== event.pointerId) return;

      const offset = event.clientX - startXRef.current;
      dragOffsetRef.current = offset;
      setDragOffset(offset);
    },
    [isDragging],
  );

  const finishDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || pointerIdRef.current !== event.pointerId) return;

      const offset = dragOffsetRef.current;
      const threshold = (rootRef.current?.offsetWidth ?? 0) * 0.12;

      setIsDragging(false);
      pointerIdRef.current = null;
      setTransitionEnabled(true);
      setDragOffset(0);
      dragOffsetRef.current = 0;

      if (Math.abs(offset) > threshold) {
        if (offset < 0) {
          goNext();
        } else {
          goPrev();
        }
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [goNext, goPrev, isDragging],
  );

  const dotCount =
    slideCount > 0
      ? Math.max(1, Math.ceil((slideCount - itemsVisible + 1) / slidesToSlide))
      : 0;

  const activeDot =
    slideCount > 0
      ? Math.min(
          Math.floor(
            (infinite ? currentIndex % slideCount : currentIndex) /
              slidesToSlide,
          ),
          dotCount - 1,
        )
      : 0;

  return {
    currentIndex,
    dragOffset,
    transitionEnabled,
    slidesToSlide,
    goTo,
    goNext,
    goPrev,
    onPointerDown,
    onPointerMove,
    onPointerUp: finishDrag,
    onPointerCancel: finishDrag,
    onTransitionEnd: handleTransitionEnd,
    dotCount,
    activeDot,
    canGoPrev: infinite || currentIndex > 0,
    canGoNext: infinite || currentIndex < maxIndex,
  };
}
