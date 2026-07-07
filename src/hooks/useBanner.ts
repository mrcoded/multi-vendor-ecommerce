import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBannerAction,
  deleteBannerAction,
  getAllBannersAction,
  getBannerByIdAction,
  updateBannerAction,
} from "@/lib/actions/banner-actions";
import { invokeServerAction, runQueryAction } from "@/lib/api/apiRequest";

import { BannerFormProps } from "@/types/banner";

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () =>
      runQueryAction<BannerFormProps[]>(() => getAllBannersAction()),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateBanner() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BannerFormProps) =>
      invokeServerAction(() => createBannerAction(data), "action"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["banners"] });
      router.prefetch("/dashboard/banners");
    },
    onSuccess: () => {
      router.push("/dashboard/banners");
      toast.success("Banner created successfully!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
}

export function useDeleteBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      invokeServerAction(() => deleteBannerAction(id), "action"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["banners"] });
    },
    onSuccess: () => {
      toast.success("Banner deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });
}

export function useBanner(id: string) {
  return useQuery({
    queryKey: ["banner", id],
    queryFn: () =>
      runQueryAction<BannerFormProps | null>(() => getBannerByIdAction(id)),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
}

export function useUpdateBanner() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BannerFormProps }) =>
      invokeServerAction(() => updateBannerAction(id, data)),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["banners"] });
      router.prefetch("/dashboard/banners");
    },
    onSuccess: () => {
      toast.success("Banner successfully updated!");
      router.push("/dashboard/banners");
    },
    onSettled: (_result, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      queryClient.invalidateQueries({ queryKey: ["banner", id] });
    },
  });
}
