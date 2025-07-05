import React from "react";
import Link from "next/link";
import Image from "next/image";

import { CommunityPostProps } from "@/types/communityPost";

// import generateISOFormatDate from "@/lib/generateISOFormatDate";

function RecentCommunityPosts({ posts }: { posts: CommunityPostProps[] }) {
  return (
    <div className="lg:col-span-2">
      <p className="text-xl font-bold text-gray-900 dark:text-slalte-300">
        Recent Community Posts
      </p>

      <div className="mt-6 space-y-5">
        {posts.map((post: CommunityPostProps, i) => {
          // const normalDate = generateISOFormatDate(post.createdAt);

          return (
            <div
              key={i}
              className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1"
            >
              <div className="p-4">
                <div className="flex items-start flex-col lg:items-center">
                  <Image
                    alt={post.title}
                    src={post.imageUrl}
                    height={64}
                    width={556}
                    className="object-cover w-full h-16 rounded-lg shrink-0"
                  />
                  <div className="ml-5">
                    {/* <p className="text-sm font-medium text-gray-900">
                      {normalDate}
                    </p> */}
                    <p className="text-sm leading-7 font-bold text-gray-900 mt-2 5">
                      <Link
                        href={`/community-blogs/${post.slug}`}
                        className="line-clamp-2"
                      >
                        {post.title}
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
