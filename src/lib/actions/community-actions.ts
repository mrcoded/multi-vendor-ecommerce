"use server";

import { db } from "../db";
import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import {
  createCommunityPost,
  getAllCommunityPosts,
  getCommunityPostById,
  getCommunityPostBySlug,
} from "@/services/community-service";
import { authenticatedAction, publicQueryAction } from "@/lib/auth-wrapper";
import { CommunityPostFormProps } from "@/types/communityPost";
import { sanitizeCommunityPostInput } from "@/lib/sanitize-payloads";

export async function getAllCommunityPostsAction() {
  return publicQueryAction(() => getAllCommunityPosts());
}

export async function getCommunityPostBySlugAction(slug: string) {
  return publicQueryAction(() => getCommunityPostBySlug(slug));
}

export async function getCommunityPostByIdAction(id: string) {
  return authenticatedAction("Fetch Community Post", ["ADMIN"], async () =>
    getCommunityPostById(id),
  );
}

export async function createCommunityPostAction(data: CommunityPostFormProps) {
  return authenticatedAction(
    "Create Community Post",
    ["ADMIN", "USER"],
    async () => {
      try {
        const newPost = await createCommunityPost(data);

        invalidateCacheTag(CACHE_TAGS.communityPosts);
        invalidateCacheTag(CACHE_TAGS.postBySlug(newPost.slug));

        return { success: true, data: newPost };
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to create post";
        return { success: false, error: message };
      }
    },
  );
}

export async function updateCommunityPostAction(
  id: string,
  data: CommunityPostFormProps,
) {
  return authenticatedAction("Update Community post", ["ADMIN"], async () => {
    try {
      const existing = await db.communityPost.findUnique({ where: { id } });
      const safeData = sanitizeCommunityPostInput(data);
      const updated = await db.communityPost.update({
        where: { id },
        data: safeData,
      });

      invalidateCacheTag(CACHE_TAGS.communityPosts);
      invalidateCacheTag(CACHE_TAGS.postById(id));
      invalidateCacheTag(CACHE_TAGS.postBySlug(updated.slug));
      if (existing?.slug && existing.slug !== updated.slug) {
        invalidateCacheTag(CACHE_TAGS.postBySlug(existing.slug));
      }

      return { success: true, data: updated };
    } catch {
      return { success: false, error: "Community Post Update failed" };
    }
  });
}

export async function deleteCommunityPostAction(id: string) {
  return authenticatedAction("Delete Community post", ["ADMIN"], async () => {
    try {
      const existing = await db.communityPost.findUnique({ where: { id } });
      await db.communityPost.delete({ where: { id } });

      invalidateCacheTag(CACHE_TAGS.communityPosts);
      invalidateCacheTag(CACHE_TAGS.postById(id));
      if (existing?.slug) {
        invalidateCacheTag(CACHE_TAGS.postBySlug(existing.slug));
      }

      return { success: true, message: "Post deleted successfully" };
    } catch {
      return { success: false, error: "Community Post Deletion failed" };
    }
  });
}
