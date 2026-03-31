import { db } from "@/lib/db";
import { StoreProps } from "@/types/store";
import { unstable_cache } from "next/cache";

export async function getAllStores() {
  return unstable_cache(
    async () => {
      return await db.store.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { products: true } } },
      });
    },
    ["all-stores-list"],
    { tags: ["stores-list"] },
  )();
}

export async function createStore(data: StoreProps) {
  //Check if slug is unique
  const existingStore = await db.store.findUnique({
    where: { slug: data.slug },
  });

  if (existingStore) {
    throw new Error("Store already exists.");
  }

  //Create the store
  return await db.store.create({
    data: {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl,
      description: data.description,
      isActive: data.isActive,
      categoryIds: data.categoryIds,
      vendorId: data.vendorId,
      storeEmail: data.storeEmail,
      storePhone: data.storePhone,
      streetAddress: data.streetAddress,
      city: data.city,
      country: data.country,
    },
  });
}

export async function getStoreById(id: string) {
  return await unstable_cache(
    async () => {
      return await db.store.findUnique({
        where: { id },
        include: { products: true },
      });
    },
    [`store-${id}`],
    {
      revalidate: 3600,
      tags: ["stores", `store-${id}`],
    },
  )();
}

export async function updateStore(id: string, data: StoreProps) {
  //  Check for Slug Collision
  // We look for a product with this slug that IS NOT the current product
  const existingSlug = await db.product.findFirst({
    where: {
      slug: data.slug,
      NOT: { id: id },
    },
  });

  if (existingSlug) {
    throw new Error(`"${data.slug}" is already in use by another product.`);
  }

  return await db.store.update({
    where: { id },
    data,
  });
}

export async function deleteStore(id: string) {
  return await db.store.delete({
    where: { id },
  });
}

export async function getStoreBySlug(slug: string) {
  return unstable_cache(
    async () => {
      return await db.store.findUnique({
        where: { slug },
        include: { _count: { select: { products: true } } },
      });
    },
    [`store-detail-${slug}`],
    { tags: [`store-${slug}`] }, // This matches your product action's revalidateTag!
  )();
}
