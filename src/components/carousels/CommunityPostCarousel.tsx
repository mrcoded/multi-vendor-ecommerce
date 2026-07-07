// "use client";

import Image from "next/image";
import Link from "next/link";

import MultiCarousel from "./MultiCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CommunityPostsProps {
  communityPosts: {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
  }[];
}

function CommunityPostCarousel({ communityPosts }: CommunityPostsProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <MultiCarousel
      swipeable={false}
      draggable={false}
      showDots
      responsive={responsive}
      ssr
      infinite
      autoPlay
      autoPlaySpeed={1000}
      keyBoardControl
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
      // customLeftArrow={<CarouselLeftArrow />}
      // customRightArrow={<CarouselRightArrow />}
    >
      {communityPosts.map((post, i) => (
        <Card key={i} className="mr-3 overflow-hidden hover-lift">
          <Link href="#">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={556}
              height={312}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="h-48 w-full object-cover"
            />
          </Link>

          <CardContent className="space-y-2 p-4">
            <h2 className="text-center text-xl font-semibold text-foreground">
              {post.title}
            </h2>

            <p className="line-clamp-3 text-muted-foreground">
              {post.description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <Button variant="accent" size="sm" asChild>
                <Link href="#">Read More</Link>
              </Button>
              <Link
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                Talk to the Consultant
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </MultiCarousel>
  );
}

export default CommunityPostCarousel;
