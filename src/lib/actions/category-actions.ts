"use server";

import { CACHE_TAGS, invalidateCacheTag } from "@/lib/api/cache";
import { revalidatePath } from "next/cache";
import { authenticatedAction, publicQueryAction } from "../auth-wrapper";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
} from "@/services/category-service";
import { CategoryFormProps } from "@/types/category";

export async function getAllCategoriesAction() {
  return publicQueryAction(() => getAllCategories());
}

export async function getCategoryBySlugAction(slug: string) {
  return publicQueryAction(() => getCategoryBySlug(slug));
}

export async function getCategoryByIdAction(id: string) {
  return publicQueryAction(() => getCategoryById(id));
}

export async function createCategoryAction(formData: CategoryFormProps) {
  return authenticatedAction("Create Category", ["ADMIN"], async () => {
    try {
      const newCategory = await createCategory(formData);

      invalidateCacheTag(CACHE_TAGS.categoriesList);
      invalidateCacheTag(CACHE_TAGS.productsList);
      revalidatePath("/dashboard/categories");
      revalidatePath("/store");

      return {
        success: true,
        data: newCategory,
        message: "Category created successfully!",
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create category";
      console.error("[ACTION_ERROR] createCategory:", error);
      return { success: false, error: message };
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

      if (user.role !== "ADMIN") {
        throw new Error("Unauthorized!");
      }

      const updated = await updateCategory(id, formData);

      invalidateCacheTag(CACHE_TAGS.categoriesList);
      invalidateCacheTag(CACHE_TAGS.category(existing.slug));
      invalidateCacheTag(CACHE_TAGS.category(updated.slug));
      invalidateCacheTag(CACHE_TAGS.categoryById(id));

      revalidatePath("/dashboard/categories");
      revalidatePath(`/category/${updated.slug}`);
      if (existing.slug !== updated.slug) {
        revalidatePath(`/category/${existing.slug}`);
      }
      revalidatePath("/store");

      return {
        success: true,
        data: updated,
        message: "Category updated successfully!",
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update category";
      console.error("[ACTION_ERROR] updateCategory:", error);
      return { success: false, error: message };
    }
  });
}

export async function deleteCategoryAction(id: string) {
  return authenticatedAction("Delete Category", ["ADMIN"], async (user) => {
    try {
      const existing = await getCategoryById(id);
      if (!existing) throw new Error("Category not found");

      if (user.role !== "ADMIN") {
        throw new Error("Unauthorized!");
      }

      await deleteCategory(id);

      invalidateCacheTag(CACHE_TAGS.categoriesList);
      invalidateCacheTag(CACHE_TAGS.category(existing.slug));
      invalidateCacheTag(CACHE_TAGS.categoryById(id));
      revalidatePath("/dashboard/categories");

      return { success: true, message: "Category deleted successfully!" };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete category.";
      console.error("[ACTION_ERROR] deleteCategory:", error);
      return { success: false, error: message };
    }
  });
}
