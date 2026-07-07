import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProductAction,
  deleteProductAction,
  getAllProductsAction,
  getFilteredProductsAction,
  getProductByIdAction,
  getProductBySlugAction,
  updateProductAction,
} from "@/lib/actions/product-actions";

import {
  invokeServerAction,
  runQueryAction,
  type ServiceResult,
  type SuccessfulActionResult,
} from "@/lib/api/apiRequest";

import { ProductFormData, ProductServicesProps } from "@/types/products";

import type { ProductQueryParams } from "@/services/product-service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],

    queryFn: () =>
      runQueryAction<ProductFormData[]>(() => getAllProductsAction()),
  });
}

export function useFilteredProducts(params: ProductQueryParams) {
  return useQuery({
    queryKey: ["products-filtered", params],

    queryFn: () =>
      runQueryAction<ProductFormData[]>(() =>
        getFilteredProductsAction(params),
      ),

    placeholderData: (previousData) => previousData,
  });
}

export function useProductBySlug(slug?: string) {
  return useQuery({
    queryKey: ["product-slug", slug],

    queryFn: () =>
      runQueryAction<ProductFormData | null>(() =>
        getProductBySlugAction(slug!),
      ),

    enabled: !!slug,
  });
}

export function useProductById(id?: string) {
  return useQuery({
    queryKey: ["product-id", id],

    queryFn: () =>
      runQueryAction<ProductFormData | null>(() => getProductByIdAction(id!)),

    enabled: !!id,
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      invokeServerAction<SuccessfulActionResult>(
        () => deleteProductAction(productId),

        "action",
      ),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
    },

    onSuccess: (res) => {
      toast.success(res.message || "Product removed.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateProduct() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: ProductServicesProps) =>
      invokeServerAction<ServiceResult<unknown>>(
        () => createProductAction(formData),

        "service",
      ),

    onMutate: async () => {
      router.prefetch("/dashboard/products");

      await queryClient.cancelQueries({ queryKey: ["products"] });
    },

    onSuccess: (res) => {
      toast.success(res.message || "Product created!");

      router.push("/dashboard/products");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,

      formData,
    }: {
      productId: string;

      formData: ProductServicesProps;
    }) =>
      invokeServerAction<SuccessfulActionResult>(
        () => updateProductAction(productId, formData),

        "action",
      ),

    onMutate: async () => {
      router.prefetch("/dashboard/products");

      await queryClient.cancelQueries({ queryKey: ["products"] });
    },

    onSuccess: (res) => {
      toast.success(res.message || "Product updated!");

      router.push("/dashboard/products");
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
