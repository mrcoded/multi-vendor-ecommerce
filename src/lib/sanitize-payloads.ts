import { CommunityPostFormProps } from "@/types/communityPost";
import { CategoryFormProps } from "@/types/category";
import { StoreProps } from "@/types/store";
import { ProductServicesProps } from "@/types/products";
import { CheckoutProps } from "@/types/order";
import { CreateUserProps, UserProfileProps } from "@/types/user";
import { VendorProps } from "@/types/vendors";
import { BannerFormProps } from "@/types/banner";
import { CouponFormProps } from "@/components/forms/CouponForm";
import {
  LIMITS,
  sanitizeBoolean,
  sanitizeEmail,
  sanitizeObjectId,
  sanitizeOptionalPlainText,
  sanitizePhone,
  sanitizePlainText,
  sanitizeRichHtml,
  sanitizeSearchQuery,
  sanitizeSlug,
  sanitizeStringArray,
  sanitizeUrl,
} from "@/lib/sanitize";

export function sanitizeUserRegistrationInput(
  data: CreateUserProps,
): CreateUserProps {
  return {
    ...data,
    name: sanitizePlainText(data.name, LIMITS.short),
    email: sanitizeEmail(data.email),
    password: String(data.password ?? ""),
    plan: sanitizeOptionalPlainText(data.plan, LIMITS.short),
    status: sanitizeBoolean(data.status, true),
  };
}

export function sanitizeUserProfileInput(
  data: UserProfileProps["profile"],
): UserProfileProps["profile"] {
  return {
    ...data,
    userId: sanitizeObjectId(data.userId) || data.userId,
    email: sanitizeEmail(data.email),
    firstName: sanitizePlainText(data.firstName, LIMITS.short),
    lastName: sanitizePlainText(data.lastName, LIMITS.short),
    userName: sanitizePlainText(data.userName, LIMITS.short),
    phone: sanitizePhone(data.phone),
    streetAddress: sanitizePlainText(data.streetAddress, LIMITS.medium),
    city: sanitizePlainText(data.city, LIMITS.short),
    district: sanitizePlainText(data.district, LIMITS.short),
    country: sanitizePlainText(data.country, LIMITS.short),
    profileImage: sanitizeUrl(data.profileImage),
    dateOfBirth: data.dateOfBirth,
  };
}

export function sanitizeVendorProfileInput(
  data: VendorProps["vendorProfile"],
): VendorProps["vendorProfile"] {
  return {
    ...data,
    userId: sanitizeObjectId(data.userId) || data.userId,
    code: sanitizePlainText(data.code, LIMITS.short),
    email: sanitizeEmail(data.email),
    firstName: sanitizePlainText(data.firstName, LIMITS.short),
    lastName: sanitizePlainText(data.lastName, LIMITS.short),
    phone: sanitizePhone(data.phone),
    physicalAddress: sanitizeOptionalPlainText(
      data.physicalAddress,
      LIMITS.medium,
    ),
    contactPerson: sanitizeOptionalPlainText(data.contactPerson, LIMITS.short),
    contactPersonPhone: sanitizePhone(data.contactPersonPhone ?? ""),
    notes: sanitizeOptionalPlainText(data.notes, LIMITS.long),
    terms: sanitizeOptionalPlainText(data.terms, LIMITS.medium),
    imageUrl: data.imageUrl ? sanitizeUrl(data.imageUrl) : null,
    products: sanitizeStringArray(data.products),
  };
}

export function sanitizeStoreInput(data: StoreProps): StoreProps {
  return {
    ...data,
    id: data.id,
    title: sanitizePlainText(data.title, LIMITS.short),
    slug: sanitizeSlug(data.slug),
    description: sanitizeOptionalPlainText(data.description, LIMITS.long),
    imageUrl: data.imageUrl ? sanitizeUrl(data.imageUrl) : null,
    categoryIds: Array.isArray(data.categoryIds)
      ? data.categoryIds.map((id) => sanitizeObjectId(id)).filter(Boolean)
      : [],
    vendorId: sanitizeObjectId(data.vendorId) || data.vendorId,
    storeEmail: sanitizeEmail(data.storeEmail),
    storePhone: sanitizePhone(data.storePhone),
    streetAddress: sanitizePlainText(data.streetAddress, LIMITS.medium),
    city: sanitizePlainText(data.city, LIMITS.short),
    country: sanitizePlainText(data.country, LIMITS.short),
    isActive: sanitizeBoolean(data.isActive, true),
  };
}

export function sanitizeProductInput(
  data: ProductServicesProps,
): ProductServicesProps {
  return {
    ...data,
    title: sanitizePlainText(data.title, LIMITS.short),
    slug: sanitizeSlug(data.slug),
    description: sanitizeOptionalPlainText(data.description, LIMITS.long),
    sku: sanitizeOptionalPlainText(data.sku, LIMITS.sku),
    barcode: sanitizeOptionalPlainText(data.barcode, LIMITS.sku),
    productCode: sanitizeOptionalPlainText(data.productCode, LIMITS.sku),
    tags: sanitizeStringArray(data.tags),
    imageUrl: sanitizeUrl(data.imageUrl),
    productImages: Array.isArray(data.productImages)
      ? data.productImages.map((url) => sanitizeUrl(url)).filter(Boolean)
      : [],
    categoryId: sanitizeObjectId(data.categoryId) || data.categoryId,
    storeId: sanitizeObjectId(data.storeId) || data.storeId,
    storeIds: Array.isArray(data.storeIds)
      ? data.storeIds.map((id) => sanitizeObjectId(id)).filter(Boolean)
      : [],
    userId: sanitizeObjectId(data.userId) || data.userId,
    isActive: sanitizeBoolean(data.isActive, true),
    isWholesale: sanitizeBoolean(data.isWholesale, false),
  };
}

export function sanitizeCategoryInput(
  data: CategoryFormProps,
): CategoryFormProps {
  return {
    ...data,
    title: sanitizePlainText(data.title, LIMITS.short),
    slug: sanitizeSlug(data.slug),
    description: sanitizePlainText(data.description, LIMITS.long),
    imageUrl: sanitizeUrl(data.imageUrl),
    isActive: sanitizeBoolean(data.isActive, true),
  };
}

export function sanitizeCommunityPostInput(
  data: CommunityPostFormProps,
): CommunityPostFormProps {
  return {
    ...data,
    id: data.id,
    title: sanitizePlainText(data.title, LIMITS.short),
    slug: sanitizeSlug(data.slug),
    description: sanitizePlainText(data.description, LIMITS.medium),
    content: sanitizeRichHtml(data.content),
    imageUrl: sanitizeUrl(data.imageUrl),
    categoryId: sanitizeObjectId(data.categoryId) || data.categoryId,
    isActive: sanitizeBoolean(data.isActive, true),
  };
}

export function sanitizeBannerInput(data: BannerFormProps): BannerFormProps {
  return {
    ...data,
    title: sanitizePlainText(data.title, LIMITS.short),
    link: sanitizeUrl(data.link),
    imageUrl: sanitizeUrl(data.imageUrl),
    isActive: sanitizeBoolean(data.isActive, true),
  };
}

export function sanitizeCouponInput(data: CouponFormProps): CouponFormProps {
  return {
    ...data,
    title: sanitizePlainText(data.title, LIMITS.short),
    couponCode: sanitizePlainText(data.couponCode, LIMITS.short)
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, ""),
    vendorId: sanitizeObjectId(data.vendorId) || data.vendorId,
    isActive: sanitizeBoolean(data.isActive, true),
    expiryDate: data.expiryDate,
  };
}

export function sanitizeCheckoutInput(data: CheckoutProps): CheckoutProps {
  return {
    ...data,
    userId: sanitizeObjectId(data.userId) || data.userId,
    firstName: sanitizePlainText(data.firstName, LIMITS.short),
    lastName: sanitizePlainText(data.lastName, LIMITS.short),
    emailAddress: sanitizeEmail(data.emailAddress),
    phone: sanitizePhone(data.phone),
    streetAddress: sanitizePlainText(data.streetAddress, LIMITS.medium),
    city: sanitizePlainText(data.city, LIMITS.short),
    country: sanitizePlainText(data.country, LIMITS.short),
    district: sanitizePlainText(data.district, LIMITS.short),
    shippingCost: sanitizePlainText(data.shippingCost, LIMITS.short),
    paymentMethod: sanitizePlainText(data.paymentMethod, LIMITS.short),
    paymentToken: sanitizePlainText(data.paymentToken, LIMITS.medium),
  };
}

export function sanitizeProductSearchParams(params: {
  search?: string;
  page?: string;
  catId?: string;
  min?: string;
  max?: string;
  sort?: string;
}) {
  return {
    ...params,
    search: params.search ? sanitizeSearchQuery(params.search) : undefined,
    page: params.page ? sanitizePlainText(params.page, 4) : undefined,
    catId: params.catId
      ? sanitizeObjectId(params.catId) || undefined
      : undefined,
    min: params.min ? sanitizePlainText(params.min, 12) : undefined,
    max: params.max ? sanitizePlainText(params.max, 12) : undefined,
    sort:
      params.sort === "asc" || params.sort === "desc" ? params.sort : undefined,
  };
}
