"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { authenticatedAction } from "../auth-wrapper";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
} from "@/services/category-service";
import { CategoryFormProps } from "@/types/category";

export async function createCategoryAction(formData: CategoryFormProps) {
  return authenticatedAction("Create Category", ["ADMIN"], async () => {
    try {
      const newCategory = await createCategory(formData);

      revalidateTag("categories-list");
      revalidateTag("products-list");
      revalidatePath("/dashboard/categories");
      revalidatePath("/store");

      return {
        success: true,
        data: newCategory,
        message: "Category created successfully!",
      };
    } catch (error: any) {
      console.error("[ACTION_ERROR] createCategory:", error);
      return {
        success: false,
        error: error.message || "Failed to create category",
      };
    }
  });
}

export async function updateCategoryAction(
  id: string,
  formData: CategoryFormProps,
) {
  return authenticatedAction("Update Category", ["ADMIN"], async (user) => {
    try {
      const existing = await getCategoryById(id);
      if (!existing) throw new Error("Category not found");

      // Authorization check
      if (user.role !== "ADMIN") {
        throw new Error("Unauthorized!");
      }

      const updated = await updateCategory(id, formData);

      revalidateTag("categories-list");
      revalidateTag(`category-${updated.slug}`);
      revalidateTag(`category-${id}`);

      revalidatePath("/dashboard/categories");
      revalidatePath(`/category/${updated.slug}`);
      revalidatePath("/store");

      return {
        success: true,
        data: updated,
        message: "Category updated successfully!",
      };
    } catch (error: any) {
      console.error("[ACTION_ERROR] updateCategory:", error);
      return {
        success: false,
        error: error.message || "Failed to update category",
      };
    }
  });
}

export async function deleteCategoryAction(id: string) {
  return authenticatedAction("Delete Category", ["ADMIN"], async (user) => {
    try {
      const existing = await getCategoryById(id);
      if (!existing) throw new Error("Category not found");

      // Authorization check
      if (user.role !== "ADMIN") {
        throw new Error("Unauthorized!");
      }

      await deleteCategory(id);

      revalidateTag("categories-list");
      revalidatePath("/dashboard/categories");

      return { success: true, message: "Category deleted successfully!" };
    } catch (error: any) {
      console.error("[ACTION_ERROR] deleteCategory:", error);
      // This will catch Prisma P2014 if products are still linked to this category
      return {
        success: false,
        error: error.message || "Failed to delete category.",
      };
    }
  });
}

export async function fetchAllCategoriesAction() {
  try {
    const getCachedCategories = unstable_cache(
      async () => await getAllCategories(),
      ["all-categories-data"],
      { tags: ["categories-list"], revalidate: 3600 },
    );

    const data = await getCachedCategories();

    // Ensure plain JSON for Client Components
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return { success: false, error: "Unable to fetch categories" };
  }
}

/**
 * FETCH CATEGORY BY SLUG
 */
export async function fetchCategoryBySlugAction(slug: string) {
  try {
    if (!slug) return { success: false, error: "Slug is required" };

    const getCachedCategory = unstable_cache(
      async (slug: string) => await getCategoryBySlug(slug),
      [`category-detail-${slug}`],
      { tags: [`category-${slug}`], revalidate: 3600 },
    );

    const data = await getCachedCategory(slug);

    if (!data) return { success: false, error: "Category not found" };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: any) {
    return { success: false, error: "Failed to fetch category" };
  }
}

export async function fetchCategoryByIdAction(id: string) {
  try {
    const category = await getCategoryById(id);
    return { success: true, data: category };
  } catch (error) {
    return { success: false, error: "Failed to fetch category" };
  }
}
