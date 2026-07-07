"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

function FormHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="mb-8 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 shadow-sm sm:px-8 sm:py-5">
      <h2 className="text-base font-semibold text-foreground sm:text-xl">
        {title}
      </h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Go back"
      >
        <X className="size-5" />
      </Button>
    </div>
  );
}

export default FormHeader;
