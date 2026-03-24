"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

import {
  createStoreAction,
  deleteStoreAction,
  fetchAllStoresAction,
  fetchStoreByIdAction,
  fetchStoreBySlugAction,
  updateStoreAction,
} from "@/lib/actions/store-actions";
import { StoreProps } from "@/types/store";

export function useAllStores() {
  return useSuspenseQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const res = await fetchAllStoresAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });
}

// GET By ID Hook
export function useStoreById(id?: string) {
  return useQuery({
    queryKey: ["store", "id", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetchStoreByIdAction(id);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!id,
  });
}

//  * CREATE STORE HOOK
//  */
export function useCreateStore() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: StoreProps) => {
      const res = await createStoreAction(formData);
      // 🚀 Bridge the Action error to TanStack Query
      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res;
    },
    onMutate: async () => {
      router.prefetch("/dashboard/stores");
      await queryClient.cancelQueries({ queryKey: ["stores"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Store created successfully!");
      router.push("/dashboard/stores");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create store.");
      console.error(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

/**
 * UPDATE STORE HOOK
 */
export function useUpdateStore() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: StoreProps;
    }) => {
      const res = await updateStoreAction(id, formData);
      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res;
    },
    onMutate: async ({ id }) => {
      router.prefetch("/dashboard/stores");
      await queryClient.cancelQueries({ queryKey: ["store", id] });
      await queryClient.cancelQueries({ queryKey: ["stores"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Store successfully updated!");
      router.push("/dashboard/stores");
    },
    onError: (err: any) => {
      toast.error(err.message || "Store update failed.");
      console.error(err);
    },
    onSettled: (res, err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["store", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

/**
 * DELETE STORE HOOK
 */
export function useDeleteStore() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteStoreAction(id);
      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res;
    },
    onMutate: async () => {
      router.prefetch("/dashboard/stores");
      await queryClient.cancelQueries({ queryKey: ["stores"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Store successfully deleted!");
      // Only redirects if not already on the stores page
      router.push("/dashboard/stores");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete store.");
      console.error(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

export function useStoreBySlug(slug: string) {
  return useQuery({
    queryKey: ["store", "slug", slug],
    queryFn: async () => {
      const res = await fetchStoreBySlugAction(slug);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!slug,
  });
}
