"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel } from "flowbite-react";

interface BannerProps {
  banners: {
    id: string;
    link: string;
    title: string;
    imageUrl: string;
  }[];
}

function HeroCarousel({ banners }: BannerProps) {
  return (
    <Carousel
      leftControl={
        <ChevronLeft className="m-1 border border-gray-400 p-1.5 rounded-full bg-gray-400 w-10 h-10 text-white" />
      }
      rightControl={
        <ChevronRight className="border border-gray-400 p-1.5 rounded-full bg-gray-400 w-10 h-10 text-white" />
      }
      className="rounded-md overflow-hidden"
    >
      {banners.map((banner) => {
        return (
          <Link key={banner.id} href={banner.link}>
            <Image
              width={712}
              height={384}
              className="w-full"
              src={banner.imageUrl}
              alt={banner.title}
            />
          </Link>
        );
      })}
    </Carousel>
  );
}

export default HeroCarousel;
