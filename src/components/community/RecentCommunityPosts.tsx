import React from "react";
import Link from "next/link";
import Image from "next/image";

import { CommunityPostProps } from "@/types/communityPost";

import generateISOFormatDate from "@/lib/generateISOFormatDate";
import formatDate from "@/lib/formatDate";

function RecentCommunityPosts({
  posts,
}: {
  posts: CommunityPostProps[] | undefined;
}) {
  return (
    <div className="sm:col-span-2">
      <p className="text-xl font-bold text-gray-900 dark:text-slate-300">
        Recent Community Posts
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 mt-6 xl:space-y-5">
        {posts?.slice(0, 3)?.map((post: CommunityPostProps, i) => {
          const rawDate = post.createdAt.toString();
          const normalDate = formatDate(rawDate);

          return (
            <div
              key={i}
              className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1"
            >
              <div className="p-1.5 sm:p-4">
                <div className="flex items-center">
                  <Image
                    alt={post?.title}
                    src={post?.imageUrl}
                    width={64}
                    height={56}
                    priority
                    unoptimized
                    className="w-10 h-10 xl:h-12 xl:w-12 object-cover rounded-full"
                  />

                  <div className="ml-3 lg:mt-3">
                    <p className="text-xs xl:text-sm font-medium text-gray-900">
                      {normalDate}
                    </p>
                    <p className="text-sm leading-5 xl:leading-7 font-bold text-gray-900 mt-1">
                      <Link
                        href={`/community-blogs/${post?.slug}`}
                        className="line-clamp-2"
                      >
                        {post?.title}
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentCommunityPosts;
