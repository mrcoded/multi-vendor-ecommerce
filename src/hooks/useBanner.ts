import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBanners } from "@/services/banner-service";
import {
  createBannerAction,
  deleteBannerAction,
  fetchBannerByIdAction,
  updateBannerAction,
} from "@/lib/actions/banner-actions";

import { BannerFormProps } from "@/types/banner";

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      return await getAllBanners();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateBanner() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BannerFormProps) => {
      const res = await createBannerAction(data);
      if (!res.success) throw new Error("Failed to create banner.");
      return res;
    },

    //  The Optimistic Update
    onMutate: async () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["banners"] });
      router.prefetch("/dashboard/banners");
    },
    onError: (err, newBanner, context) => {
      console.log(err);
      toast.error("Failed to create banner.");
    },
    onSuccess: () => {
      router.push("/dashboard/banners");
      toast.success("Banner created Successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
}

export function useDeleteBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteBannerAction(id);
      if (!res.success) throw new Error("Failed to delete banner.");
      return res;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["banners"] });
    },
    onError: (err, id, context) => {
      console.log(err);
      toast.error("Unable to delete banner.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onSuccess: () => {
      toast.success("Banner deleted successfully");
    },
  });
}

export function useBanner(id: string) {
  return useQuery({
    // 🎯 KEY: The queryKey must match the specific ID
    queryKey: ["banner", id],
    queryFn: async () => {
      const data = await fetchBannerByIdAction(id);
      console.log(data);
      if (!data) throw new Error("Banner not found");
      return data;
    },
    // Prevent constant refetching for static data like a banner
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!id, // Only run if ID exists
  });
}

export function useUpdateBanner() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: BannerFormProps }) => {
      const res = await updateBannerAction(id, data);
      if (!res.success) throw new Error("Failed to update banner.");
      return res.data;
    },
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches so they don't overwrite us
      await queryClient.cancelQueries({ queryKey: ["banners"] });
      router.prefetch("/dashboard/banners");
    },

    onError: (err, variables, context) => {
      console.log(err);
      toast.error("Failed to update banner!");
    },
    onSuccess: () => {
      toast.success("Banner successfully updated!");
      router.push("/dashboard/banners");
    },
    // 🎯 STEP 3: Final Sync (The "Truth")
    onSettled: (result, error, { id }) => {
      // Invalidate both the list and the specific detail view
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banner", id] });
    },
  });
}
