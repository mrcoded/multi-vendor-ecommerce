import type { Metadata } from "next";

import Pricing from "@/app/(other-pages)/vendor-pricing/_components/Pricing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Vendor Pricing",
  description:
    "Compare BelStore vendor plans and start selling your products to customers worldwide.",
  path: "/vendor-pricing",
});

function Page() {
  return (
    <div>
      <Pricing />
    </div>
  );
}

export default Page;
