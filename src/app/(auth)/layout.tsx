import { Suspense } from "react";

import "../../styles/main.scss";

import type { Metadata } from "next";

import Loading from "../loading";

import Navbar from "@/components/shared/navbar";

import { PRIVATE_ROBOTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "Account",
    template: "%s | BelStore",
  },
  description: "Sign in, register, or recover your BelStore account.",
  robots: PRIVATE_ROBOTS,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar showSearch={false} />

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
