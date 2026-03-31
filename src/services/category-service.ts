import { db } from "@/lib/db";
import { CategoryFormProps } from "@/types/category";
import { unstable_cache } from "next/cache";

export async function getAllCategories() {
  // 🎯 THE SERVICE WRAPPER: Handles Data + Global Caching
  const getCachedCategories = unstable_cache(
    async () => {
      return await db.category.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          products: true, // 🚀 Pragmatic: Only get the count for lists
        },
      });
    },
    ["all-categories-data"], // Static key for the full list
    {
      tags: ["categories-list"],
      revalidate: 3600, // 1 hour TTL
    },
  );

  return await getCachedCategories();
}

export async function getCategoryBySlug(slug: string) {
  // 🎯 THE SERVICE WRAPPER: Handles Data + Caching
  const getCachedCategory = unstable_cache(
    async (s: string) => {
      return await db.category.findUnique({
        where: { slug: s },
        include: {
          products: {
            where: { isActive: true }, // Pragmatic: only fetch active products for the public
            orderBy: { createdAt: "desc" },
          },
        },
      });
    },
    [`category-detail-${slug}`], // Unique Key
    {
      tags: [`category-${slug}`, "categories-list"],
      revalidate: 3600,
    },
  );

  return await getCachedCategory(slug);
}

export async function getCategoryById(id: string) {
  return await db.category.findUnique({
    where: { id },
    include: { products: true },
  });
}

export async function createCategory(data: CategoryFormProps) {
  const existing = await db.category.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  return await db.category.create({
    data: {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl,
      description: data.description,
      isActive: data.isActive,
    },
  });
}

export async function updateCategory(id: string, data: CategoryFormProps) {
  return await db.category.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl,
      description: data.description,
      isActive: data.isActive,
    },
  });
}

export async function deleteCategory(id: string) {
  return await db.category.delete({
    where: { id },
  });
}
