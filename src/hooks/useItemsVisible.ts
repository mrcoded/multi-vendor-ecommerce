"use client";

import { useEffect, useState, type RefObject } from "react";

import { getDefaultItemsVisible } from "../lib/generateResponsiveStyles";
import type { CarouselResponsive } from "../types/carousel";

function readItemsVisible(element: HTMLElement): number {
  const value = getComputedStyle(element)
    .getPropertyValue("--items-visible")
    .trim();
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function useItemsVisible(
  rootRef: RefObject<HTMLElement | null>,
  responsive: CarouselResponsive,
): number {
  const fallback = getDefaultItemsVisible(responsive);
  const [itemsVisible, setItemsVisible] = useState(fallback);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setItemsVisible(readItemsVisible(element));
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [rootRef, responsive]);

  return itemsVisible;
}
