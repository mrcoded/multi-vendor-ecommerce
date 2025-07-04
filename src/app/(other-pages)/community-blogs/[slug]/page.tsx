import React from "react";

import getData from "@/lib/getData";
import generateISOFormatDate from "@/lib/generateISOFormatDate";

import CategoryList from "../../category/_components/CategoryList";
import CommunityPostHtml from "@/components/community/CommunityPostHtml";
import RecentCommunityPosts from "@/components/community/RecentCommunityPosts";

async function page({ params: { slug } }: { params: { slug: string } }) {
  const communityPost = await getData(`communityPosts/post/${slug}`);
  const communityPostId = communityPost.id;
  //Format date
  const normalDate = generateISOFormatDate(communityPost.createdAt);

  //Get recent community posts
  const allCommunityPosts = await getData(`communityPosts`);
  const recentCommunityPosts = allCommunityPosts.filter(
    (post: { id: string }) => post.id !== communityPostId
  );

  //Get category
  const category = await getData(`categories/${communityPost.categoryId}`);

  return (
    <>
      <section className="py-12 bg-white lg sm:py-16 lg:py-20 rounded-md dark:bg-slate-700">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-7 lg:gap-x-12">
            <div className="bg-gray-100 lg:col-span-5 rounded-xl">
              <div className="px-4 py-5 sm:p-6">
                <div className="mx-auto">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-base font-medium text-gray-500">
                      {normalDate}
                    </p>
                    <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
                      {communityPost.title}
                    </h1>
                  </div>

                  <div className="mt-12 sm:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6">
                    <img
                      src={communityPost.imageUrl}
                      alt={communityPost.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="py-8  text-gray-900">
                    <p className="text-lg">{communityPost.description}</p>

                    <hr className="mt-6" />
                    <div className="py-8">
                      <CommunityPostHtml content={communityPost.content} />
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

export default page;
