import type { ReactElement, ReactNode } from "react";

export interface CarouselArrowProps {
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

export interface CarouselBreakpoint {
  breakpoint: { max: number; min: number };
  items: number;
  slidesToSlide?: number;
  partialVisibilityGutter?: number;
}

export type CarouselResponsive = Record<string, CarouselBreakpoint>;

export type CarouselDeviceType =
  | "mobile"
  | "tablet"
  | "laptop"
  | "desktop"
  | string;

export interface MultiCarouselProps {
  children: ReactNode;
  responsive: CarouselResponsive;
  partialVisible?: boolean;
  swipeable?: boolean;
  draggable?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  keyBoardControl?: boolean;
  customTransition?: string;
  transitionDuration?: number;
  containerClass?: string;
  itemClass?: string;
  dotListClass?: string;
  removeArrowOnDeviceType?: CarouselDeviceType[];
  customLeftArrow?: ReactElement<CarouselArrowProps>;
  customRightArrow?: ReactElement<CarouselArrowProps>;
  /** Kept for API parity with react-multi-carousel; always SSR-safe. */
  ssr?: boolean;
  deviceType?: CarouselDeviceType;
}
