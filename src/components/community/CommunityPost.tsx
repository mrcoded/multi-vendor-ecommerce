import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllCommunityPosts } from "@/services/community-service";
import { serverRead } from "@/lib/api/resilient-read";

import { Button } from "@/components/ui/button";
import CommunityBlogCard from "./CommunityBlogCard";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import CommunityPostSkeleton from "@/components/feedback/skeletons/CommunityPostSkeleton";

async function CommunityPost({
  title,
  limit = 3,
  categoryTitleById,
}: {
  title?: string;
  limit?: number;
  categoryTitleById: Record<string, string>;
}) {
  const [communityPosts] = await Promise.all([
    serverRead(() => getAllCommunityPosts(), {
      source: "home:community-posts",
    }),
  ]);

  const posts = communityPosts?.slice(0, limit) ?? [];

  if (!posts.length) return null;

  return (
    <ErrorBoundary variant="inline" showHomeLink={false} showToast>
      <Suspense fallback={<CommunityPostSkeleton />}>
        <section className="mt-6 border-t border-border py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-foreground sm:text-lg">
                  {title}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  Tips, guides, and stories from our vendor community.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-1 text-xs sm:text-sm"
                asChild
              >
                <Link href="/community-blogs">
                  See all
                  <ArrowRight className="size-3.5 sm:size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {posts.map((post) => (
                <CommunityBlogCard
                  key={post.id ?? post.slug}
                  communityPost={post}
                  categoryTitle={
                    post.categoryId
                      ? categoryTitleById[post.categoryId]
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>
      </Suspense>
    </ErrorBoundary>
  );
}

export default CommunityPost;
