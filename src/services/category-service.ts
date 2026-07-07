import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { CategoryFormProps } from "@/types/category";
import { sanitizeCategoryInput } from "@/lib/sanitize-payloads";
import { unstable_cache } from "next/cache";

const getCachedAllCategories = unstable_cache(
  async () => {
    return await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: { products: true },
    });
  },
  ["all-categories-data"],
  {
    tags: [CACHE_TAGS.categoriesList],
    revalidate: CACHE_TTL.catalog,
  },
);

export async function getAllCategories() {
  return getCachedAllCategories();
}

export async function getCategoryBySlug(slug: string) {
  return unstable_cache(
    async () => {
      return await db.category.findUnique({
        where: { slug },
        include: {
          products: {
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    },
    [`category-detail-${slug}`],
    {
      tags: [CACHE_TAGS.categoriesList, CACHE_TAGS.category(slug)],
      revalidate: CACHE_TTL.catalog,
    },
  )();
}

export async function getCategoryById(id: string) {
  return await db.category.findUnique({
    where: { id },
    include: { products: true },
  });
}

export async function createCategory(data: CategoryFormProps) {
  const safeData = sanitizeCategoryInput(data);
  const existing = await db.category.findUnique({
    where: { slug: safeData.slug },
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  return await db.category.create({
    data: {
      title: safeData.title,
      slug: safeData.slug,
      imageUrl: safeData.imageUrl,
      description: safeData.description,
      isActive: safeData.isActive,
    },
  });
}

export async function updateCategory(id: string, data: CategoryFormProps) {
  const safeData = sanitizeCategoryInput(data);
  return await db.category.update({
    where: { id },
    data: {
      title: safeData.title,
      slug: safeData.slug,
      imageUrl: safeData.imageUrl,
      description: safeData.description,
      isActive: safeData.isActive,
    },
  });
}

export async function deleteCategory(id: string) {
  return await db.category.delete({
    where: { id },
  });
}
