import type { Metadata } from "next";

const SITE_NAME = "BelStore";
const DEFAULT_DESCRIPTION =
  "BelStore is a multi-vendor e-commerce platform that allows vendors to showcase and sell their products to customers.";

/** Shared robots directive for private / low-value URLs. */
export const PRIVATE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-snippet": -1,
    "max-image-preview": "none",
    "max-video-preview": -1,
  },
};

/** Paths disallowed in robots.txt (no trailing slashes except /api/). */
export const ROBOTS_DISALLOW_PATHS = [
  "/api/",
  "/dashboard/",
  "/cart",
  "/checkout",
  "/search",
  "/order-confirmation/",
  "/onboarding/",
  "/profile-settings",
  "/login",
  "/register/",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
] as const;

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://belstore.vercel.app"
  );
}

export function buildCanonical(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function hasListingQueryParams(
  params: Record<string, string | string[] | undefined>,
): boolean {
  return Object.keys(params).length > 0;
}

export function noIndexMetadata(
  title: string,
  description?: string,
  path?: string,
): Metadata {
  return {
    title,
    description: description ?? title,
    ...(path ? { alternates: { canonical: path } } : {}),
    robots: PRIVATE_ROBOTS,
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  type?: "website" | "article";
}): Metadata {
  const url = buildCanonical(path);
  const desc = description?.trim() || DEFAULT_DESCRIPTION;
  const imageUrl = image?.startsWith("http")
    ? image
    : image
      ? buildCanonical(image)
      : buildCanonical("/og-image.png");

  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en-US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [imageUrl],
    },
  };
}

export { SITE_NAME, DEFAULT_DESCRIPTION };
