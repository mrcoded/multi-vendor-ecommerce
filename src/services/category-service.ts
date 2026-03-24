import { db } from "@/lib/db";
import { CategoryFormProps } from "@/types/category";
import { unstable_cache } from "next/cache";

export async function getAllCategories() {
  return await db.category.findMany({
    orderBy: { createdAt: "desc" },
    include: { products: true },
  });
}

export async function getCategoryBySlug(slug: string) {
  return await db.category.findUnique({
    where: { slug },
    include: { products: true },
  });
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
