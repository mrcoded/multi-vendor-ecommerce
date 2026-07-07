import type { CarouselDeviceType, CarouselResponsive } from "../types/carousel";

const DEVICE_MAX_WIDTH: Record<string, number> = {
  mobile: 640,
  tablet: 1024,
  laptop: 1280,
};

export function getDefaultItemsVisible(responsive: CarouselResponsive): number {
  const sorted = Object.values(responsive).sort(
    (a, b) => a.breakpoint.min - b.breakpoint.min,
  );
  return sorted[0]?.items ?? 1;
}

export function getSlidesToSlide(
  responsive: CarouselResponsive,
  itemsVisible: number,
): number {
  const match = Object.values(responsive).find((c) => c.items === itemsVisible);
  return match?.slidesToSlide ?? 1;
}

export function generateResponsiveStyles(
  carouselId: string,
  responsive: CarouselResponsive,
): string {
  const sorted = Object.values(responsive).sort(
    (a, b) => a.breakpoint.min - b.breakpoint.min,
  );
  const base = sorted[0];

  let css = `
    [data-carousel="${carouselId}"] {
      --items-visible: ${base.items};
      --peek-gutter: ${base.partialVisibilityGutter ?? 0}px;
    }
  `;

  for (const config of sorted) {
    const { min } = config.breakpoint;
    if (min <= 0) continue;

    css += `
      @media (min-width: ${min}px) {
        [data-carousel="${carouselId}"] {
          --items-visible: ${config.items};
          --peek-gutter: ${config.partialVisibilityGutter ?? 0}px;
        }
      }
    `;
  }

  return css;
}

export function generateArrowVisibilityStyles(
  carouselId: string,
  removeArrowOnDeviceType: CarouselDeviceType[] = [],
): string {
  if (!removeArrowOnDeviceType.length) return "";

  const maxWidths = removeArrowOnDeviceType
    .map((device) => DEVICE_MAX_WIDTH[device])
    .filter((width): width is number => width != null);

  if (!maxWidths.length) return "";

  const threshold = Math.max(...maxWidths);

  return `
    @media (max-width: ${threshold}px) {
      [data-carousel="${carouselId}"] .multi-carousel__arrow {
        display: none;
      }
    }
  `;
}
