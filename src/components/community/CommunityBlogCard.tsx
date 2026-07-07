import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import formatDate from "@/lib/formatDate";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CommunityPostProps } from "@/types/communityPost";

function CommunityBlogCard({
  communityPost,
  categoryTitle,
}: {
  communityPost: CommunityPostProps;
  categoryTitle?: string;
}) {
  const normalDate = formatDate(communityPost.createdAt?.toString() ?? "");

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/80 shadow-none transition-shadow hover:shadow-md">
      <Link
        href={`/community-blogs/${communityPost.slug}`}
        className="relative block shrink-0 overflow-hidden"
      >
        <Image
          src={communityPost.imageUrl}
          alt={communityPost.title}
          width={556}
          height={312}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {categoryTitle && (
          <Badge className="absolute left-2 top-2 border-0 bg-card/95 text-[10px] text-foreground backdrop-blur-sm sm:text-xs">
            {categoryTitle}
          </Badge>
        )}
      </Link>

      <CardContent className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
        <p className="text-[11px] text-muted-foreground sm:text-xs">
          {normalDate}
        </p>

        <h3 className="min-h-[2.25rem] flex-1">
          <Link
            href={`/community-blogs/${communityPost.slug}`}
            className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary sm:text-base"
          >
            {communityPost.title}
          </Link>
        </h3>

        {communityPost.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {communityPost.description}
          </p>
        )}

        <Button
          variant="link"
          size="sm"
          className="h-auto justify-start gap-1 p-0 text-xs font-semibold text-primary sm:text-sm"
          asChild
        >
          <Link href={`/community-blogs/${communityPost.slug}`}>
            Read article
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default CommunityBlogCard;
