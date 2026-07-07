import type { LucideIcon } from "lucide-react";
import {
  Facebook,
  Headphones,
  Instagram,
  RotateCcw,
  ShieldCheck,
  Truck,
  Twitter,
} from "lucide-react";

export type FooterLinkItem = {
  href: string;
  label: string;
  external?: boolean;
};

export type FooterLinkGroup = {
  title: string;
  links: FooterLinkItem[];
};

export const FOOTER_TRUST_FEATURES = [
  {
    icon: Truck,
    title: "Fast delivery",
    description: "Nationwide shipping on every order",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "Protected payments you can trust",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "Hassle-free refunds within policy",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    description: "Call 08023440000 anytime",
  },
] as const satisfies ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  description: string;
}>;

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Shop",
    links: [
      { href: "/search", label: "Browse products" },
      { href: "/community-blogs", label: "Community" },
      { href: "/cart", label: "Your cart" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Customer service",
    links: [
      { href: "tel:08023440000", label: "Call support" },
      { href: "/dashboard/orders", label: "Track your order" },
      { href: "/profile-settings", label: "Account settings" },
    ],
  },
  {
    title: "Sell on BelStore",
    links: [
      { href: "/vendor-pricing", label: "Vendor pricing" },
      { href: "/vendor-pricing", label: "Open a store" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: FooterLinkItem[] = [
  { href: "/vendor-pricing", label: "Terms of service" },
  { href: "/vendor-pricing", label: "Privacy policy" },
];

export const FOOTER_SOCIAL_LINKS = [
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
] as const satisfies ReadonlyArray<{
  href: string;
  label: string;
  icon: LucideIcon;
}>;

export const FOOTER_PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "Verve",
  "Bank transfer",
] as const;
