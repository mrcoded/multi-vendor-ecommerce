// src/lib/rbac-config.ts

// Define which roles have "Write" access (POST, PUT, DELETE, PATCH)
export const PROTECTED_API_PREFIXES = [
  "/api/products",
  "/api/orders",
  "/api/sales",
  "/api/stores",
];

// Define routes that only ADMINS can touch
export const ADMIN_ONLY_API_ROUTES = [
  "/api/users",
  "/api/vendors",
  "/api/settings",
  "/api/coupons",
  "/api/categories",
];

// Whitelist public API routes (no auth needed)
export const PUBLIC_API_ROUTES = ["/api/auth", "/api/webhooks", "/api/public"];
