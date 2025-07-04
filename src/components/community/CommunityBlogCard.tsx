import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CommunityPostProps } from "@/types/communityPost";
import formatDate from "@/lib/formatDate";
import getData from "@/lib/getData";

async function CommunityBlogCard({
  communityPost,
}: {
  communityPost: CommunityPostProps;
}) {
  const categoryId = communityPost.categoryId;
  const category = await getData(`categories/${categoryId}`);
  const categoryTitle = category.title;

  const normalDate = formatDate(communityPost.createdAt);

  return (
    <div className="group">
      <div className="relative">
        <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
          <img
            src={communityPost.imageUrl}
            alt={communityPost.title}
            className="object-cover w-full h-48 transition-all duration-200 transform group-hover:scale-110"
          />
        </div>
        <span className="absolute px-3 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white rounded top-3 left-3">
          {categoryTitle}
        </span>
      </div>
      <p className="mt-6 text-sm font-medium text-gray-500 dark:text-slate-200">
        {normalDate}
      </p>
      <h2 className="mt-4 min-h-[50px] text-xl font-bold leading-tight text-gray-900 xl:pr-8">
        <Link
          href={`/community-blogs/${communityPost.slug}`}
          className="line-clamp-2 dark:text-slate-200"
        >
          {communityPost.title}
        </Link>
      </h2>
      <div className="mt-6">
        <Link
          href={`/community-blogs/${communityPost.slug}`}
          className="inline-flex items-center pb-2 text-xs font-bold tracking-widest text-gray-900 uppercase border-b border-gray-900 dark:border-lime-200 group dark:text-lime-200"
        >
          Continue Reading
          <ArrowRight className="stroke-gray-900 w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default CommunityBlogCard;
