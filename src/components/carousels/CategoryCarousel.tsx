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
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: isStorePage ? 2 : 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      {products.map((product, i) => {
        return <Product key={i} product={product} />;
      })}
    </Carousel>
  );
}

export default CategoryCarousel;
