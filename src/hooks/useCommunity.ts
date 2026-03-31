import toast from "react-hot-toast";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  createCommunityPostAction,
  deleteCommunityPostAction,
  getAllCommunityPostsAction,
  getCommunityPostAction,
  updateCommunityPostAction,
} from "@/lib/actions/community-actions";
import {
  getAllCommunityPosts,
  getCommunityPostById,
  getCommunityPostBySlug,
} from "@/services/community-service";
import { CommunityPostFormProps } from "@/types/communityPost";
import { useRouter } from "next/navigation";

// GET HOOK
export function useCommunityPosts() {
  return useSuspenseQuery({
    queryKey: ["community-posts"],
    queryFn: () => getAllCommunityPostsAction(),
  });
}

// CREATE HOOK (Optimistic)
export function useCreateCommunityPost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CommunityPostFormProps) => {
      const res = await createCommunityPostAction(data);
      if (!res.success || !res.data?.success)
        throw new Error("Failed to create Post.");
      return res;
    },

    onMutate: async (newPost) => {
      router.prefetch("/dashboard/community");
      await queryClient.cancelQueries({ queryKey: ["community-posts"] });
    },

    onError: (err, newPost, context) => {
      console.log(err);
      toast.error("Failed to create post!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
    onSuccess: () => {
      toast.success("Post sucessfully published!");
      router.push("/dashboard/community");
    },
  });
}

export function useCommunityPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["community-post", slug],
    queryFn: async () => {
      const post = await getCommunityPostBySlug(slug);
      if (!post) throw new Error("Post not found");
      return post;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

// 🎯 UPDATE HOOK (Optimistic)
export function useUpdateCommunityPost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CommunityPostFormProps;
    }) => {
      const res = await updateCommunityPostAction(id, data);
      if (!res.success || !res.data?.success)
        throw new Error("Failed to update post.");
      return res.data;
    },
    onMutate: async ({ id, data }) => {
      router.prefetch("/dashboard/community");
      await queryClient.cancelQueries({ queryKey: ["community-posts"] });
    },
    onError: (err) => {
      toast.error("Update community post failed.");
      console.log(err);
    },
    onSettled: (variables) => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({
        queryKey: ["community-posts", variables?.data?.id],
      });
    },
    onSuccess: () => {
      toast.success("Post successfully updated!");
      router.push("/dashboard/community");
    },
  });
}

// 🎯 DELETE HOOK (Optimistic)
export function useDeleteCommunityPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCommunityPostAction(id);
      if (!res.success || !res.data?.success)
        throw new Error("Failed to delete post.");
      return res;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["community-posts"] });
    },
    onError: (err) => {
      toast.error("Could not delete post.");
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
    onSuccess: () => {
      toast.success("Community Post removed.");
    },
  });
}

export function useCommunityPostById(id: string | undefined) {
  return useQuery({
    queryKey: ["community-post", id],
    queryFn: async () => {
      if (!id) return null;
      const post = await getCommunityPostAction(id);
      console.log(post);
      if (!post || !post.data) throw new Error("Post not found");
      return post.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
