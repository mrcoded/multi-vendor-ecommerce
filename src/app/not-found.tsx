"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { MoveLeft, Home, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-3 sm:px-6">
      <div className="text-center sm:max-w-md">
        {/* 404 Graphic */}
        <div className="relative mb-8 flex justify-center">
          <h1 className="text-[10rem] sm:text-[12rem] font-black text-slate-200 dark:text-slate-800 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-20 h-20 text-lime-600 animate-bounce" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Lost in the Marketplace?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved by the
          vendor. Don't worry, we'll help you find your way back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <button onClick={router.back} className="flex items-center gap-2">
              <MoveLeft className="w-4 h-4" />
              Go Back
            </button>
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto bg-lime-600 hover:bg-lime-700"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
