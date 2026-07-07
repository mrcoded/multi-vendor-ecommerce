// "use client";

import Image from "next/image";
import Link from "next/link";

import MultiCarousel from "./MultiCarousel";

// import { CarouselLeftArrow, CarouselRightArrow } from "./CarouselArrows";

interface StoreProps {
  stores: {
    id: string;
    slug: string;
    title: string;
    imageUrl: string | null;
  }[];
}

function StoreCarousel({ stores }: StoreProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 5,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 4,
      slidesToSlide: 1,
    },
  };

  return (
    <MultiCarousel
      swipeable
      draggable
      showDots={false}
      responsive={responsive}
      ssr
      infinite
      autoPlay
      autoPlaySpeed={5000}
      keyBoardControl
      customTransition="transform 400ms ease-out"
      transitionDuration={400}
      containerClass="carousel-container carousel-container--compact"
      removeArrowOnDeviceType={["mobile", "tablet"]}
      itemClass="px-1 sm:px-1.5"
      // customLeftArrow={<CarouselLeftArrow />}
      // customRightArrow={<CarouselRightArrow />}
    >
      {stores.map((store) => (
        <Link
          key={store.id}
          href={`/store/${store.slug}`}
          className="group flex flex-col items-center gap-1.5 py-1"
        >
          <div className="size-12 overflow-hidden rounded-full border border-border bg-card group-hover:border-primary/40 sm:size-14">
            <Image
              src={store?.imageUrl ?? "/assets/icon.png"}
              alt={store.title}
              width={80}
              height={80}
              sizes="56px"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <span className="line-clamp-2 w-full text-center text-[10px] leading-tight text-muted-foreground group-hover:text-foreground sm:text-xs">
            {store.title}
          </span>
        </Link>
      ))}
    </MultiCarousel>
  );
}

export default StoreCarousel;
