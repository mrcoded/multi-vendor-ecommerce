"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import {
  createCategoryAction,
  deleteCategoryAction,
  fetchAllCategoriesAction,
  fetchCategoryByIdAction,
  fetchCategoryBySlugAction,
  updateCategoryAction,
} from "@/lib/actions/category-actions";
import { CategoryFormProps } from "@/types/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetchAllCategoriesAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const res = await fetchCategoryBySlugAction(slug);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!slug,
  });
}

export function useCategoryById(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetchCategoryByIdAction(id);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!id,
  });
}

/**
 * CREATE CATEGORY
 */
export function useCreateCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CategoryFormProps) => {
      const res = await createCategoryAction(formData);
      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res;
    },
    onMutate: async () => {
      router.prefetch("/dashboard/categories");
      await queryClient.cancelQueries({ queryKey: ["categories"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Category added!");
      router.push("/dashboard/categories");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to add category.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

/**
 * UPDATE CATEGORY
 */
export function useUpdateCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: CategoryFormProps;
    }) => {
      const res = await updateCategoryAction(id, formData);
      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res;
    },
    onMutate: async ({ id }) => {
      router.prefetch("/dashboard/categories");
      await queryClient.cancelQueries({ queryKey: ["category", id] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Category updated!");
      router.push("/dashboard/categories");
    },
    onError: (err: any) => {
      toast.error(err.message || "Update failed.");
    },
    onSettled: (res, err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

/**
 * DELETE CATEGORY
 */
export function useDeleteCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCategoryAction(id);
      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res;
    },
    onMutate: async () => {
      router.prefetch("/dashboard/categories");
      await queryClient.cancelQueries({ queryKey: ["categories"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Category deleted!");
      router.push("/dashboard/categories");
    },
    onError: (err: any) => {
      toast.error(err.message || "Delete failed.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
