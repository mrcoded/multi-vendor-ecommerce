"use server";

import { db } from "../db";
import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { revalidatePath } from "next/cache";
import { authenticatedAction, publicQueryAction } from "../auth-wrapper";
import {
  createStoreProducts,
  deleteProduct,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  type ProductQueryParams,
} from "@/services/product-service";
import { ProductServicesProps } from "@/types/products";

export async function getAllProductsAction() {
  return authenticatedAction("Fetch Products", ["VENDOR", "ADMIN"], async () =>
    getAllProducts(),
  );
}

export async function getFilteredProductsAction(params: ProductQueryParams) {
  return publicQueryAction(() => getFilteredProducts(params));
}

export async function getProductBySlugAction(slug: string) {
  return publicQueryAction(() => getProductBySlug(slug));
}

export async function getProductByIdAction(id: string) {
  return authenticatedAction("Fetch Product", ["VENDOR", "ADMIN"], async () =>
    getProductById(id),
  );
}

async function invalidateProductCaches(product: {
  slug: string;
  categoryId: string;
  storeId: string;
}) {
  const store = await db.store.findUnique({
    where: { id: product.storeId },
    select: { slug: true },
  });

  invalidateCacheTag(CACHE_TAGS.productsList);
  invalidateCacheTag(CACHE_TAGS.product(product.slug));
  invalidateCacheTag(CACHE_TAGS.categoriesList);
  if (store?.slug) {
    invalidateCacheTag(CACHE_TAGS.store(store.slug));
  }
}

export async function createProductAction(formData: ProductServicesProps) {
  return authenticatedAction(
    "Create Product",
    ["VENDOR", "ADMIN"],
    async (user) => {
      try {
        if (!formData.productImages || formData.productImages.length === 0) {
          return {
            success: false,
            message: "Validation Error",
            error: "Product images are required!",
          };
        }

        const products = await createStoreProducts(formData);

        const stores = await db.store.findMany({
          where: { id: { in: formData.storeIds } },
          select: { slug: true },
        });

        stores.forEach((s) => invalidateCacheTag(CACHE_TAGS.store(s.slug)));
        invalidateCacheTag(CACHE_TAGS.productsList);
        invalidateCacheTag(CACHE_TAGS.categoriesList);
        invalidateCacheTag(CACHE_TAGS.storesList);
        revalidatePath("/dashboard/products");

        return {
          success: true,
          data: products,
          message: "Products created successfully",
        };
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to create products";
        console.error("[ACTION_ERROR] createProductAction:", error);
        return { success: false, error: message };
      }
    },
  );
}

export async function deleteProductAction(productId: string) {
  return authenticatedAction(
    "Delete Product",
    ["VENDOR", "ADMIN"],
    async (user) => {
      try {
        const product = await db.product.findUnique({
          where: { id: productId },
        });
        if (!product) throw new Error("Product not found");

        if (user.role !== "ADMIN" && product.userId !== user.id) {
          throw new Error("Unauthorized to delete this product");
        }

        await deleteProduct(productId);
        await invalidateProductCaches(product);

        revalidatePath(`/dashboard/stores/${product.storeId}`);
        revalidatePath("/dashboard/products");

        return { success: true, message: "Product deleted successfully" };
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to delete product";
        console.error("[ACTION_ERROR] deleteProductAction:", error);
        return { success: false, error: message };
      }
    },
  );
}

export async function updateProductAction(
  productId: string,
  formData: ProductServicesProps,
) {
  return authenticatedAction(
    "Update Product",
    ["VENDOR", "ADMIN"],
    async (user) => {
      try {
        const existingProduct = await db.product.findUnique({
          where: { id: productId },
        });

        if (!existingProduct) throw new Error("Product not found");

        if (user.role !== "ADMIN" && existingProduct.userId !== user.id) {
          throw new Error("Unauthorized to edit this product");
        }

        const updated = await updateProduct(productId, formData);

        if (existingProduct.slug !== updated.slug) {
          invalidateCacheTag(CACHE_TAGS.product(existingProduct.slug));
        }
        await invalidateProductCaches(updated);

        revalidatePath(`/dashboard/products/${productId}`);
        revalidatePath(`/dashboard/products`);
        revalidatePath(`/products/${updated.slug}`);

        return {
          success: true,
          data: updated,
          message: "Product updated successfully",
        };
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to update product";
        console.error("[ACTION_ERROR] updateProductAction:", error);
        return { success: false, error: message };
      }
    },
  );
}
