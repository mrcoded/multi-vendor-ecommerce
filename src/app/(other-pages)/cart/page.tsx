import type { Metadata } from "next";

import CartPageClient from "./_components/CartPageClient";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata(
  "Shopping Cart",
  "Review items in your BelStore shopping cart before checkout.",
  "/cart",
);

export default function CartPage() {
  return <CartPageClient />;
}
