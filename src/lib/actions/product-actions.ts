"use server";

import { db } from "../db";
import { revalidateTag, revalidatePath, unstable_cache } from "next/cache";
import { authenticatedAction } from "../auth-wrapper";
import {
  createStoreProducts,
  deleteProduct,
  getAllProducts,
  getFilteredProducts,
  getProductById,
  getProductBySlug,
  ProductQueryParams,
  updateProduct,
} from "@/services/product-service";
import { ProductFormData } from "@/types/products";

/**
 * CREATE PRODUCT(S)
 */
export async function createProductAction(formData: ProductFormData) {
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

        // 1. Execute the creation (Transaction-based)
        const products = await createStoreProducts(formData);

        // 2. Cache Invalidation Logic
        const stores = await db.store.findMany({
          where: { id: { in: formData.storeIds } },
          select: { slug: true },
        });

        stores.forEach((s) => revalidateTag(`store-${s.slug}`));
        revalidateTag("products-list");
        revalidateTag(`category-${formData.categoryId}`);
        revalidateTag("stores-list");
        revalidatePath("/dashboard/products");

        return {
          success: true,
          data: products,
          message: "Products created successfully",
        };
      } catch (error: any) {
        console.error("[ACTION_ERROR] createProductAction:", error);
        return {
          success: false,
          error: error.message || "Failed to create products",
        };
      }
    },
  );
}

/**
 * DELETE PRODUCT
 */
export async function deleteProductAction(productId: string) {
  return authenticatedAction(
    "Delete Product",
    ["VENDOR", "ADMIN"],
    async (user) => {
      try {
        const product = await db.product.findUnique({
          where: { id: productId },
        });
        console.log(productId);
        if (!product) throw new Error("Product not found");

        if (user.role !== "ADMIN" && product.userId !== user.id) {
          throw new Error("Unauthorized to delete this product");
        }

        // Pass the string directly
        await deleteProduct(productId);

        revalidateTag(`products-user-${user.id}`);
        revalidatePath(`/dashboard/stores/${product.storeId}`);
        revalidatePath(`/dashboard/products`);

        return { success: true, message: "Product deleted successfully" };
      } catch (error: any) {
        console.error("[ACTION_ERROR] deleteProductAction:", error);
        return {
          success: false,
          error: error.message || "Failed to delete product",
        };
      }
    },
  );
}

/**
 * UPDATE PRODUCT
 */
export async function updateProductAction(
  productId: string,
  formData: ProductFormData,
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

        // Authorization Guard
        if (user.role !== "ADMIN" && existingProduct.userId !== user.id) {
          throw new Error("Unauthorized to edit this product");
        }

        const updated = await updateProduct(productId, formData);

        // Clear Caches
        revalidateTag("products-list");
        // revalidateTag(`product-${updated.slug}`);
        // revalidateTag("stores-list");
        revalidatePath(`/dashboard/products/${productId}`);
        revalidatePath(`/dashboard/products`);

        return {
          success: true,
          data: updated,
          message: "Product updated successfully",
        };
      } catch (error: any) {
        console.error("[ACTION_ERROR] updateProductAction:", error);
        return {
          success: false,
          error: error.message || "Failed to update product",
        };
      }
    },
  );
}

export async function getFilteredProductsAction(params: any) {
  try {
    const data = await getFilteredProducts(params);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to fetch filtered products" };
  }
}

export async function getProductBySlugAction(slug: string) {
  try {
    const data = await getProductBySlug(slug);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Product not found" };
  }
}

// Note: ID lookup usually requires auth for security in the dashboard
export async function getProductByIdAction(id: string) {
  try {
    const data = await getProductById(id);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Product not found" };
  }
}

export async function fetchAllProductsAction() {
  try {
    const data = await getAllProducts();
    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    console.error("[ACTION_ERROR] fetchAllProducts:", error);
    return {
      success: false,
      error: "Failed to fetch products.",
    };
  }
}

export async function fetchFilteredProductsAction(params: ProductQueryParams) {
  try {
    // 🎯 We cache based on the specific filter string
    const getCachedFilteredProducts = unstable_cache(
      async (p: ProductQueryParams) => await getFilteredProducts(p),
      [`products-list-${JSON.stringify(params)}`],
      {
        tags: ["products-list"],
        revalidate: 600, // Cache for 10 minutes
      },
    );

    const data = await getCachedFilteredProducts(params);

    return {
      success: true,
      data,
      message: "Products filtered successfully",
    };
  } catch (error: any) {
    console.error("[FILTER_PRODUCTS_ERROR]:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch products",
    };
  }
}
