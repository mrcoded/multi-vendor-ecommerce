import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import formatDate from "@/lib/formatDate";
import {
  getCommunityPostBySlug,
  getAllCommunityPosts,
} from "@/services/community-service";
import { getCategoryById } from "@/services/category-service";
import { buildPageMetadata } from "@/lib/seo";
import ArticleJsonLd from "@/components/seo/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

import CategoryList from "../../category/_components/CategoryList";
import CommunityPostHtml from "@/components/community/CommunityPostHtml";
import RecentCommunityPosts from "@/components/community/RecentCommunityPosts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCommunityPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/community-blogs/${slug}`,
    image: post.imageUrl,
    type: "article",
  });
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const communityPost = await getCommunityPostBySlug(slug);
  if (!communityPost) return notFound();

  const communityPostId = communityPost.id;
  const normalDate = formatDate(communityPost?.createdAt.toString());

  const allCommunityPosts = await getAllCommunityPosts();
  const recentCommunityPosts = allCommunityPosts?.filter(
    (post: { id: string }) => post.id !== communityPostId,
  );

  const category = communityPost.categoryId
    ? await getCategoryById(communityPost.categoryId)
    : null;

  return (
    <>
      <ArticleJsonLd
        title={communityPost.title}
        description={communityPost.description}
        slug={communityPost.slug}
        imageUrl={communityPost.imageUrl}
        publishedAt={communityPost.createdAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Community Blogs", path: "/community-blogs" },
          { name: communityPost.title, path: `/community-blogs/${slug}` },
        ]}
      />
      <section className="rounded-md bg-card py-5 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-7 lg:gap-x-5">
            <div className="col-span-full rounded-xl bg-muted lg:col-span-5">
              <div className="px-4 py-5 sm:p-6">
                <div className="mx-auto">
                  <div className="mx-auto max-w-3xl">
                    <p className="text-base font-medium text-muted-foreground">
                      {normalDate}
                    </p>
                    <h1 className="mt-6 text-xl font-bold text-foreground sm:text-5xl md:text-3xl xl:text-4xl">
                      {communityPost.title}
                    </h1>
                  </div>

                  <div className="mt-4 aspect-h-9 aspect-w-16 sm:mt-10 lg:aspect-h-6">
                    <Image
                      width={1200}
                      height={630}
                      unoptimized
                      src={communityPost.imageUrl}
                      alt={communityPost.title}
                      className="h-24 w-full object-cover"
                    />
                  </div>

                  <div className="py-8 text-foreground">
                    <p className="text-lg">{communityPost.description}</p>

                    <hr className="mt-6 border-border" />
                    <div className="pb-4 pt-8">
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
