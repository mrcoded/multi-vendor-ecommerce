"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper/types";

function ProductImageCarousel({
  thumbnail,
  productImages = [],
}: {
  thumbnail: string;
  productImages: string[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="col-span-full sm:col-span-3">
      {productImages.length <= 0 ? (
        <Image
          src={thumbnail}
          alt="Product Image"
          width={556}
          height={156}
          unoptimized
          className="w-32 sm:w-full h-28 sm:h-32 object-cover"
        />
      ) : (
        <>
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              } as React.CSSProperties
            }
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {productImages.map((image, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <Image
                  height={800} // Higher resolution for main view
                  width={800}
                  alt={`Product View ${index + 1}`}
                  src={image}
                  priority={index === 0}
                  className="sm:w-full h-full object-contain" // Contain ensures no cropping for unique shapes
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {productImages.map((image, index) => (
              <SwiperSlide
                key={index}
                className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent transition-all [.swiper-slide-thumb-active]:border-lime-500"
              >
                <div className="aspect-square relative bg-slate-100 dark:bg-slate-800">
                  <Image
                    fill
                    alt="Thumbnail"
                    src={image}
                    unoptimized
                    sizes="(max-width: 640px) 25vw, 15vw"
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default ProductImageCarousel;
