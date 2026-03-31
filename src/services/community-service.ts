import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CommunityPostFormProps } from "@/types/communityPost";

// FETCH ALL (Cached)
export async function getAllCommunityPosts() {
  const getCachedPosts = unstable_cache(
    async () => {
      return await db.communityPost.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true }, // Optional: Include category details
      });
    },
    ["community-posts-list"],
    { tags: ["community-posts"], revalidate: 3600 },
  );
  return await getCachedPosts();
}

// CREATE SERVICE
export async function createCommunityPost(data: CommunityPostFormProps) {
  try {
    const existingCommunityPost = await db.communityPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingCommunityPost)
      throw new Error("A post with this slug already exists.");

    const newBanner = await db.communityPost.create({ data });

    return newBanner;
  } catch (error: any) {
    console.error("[SERVICE_CREATE_COMMUNITY_POST_ERROR]:", error);
    throw new Error(error.message || "Failed to create banner");
  }
}

export async function getCommunityPostBySlug(slug: string) {
  try {
    const getCachedPost = unstable_cache(
      async (postSlug: string) => {
        return await db.communityPost.findUnique({
          where: { slug: postSlug },
          // Pragmatic: Include the category for better UI/SEO
          include: { category: { select: { title: true } } },
        });
      },
      [`community-post-${slug}`], // Cache Key
      {
        tags: [`post-${slug}`], // Cache Tag for revalidation
        revalidate: 3600, // 1 hour fallback
      },
    );

    return await getCachedPost(slug);
  } catch (error) {
    console.error("🕵️ DB_FETCH_ERROR:", error);
    return null;
  }
}

export async function getCommunityPostById(postId: string) {
  const getCachedPost = unstable_cache(
    async (postId: string) => {
      return await db.communityPost.findUnique({
        where: { id: postId },
      });
    },
    [`community-post-id-${postId}`],
    { tags: [`post-${postId}`], revalidate: 3600 },
  );

  return await getCachedPost(postId);
}
