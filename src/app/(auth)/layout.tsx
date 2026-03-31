import { Suspense } from "react";
import "../../styles/main.scss";
import { Metadata } from "next";
import Loading from "../loading";

import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Auth - BelStore",
  description:
    "BelStore's authentication page allows users to securely sign in, sign up, and manage their account. Access a wide range of features and functionalities within the BelStore platform.",
  alternates: {
    canonical: "/auth",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
