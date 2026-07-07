/** Centralized cache tags and TTLs for Next.js Data Cache (unstable_cache / revalidateTag). */

import { revalidateTag, updateTag } from "next/cache";

export const CACHE_TAGS = {
  productsList: "products-list",
  product: (slug: string) => `product-${slug}`,
  categoriesList: "categories-list",
  category: (slug: string) => `category-${slug}`,
  categoryById: (id: string) => `category-id-${id}`,
  storesList: "stores-list",
  store: (slug: string) => `store-${slug}`,
  storeById: (id: string) => `store-id-${id}`,
  bannersList: "banners-list",
  banner: (id: string) => `banner-${id}`,
  communityPosts: "community-posts",
  postBySlug: (slug: string) => `post-${slug}`,
  postById: (id: string) => `post-${id}`,
  couponsList: "coupons-list",
  coupon: (id: string) => `coupon-${id}`,
  vendorsList: "vendors-list",
  vendor: (id: string) => `vendor-${id}`,
  usersList: "users-list",
  ordersList: "orders-list",
  order: (id: string) => `order-${id}`,
  salesList: "sales-list",
  salesVendor: (vendorId: string) => `sales-vendor-${vendorId}`,
} as const;

/** Seconds — fallback TTL when tag-based invalidation is missed. */
export const CACHE_TTL = {
  catalog: 3600,
  products: 600,
  dashboard: 120,
} as const;

/**
 * Invalidate a cache tag from a Server Action (read-your-own-writes).
 * Prefer this over revalidateTag inside mutations.
 */
export function invalidateCacheTag(tag: string) {
  updateTag(tag);
}

/** Purge a cache tag from Route Handlers or other non-action server code. */
export function purgeCacheTag(tag: string) {
  revalidateTag(tag, "max");
}

export function invalidateCacheTags(tags: string[]) {
  for (const tag of tags) {
    invalidateCacheTag(tag);
  }
}
