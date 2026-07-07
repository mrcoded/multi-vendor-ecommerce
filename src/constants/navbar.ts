import {
  Headphones,
  Home,
  Newspaper,
  ShoppingCart,
  Store,
} from "lucide-react";

export const MOBILE_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/community-blogs", label: "Community", icon: Newspaper },
  { href: "/vendor-pricing", label: "Sell with Us", icon: Store },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
] as const;

export const MOBILE_HELP_LINKS = [
  { href: "tel:08023440000", label: "Call support", icon: Headphones },
  { href: "/dashboard/orders", label: "Track order", icon: ShoppingCart },
] as const;

export const DESKTOP_NAV_LINKS = [
  { href: "/community-blogs", label: "Community", icon: Newspaper },
  { href: "/vendor-pricing", label: "Sell", icon: Store },
] as const;
