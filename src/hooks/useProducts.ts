import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
} from "@/services/product-service";
import {
  createProductAction,
  deleteProductAction,
  fetchAllProductsAction,
  getFilteredProductsAction,
  getProductByIdAction,
  getProductBySlugAction,
  updateProductAction,
} from "@/lib/actions/product-actions";
import toast from "react-hot-toast";
import { ProductFormData } from "@/types/products";
import { useRouter } from "next/navigation";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await fetchAllProductsAction();

      // // We throw the error so TanStack Query enters the 'error' state
      // if (!res.success) {
      //   throw new Error(res.error);
      // }

      // return res.data;
    },
  });
}

export function useFilteredProducts(params: any) {
  return useQuery({
    queryKey: ["products-filtered", params],
    queryFn: async () => {
      const res = await getFilteredProductsAction(params);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    // Retain previous data while fetching new filters for smoother UX
    placeholderData: (previousData) => previousData,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["product-slug", slug],
    queryFn: async () => {
      return await getProductBySlugAction(slug);
    },
    enabled: !!slug, // Only run if slug exists
  });
}

export function useProductById(id: string) {
  return useQuery({
    queryKey: ["product-id", id],
    queryFn: async () => {
      const res = await getProductByIdAction(id);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!id,
  });
}

/**
 * DELETE PRODUCT HOOK
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    // 🎯 Accept the string directly from the UI
    mutationFn: async (productId: string) => {
      const res = await deleteProductAction(productId);

      // 🎯 Your action returns { success, message, error }
      // There is no res.data, so just check res.success
      if (!res.success || !res.data?.success) {
        throw new Error(res.error || "Failed to delete product");
      }

      return res; // Return the whole response object
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
    },
    onSuccess: (res) => {
      // res is now { success: true, message: "..." }
      toast.success(res.message || "Product removed.");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete product.");
      console.error(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/**
 * CREATE PRODUCT
 */
export function useCreateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: ProductFormData) => {
      const res = await createProductAction(formData);

      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res.data;
    },
    onMutate: async () => {
      // 🏎️ Prefetch the list view while the server works
      router.prefetch("/dashboard/products");
      await queryClient.cancelQueries({ queryKey: ["products"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Product created!");
      // 🚀 Instant transition
      router.push("/dashboard/products");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create product.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

/**
 * UPDATE PRODUCT
 */
export function useUpdateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      formData,
    }: {
      productId: string;
      formData: ProductFormData;
    }) => {
      const res = await updateProductAction(productId, formData);

      if (!res.data?.success || !res.success) throw new Error(res.error);
      return res;
    },
    onMutate: async () => {
      router.prefetch("/dashboard/products");
      await queryClient.cancelQueries({ queryKey: ["products"] });
    },
    onSuccess: (res) => {
      toast.success(res.message || "Product updated!");
      router.push("/dashboard/products");
    },
    onError: (err: any) => {
      toast.error(err.message || "Product update failed.");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
