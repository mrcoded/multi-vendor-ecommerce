"use server";

import { db } from "../db";
import { revalidateTag } from "next/cache";
import {
  createCommunityPost,
  getAllCommunityPosts,
  getCommunityPostById,
} from "@/services/community-service";
import { authenticatedAction } from "@/lib/auth-wrapper";
import { CommunityPostFormProps } from "@/types/communityPost";

export async function createCommunityPostAction(data: CommunityPostFormProps) {
  return authenticatedAction(
    "Create Community Post",
    ["ADMIN", "USER"],
    async () => {
      try {
        const newPost = await createCommunityPost(data);

        // 🎯 BUST THE CACHE
        revalidateTag("community-posts");

        return { success: true, data: newPost };
      } catch (error: any) {
        return { success: false, error: error.message };
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
      const updated = await db.communityPost.update({
        where: { id },
        data,
      });

      // 🎯 REVALIDATE: List and specific item
      revalidateTag("community-posts");
      revalidateTag(`post-${id}`);

      return { success: true, data: updated };
    } catch (error) {
      return { success: false, error: "Community Post Update failed" };
    }
  });
}

export async function deleteCommunityPostAction(id: string) {
  return authenticatedAction("Delete Community post", ["ADMIN"], async () => {
    try {
      await db.communityPost.delete({ where: { id } });

      revalidateTag("community-posts");
      revalidateTag(`post-${id}`);

      return { success: true, message: "Post deleted successfully" };
    } catch (error) {
      return { success: false, error: "Community Post Deletion failed" };
    }
  });
}

export async function getCommunityPostAction(id: string) {
  try {
    const post = await getCommunityPostById(id);

    if (!post) {
      return { success: false, data: null, error: "Post not found" };
    }

    return { success: true, data: post, error: null };
  } catch (error) {
    console.error("Fetch Action Error:", error);
    return { success: false, data: null, error: "Server error during fetch" };
  }
}

export async function getAllCommunityPostsAction() {
  try {
    const post = await getAllCommunityPosts();

    return { success: true, data: post, error: null };
  } catch (error) {
    console.error("Fetch Action Error:", error);
    return { success: false, data: null, error: "Server error during fetch" };
  }
}
