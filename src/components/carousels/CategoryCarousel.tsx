// "use client";

import Product from "../Product";
import MultiCarousel from "./MultiCarousel";
import { cn } from "@/lib/utils";
import { ProductsProp } from "@/types/products";

function CategoryCarousel({
  products,
  clipOverflow = false,
  autoPlay = true,
  infinite = true,
}: {
  isStorePage?: boolean;
  products: ProductsProp["products"] | undefined;
  clipOverflow?: boolean;
  autoPlay?: boolean;
  infinite?: boolean;
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 5,
      slidesToSlide: 1,
      partialVisibilityGutter: 16,
    },
    laptop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 4,
      slidesToSlide: 1,
      partialVisibilityGutter: 12,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 3,
      slidesToSlide: 1,
      partialVisibilityGutter: 8,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
      slidesToSlide: 1,
      partialVisibilityGutter: 0,
    },
  };

  return (
    <MultiCarousel
      partialVisible={!clipOverflow}
      swipeable
      draggable
      showDots={false}
      responsive={responsive}
      ssr
      infinite={infinite}
      autoPlay={autoPlay}
      autoPlaySpeed={4000}
      keyBoardControl
      customTransition="transform 400ms ease-out"
      transitionDuration={400}
      containerClass={cn(
        "carousel-container carousel-container--compact",
        clipOverflow && "carousel-container--clip",
      )}
      removeArrowOnDeviceType={["mobile"]}
      itemClass="px-2 sm:px-2.5 h-full"
      // customLeftArrow={<CarouselLeftArrow />}
      // customRightArrow={<CarouselRightArrow />}
    >
      {products?.map((product) => (
        <Product key={product.id} product={product} compact />
      ))}
    </MultiCarousel>
  );
}

export default CategoryCarousel;
