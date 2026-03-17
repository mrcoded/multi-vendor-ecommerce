"use client";

import Product from "../Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductsProp } from "@/types/products";

function CategoryCarousel({
  products,
  isStorePage = false,
}: {
  isStorePage?: boolean;
  products: ProductsProp["products"];
}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isStorePage ? 3 : 4,
      slidesToSlide: 1, // Changed to 1 for smoother individual transitions
      partialVisibilityGutter: 40, // Peeking amount in pixels
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: isStorePage ? 2 : 3,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2, // Show 1 fully and a bit of the next one
      slidesToSlide: 1,
      partialVisibilityGutter: 0,
    },
  };

  return (
    <Carousel
      partialVisible={true} // CRITICAL: Enables the "partly visible" feature
      swipeable={true}
      draggable={true}
      showDots={false} // Dots often look messy with partial visibility
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000} // Slightly slower for better UX
      keyBoardControl={true}
      customTransition="transform 500ms ease-in-out" // Smoother cubic-bezier style transition
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="px-1.5 lg:px-4" // Padding between items
      centerMode={false}
    >
      {products.map((product, i) => {
        return <Product key={i} product={product} />;
      })}
    </Carousel>
  );
}

export default CategoryCarousel;
