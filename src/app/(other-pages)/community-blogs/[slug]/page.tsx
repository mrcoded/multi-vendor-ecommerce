import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import formatDate from "@/lib/formatDate";
import { getCommunityPostBySlug } from "@/services/community-service";
import { fetchCategoryByIdAction } from "@/lib/actions/category-actions";
import { getAllCommunityPostsAction } from "@/lib/actions/community-actions";

import CategoryList from "../../category/_components/CategoryList";
import CommunityPostHtml from "@/components/community/CommunityPostHtml";
import RecentCommunityPosts from "@/components/community/RecentCommunityPosts";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const communityPost = await getCommunityPostBySlug(slug);
  //if community post is not found
  if (!communityPost) return notFound();

  const communityPostId = communityPost.id;
  //Format date
  const normalDate = formatDate(communityPost?.createdAt.toString());

  //Get recent community posts
  const { data: allCommunityPosts } = await getAllCommunityPostsAction();
  const recentCommunityPosts = allCommunityPosts?.filter(
    (post: { id: string }) => post.id !== communityPostId,
  );

  //Get category
  const { data: category } = await fetchCategoryByIdAction(
    communityPost.categoryId ?? "",
  );

  return (
    <>
      <section className="py-5 sm:py-12 bg-white rounded-md dark:bg-slate-700">
        <div className="px-4 mx-auto sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 lg:grid-cols-7 lg:gap-x-5">
            <div className="bg-gray-100 col-span-full lg:col-span-5 rounded-xl">
              <div className="px-4 py-5 sm:p-6">
                <div className="mx-auto">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-base font-medium text-gray-500">
                      {normalDate}
                    </p>
                    <h1 className="mt-6 text-xl md:text-3xl xl:text-4xl font-bold text-gray-900 sm:text-5xl">
                      {communityPost.title}
                    </h1>
                  </div>

                  <div className="mt-4 sm:mt-10 aspect-w-16 aspect-h-9 lg:aspect-h-6">
                    <Image
                      width={100}
                      height={100}
                      unoptimized
                      src={communityPost.imageUrl}
                      alt={communityPost.title}
                      className="object-cover w-full h-24"
                    />
                  </div>

                  <div className="py-8  text-gray-900">
                    <p className="text-lg">{communityPost.description}</p>

                    <hr className="mt-6" />
                    <div className="pt-8 pb-4">
                      <CommunityPostHtml content={communityPost?.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <RecentCommunityPosts posts={recentCommunityPosts} />
          </div>
        </div>
      </section>
      <div className="py-8">
        <CategoryList isStorePage={false} category={category} />
      </div>
    </>
  );
}

export default Page;
