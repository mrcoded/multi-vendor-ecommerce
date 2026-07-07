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
  getCommunityPostByIdAction,
  getCommunityPostBySlugAction,
  updateCommunityPostAction,
} from "@/lib/actions/community-actions";
import { invokeServerAction, runQueryAction } from "@/lib/api/apiRequest";
import { CommunityPostFormProps } from "@/types/communityPost";
import { useRouter } from "next/navigation";

export function useCommunityPosts() {
  return useSuspenseQuery({
    queryKey: ["community-posts"],
    queryFn: () =>
      runQueryAction<CommunityPostFormProps[]>(() =>
        getAllCommunityPostsAction(),
      ),
  });
}

export function useCreateCommunityPost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommunityPostFormProps) =>
      invokeServerAction(() => createCommunityPostAction(data), "action"),
    onMutate: async () => {
      router.prefetch("/dashboard/community");
      await queryClient.cancelQueries({ queryKey: ["community-posts"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
    onSuccess: () => {
      toast.success("Post successfully published!");
      router.push("/dashboard/community");
    },
  });
}

export function useCommunityPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["community-post", slug],
    queryFn: () =>
      runQueryAction<CommunityPostFormProps | null>(() =>
        getCommunityPostBySlugAction(slug),
      ),
    enabled: !!slug,
    staleTime: 1000 * 60 * 15,
  });
}

export function useUpdateCommunityPost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CommunityPostFormProps }) =>
      invokeServerAction(() => updateCommunityPostAction(id, data)),
    onMutate: async () => {
      router.prefetch("/dashboard/community");
      await queryClient.cancelQueries({ queryKey: ["community-posts"] });
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      queryClient.invalidateQueries({
        queryKey: ["community-post", variables.id],
      });
    },
    onSuccess: () => {
      toast.success("Post successfully updated!");
      router.push("/dashboard/community");
    },
  });
}

export function useDeleteCommunityPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      invokeServerAction(() => deleteCommunityPostAction(id), "action"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["community-posts"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
    onSuccess: () => {
      toast.success("Community post removed.");
    },
  });
}

export function useCommunityPostById(id: string | undefined) {
  return useQuery({
    queryKey: ["community-post", id],
    queryFn: () =>
      runQueryAction<CommunityPostFormProps | null>(() =>
        getCommunityPostByIdAction(id!),
      ),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
