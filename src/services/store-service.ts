import { db } from "@/lib/db";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/api/cache";
import { StoreProps } from "@/types/store";
import { sanitizeStoreInput } from "@/lib/sanitize-payloads";
import { unstable_cache } from "next/cache";

const getCachedAllStores = unstable_cache(
  async () => {
    return await db.store.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { products: true } } },
    });
  },
  ["all-stores-list"],
  { tags: [CACHE_TAGS.storesList], revalidate: CACHE_TTL.catalog },
);

export async function getAllStores() {
  return getCachedAllStores();
}

export async function createStore(data: StoreProps) {
  const safeData = sanitizeStoreInput(data);
  const existingStore = await db.store.findUnique({
    where: { slug: safeData.slug },
  });

  if (existingStore) {
    throw new Error("Store already exists.");
  }

  return await db.store.create({
    data: {
      title: safeData.title,
      slug: safeData.slug,
      imageUrl: safeData.imageUrl,
      description: safeData.description,
      isActive: safeData.isActive,
      categoryIds: safeData.categoryIds,
      vendorId: safeData.vendorId,
      storeEmail: safeData.storeEmail,
      storePhone: safeData.storePhone,
      streetAddress: safeData.streetAddress,
      city: safeData.city,
      country: safeData.country,
    },
  });
}

const getCachedStoreById = unstable_cache(
  async (id: string) => {
    return await db.store.findUnique({
      where: { id },
      include: { products: true },
    });
  },
  ["store-by-id"],
  {
    tags: [CACHE_TAGS.storesList],
    revalidate: CACHE_TTL.catalog,
  },
);

export async function getStoreById(id: string) {
  return getCachedStoreById(id);
}

export async function updateStore(id: string, data: StoreProps) {
  const safeData = sanitizeStoreInput(data);
  const existingSlug = await db.product.findFirst({
    where: {
      slug: safeData.slug,
      NOT: { id: id },
    },
  });

  if (existingSlug) {
    throw new Error(`"${safeData.slug}" is already in use by another product.`);
  }

  return await db.store.update({
    where: { id },
    data: safeData,
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
    {
      tags: [CACHE_TAGS.storesList, CACHE_TAGS.store(slug)],
      revalidate: CACHE_TTL.catalog,
    },
  )();
}
