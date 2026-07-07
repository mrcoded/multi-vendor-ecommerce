import DOMPurify, { type Config } from "isomorphic-dompurify";

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const LIMITS = {
  short: 120,
  medium: 500,
  long: 1000,
  richHtml: 1200,
  email: 254,
  phone: 30,
  url: 204,
  slug: 200,
  sku: 64,
  search: 200,
  tag: 64,
  tags: 30,
} as const;

const RICH_HTML_CONFIG: Config = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "pre",
    "code",
    "span",
  ],
  ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "target", "rel"],
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: [
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "form",
    "input",
  ],
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover"],
};

function toOptionalString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  return String(value);
}

function stripControlChars(value: string) {
  return value.replace(CONTROL_CHARS, "");
}

function collapseWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

export function sanitizePlainText(
  value: unknown,
  maxLength: number = LIMITS.medium,
): string {
  const raw = stripControlChars(String(value ?? ""));
  const withoutTags = raw.replace(/<[^>]*>/g, "");
  const normalized = collapseWhitespace(withoutTags);

  return truncate(normalized, maxLength);
}

export function sanitizeOptionalPlainText(
  value: unknown,
  maxLength: number = LIMITS.medium,
): string | null {
  const optional = toOptionalString(value);
  if (optional === undefined) return null;

  const sanitized = sanitizePlainText(optional, maxLength);
  return sanitized.length > 0 ? sanitized : null;
}

export function sanitizeRichHtml(
  value: unknown,
  maxLength: number = LIMITS.richHtml,
) {
  const raw = stripControlChars(String(value ?? ""));
  if (!raw.trim()) return "";

  const purified = String(DOMPurify.sanitize(raw, RICH_HTML_CONFIG));

  return truncate(purified, maxLength);
}

export function sanitizeEmail(value: unknown) {
  const email = sanitizePlainText(value, LIMITS.email).toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "";
  }

  return email;
}

export function sanitizePhone(value: unknown) {
  const phone = stripControlChars(String(value ?? ""))
    .replace(/[^\d+\-().\s]/g, "")
    .trim();

  return truncate(phone, LIMITS.phone);
}

export function sanitizeUrl(value: unknown, maxLength = LIMITS.url) {
  const raw = stripControlChars(String(value ?? "")).trim();
  if (!raw) return "";

  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "";
    }

    return truncate(url.toString(), maxLength);
  } catch {
    if (raw.startsWith("/") && !raw.startsWith("//")) {
      return truncate(raw, maxLength);
    }

    return "";
  }
}

export function sanitizeSlug(value: unknown) {
  return truncate(
    sanitizePlainText(value, LIMITS.slug)
      .toLowerCase()
      .replace(/[^a-z0-9+\-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, ""),
    LIMITS.slug,
  );
}

export function sanitizeSearchQuery(value: unknown) {
  return sanitizePlainText(value, LIMITS.search);
}

export function sanitizeStringArray(
  values: unknown,
  {
    maxItems = LIMITS.tags,
    maxItemLength = LIMITS.tag,
  }: { maxItems?: number; maxItemLength?: number } = {},
) {
  if (!Array.isArray(values)) return [] as string[];

  return values
    .map((value) => sanitizePlainText(value, maxItemLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function sanitizeObjectId(value: unknown) {
  const id = sanitizePlainText(value, 32);
  return /^[a-f\d]{24}$/i.test(id) ? id : "";
}

export function sanitizeBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === 1 || value === "1") return true;
  if (value === "false" || value === 0 || value === "0") return false;
  return fallback;
}

export function sanitizeJsonLdValue<T>(value: T): T {
  if (typeof value === "string") {
    return sanitizePlainText(value, LIMITS.long) as T;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => sanitizeJsonLdValue(entry)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        sanitizeJsonLdValue(entry),
      ]),
    ) as T;
  }

  return value;
}
