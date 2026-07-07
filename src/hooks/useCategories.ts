"use client";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import {
  createCategoryAction,
  deleteCategoryAction,
  getAllCategoriesAction,
  getCategoryByIdAction,
  getCategoryBySlugAction,
  updateCategoryAction,
} from "@/lib/actions/category-actions";

import {
  invokeServerAction,
  runQueryAction,
  type SuccessfulActionResult,
} from "@/lib/api/apiRequest";

import { CategoryFormProps, CategoryProps } from "@/types/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],

    queryFn: () =>
      runQueryAction<CategoryProps[]>(() => getAllCategoriesAction()),

    staleTime: 1000 * 60 * 5,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ["category", slug],

    queryFn: () =>
      runQueryAction<CategoryFormProps | null>(() =>
        getCategoryBySlugAction(slug),
      ),

    enabled: !!slug,
  });
}

export function useCategoryById(id: string) {
  return useQuery({
    queryKey: ["category", id],

    queryFn: () =>
      runQueryAction<CategoryFormProps | null>(() => getCategoryByIdAction(id)),

    enabled: !!id,
  });
}

export function useCreateCategory() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: CategoryFormProps) =>
      invokeServerAction<SuccessfulActionResult>(
        () => createCategoryAction(formData),

        "action",
      ),

    onMutate: async () => {
      router.prefetch("/dashboard/categories");

      await queryClient.cancelQueries({ queryKey: ["categories"] });
    },

    onSuccess: (res) => {
      toast.success(res.message || "Category added!");

      router.push("/dashboard/categories");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,

      formData,
    }: {
      id: string;

      formData: CategoryFormProps;
    }) =>
      invokeServerAction<SuccessfulActionResult>(
        () => updateCategoryAction(id, formData),

        "action",
      ),

    onMutate: async ({ id }) => {
      router.prefetch("/dashboard/categories");

      await queryClient.cancelQueries({ queryKey: ["category", id] });
    },

    onSuccess: (res) => {
      toast.success(res.message || "Category updated!");

      router.push("/dashboard/categories");
    },

    onSettled: (_res, _err, variables) => {
      queryClient.invalidateQueries({ queryKey: ["category", variables.id] });

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      invokeServerAction<SuccessfulActionResult>(
        () => deleteCategoryAction(id),

        "action",
      ),

    onMutate: async () => {
      router.prefetch("/dashboard/categories");

      await queryClient.cancelQueries({ queryKey: ["categories"] });
    },

    onSuccess: (res) => {
      toast.success(res.message || "Category deleted!");

      router.push("/dashboard/categories");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
