"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { X } from "lucide-react";

function FormHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between py-4 sm:py-6 px-4 sm:px-12 mb-12 bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-600 rounded-lg shadow">
      <h2 className="text-base sm:text-xl font-semibold">{title}</h2>
      <button onClick={() => router.back()}>
        <X />
      </button>
    </div>
  );
}

export default FormHeader;
