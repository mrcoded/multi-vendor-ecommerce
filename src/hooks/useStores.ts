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
  getAllStoresAction,
  getStoreByIdAction,
  getStoreBySlugAction,
  updateStoreAction,
} from "@/lib/actions/store-actions";
import {
  invokeServerAction,
  runQueryAction,
  type SuccessfulActionResult,
} from "@/lib/api/apiRequest";
import { StoreProps } from "@/types/store";

export function useAllStores() {
  return useSuspenseQuery({
    queryKey: ["stores"],
    queryFn: () => runQueryAction<StoreProps[]>(() => getAllStoresAction()),
  });
}

export function useStoreById(id?: string) {
  return useQuery({
    queryKey: ["store", "id", id],
    queryFn: () =>
      runQueryAction<StoreProps | null>(() => getStoreByIdAction(id!)),
    enabled: !!id,
  });
}

export function useCreateStore() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: StoreProps) =>
      invokeServerAction<SuccessfulActionResult>(
        () => createStoreAction(formData),
        "action",
      ),
    onMutate: async () => {
      router.prefetch("/dashboard/stores");
      await queryClient.cancelQueries({ queryKey: ["stores"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Store created successfully!");
      router.push("/dashboard/stores");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

export function useUpdateStore() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: StoreProps }) =>
      invokeServerAction<SuccessfulActionResult>(
        () => updateStoreAction(id, formData),
        "action",
      ),
    onMutate: async ({ id }) => {
      router.prefetch("/dashboard/stores");
      await queryClient.cancelQueries({ queryKey: ["store", id] });
      await queryClient.cancelQueries({ queryKey: ["stores"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Store successfully updated!");
      router.push("/dashboard/stores");
    },
    onSettled: (_res, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["store", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

export function useDeleteStore() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      invokeServerAction<SuccessfulActionResult>(
        () => deleteStoreAction(id),
        "action",
      ),
    onMutate: async () => {
      router.prefetch("/dashboard/stores");
      await queryClient.cancelQueries({ queryKey: ["stores"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Store successfully deleted!");
      router.push("/dashboard/stores");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

export function useStoreBySlug(slug: string) {
  return useQuery({
    queryKey: ["store", "slug", slug],
    queryFn: () =>
      runQueryAction<StoreProps | null>(() => getStoreBySlugAction(slug)),
    enabled: !!slug,
  });
}
