import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { unstable_cache } from "next/cache";
import { CommunityPostFormProps } from "@/types/communityPost";
import { sanitizeCommunityPostInput } from "@/lib/sanitize-payloads";

const getCachedAllCommunityPosts = unstable_cache(
  async () => {
    return await db.communityPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
  },
  ["community-posts-list"],
  {
    tags: [CACHE_TAGS.communityPosts],
    revalidate: CACHE_TTL.catalog,
  },
);

export async function getAllCommunityPosts() {
  return getCachedAllCommunityPosts();
}

export async function createCommunityPost(data: CommunityPostFormProps) {
  try {
    const safeData = sanitizeCommunityPostInput(data);
    const existingCommunityPost = await db.communityPost.findUnique({
      where: { slug: safeData.slug },
    });

    if (existingCommunityPost)
      throw new Error("A post with this slug already exists.");

    const newPost = await db.communityPost.create({ data: safeData });

    return newPost;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create post";
    console.error("[SERVICE_CREATE_COMMUNITY_POST_ERROR]:", error);
    throw new Error(message);
  }
}

export async function getCommunityPostBySlug(slug: string) {
  try {
    return await unstable_cache(
      async () => {
        return await db.communityPost.findUnique({
          where: { slug },
          include: { category: { select: { title: true } } },
        });
      },
      [`community-post-${slug}`],
      {
        tags: [CACHE_TAGS.communityPosts, CACHE_TAGS.postBySlug(slug)],
        revalidate: CACHE_TTL.catalog,
      },
    )();
  } catch (error) {
    console.error("DB_FETCH_ERROR:", error);
    return null;
  }
}

export async function getCommunityPostById(postId: string) {
  return unstable_cache(
    async () => {
      return await db.communityPost.findUnique({
        where: { id: postId },
      });
    },
    [`community-post-id-${postId}`],
    {
      tags: [CACHE_TAGS.communityPosts, CACHE_TAGS.postById(postId)],
      revalidate: CACHE_TTL.catalog,
    },
  )();
}
