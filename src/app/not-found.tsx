"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { MoveLeft, Home, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-3 sm:px-6">
      <div className="text-center sm:max-w-md">
        <div className="relative mb-8 flex justify-center">
          <h1 className="text-[10rem] font-black leading-none text-muted sm:text-[12rem]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="size-20 animate-bounce text-primary" />
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Lost in the Marketplace?
        </h2>
        <p className="mb-8 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          by the vendor. Don&apos;t worry, we&apos;ll help you find your way
          back.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.back()}
          >
            <MoveLeft className="size-4" />
            Go Back
          </Button>

          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
