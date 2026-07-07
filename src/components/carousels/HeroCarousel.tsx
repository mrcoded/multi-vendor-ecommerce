"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel } from "flowbite-react";

interface BannerProps {
  banners:
    | {
        id: string;
        link: string;
        title: string;
        imageUrl: string;
      }[]
    | undefined;
}

function HeroCarousel({ banners }: BannerProps) {
  return (
    <Carousel
      leftControl={
        <ChevronLeft className="m-1 h-10 w-10 rounded-full border border-border bg-card/90 p-1.5 text-foreground shadow-sm" />
      }
      rightControl={
        <ChevronRight className="h-10 w-10 rounded-full border border-border bg-card/90 p-1.5 text-foreground shadow-sm" />
      }
      className="overflow-hidden rounded-md"
    >
      {banners?.map((banner, index) => (
        <Link key={banner.id} href={banner.link}>
          <Image
            width={1200}
            height={480}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 58vw"
            className="aspect-[5/2] w-full object-cover"
            src={banner.imageUrl}
            alt={banner.title}
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            unoptimized={banner.imageUrl.endsWith(".gif")}
          />
        </Link>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;
