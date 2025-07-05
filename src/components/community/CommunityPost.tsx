import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

import CommunityBlogCard from "./CommunityBlogCard";
import { CommunityPostProps } from "@/types/communityPost";

async function CommunityPost({
  posts,
  title,
}: {
  posts: CommunityPostProps[];
  title: string;
}) {
  return (
    <section className="py-12 bg-white rounded-md shadow-lg sm:py-16 dark:bg-gray-700">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto md:mx-0">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-slate-100">
              {title}
            </h2>
            <Link
              href="/community-blogs"
              className="bg-slate-800 py-3 px-5 rounded flex items-center text"
            >
              See All
              <MoveRight className="flex-shrink-0 mx-2" />
            </Link>
          </div>
          <p className="mt-5 text-base font-normal leading-7 text-gray-500 dark:text-gray-400">
            Create custom landing pages with Rareblocks that convert more
            visitors than any website.
          </p>
        </div>

        <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
          {posts
            .slice(0, 3)
            .map((communityPost: CommunityPostProps, index: React.Key) => {
              return (
                <CommunityBlogCard key={index} communityPost={communityPost} />
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default CommunityPost;
