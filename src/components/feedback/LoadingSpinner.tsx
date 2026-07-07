"use client";

import { Loader2 } from "lucide-react";

type LoadingSpinnerProps = {
  label?: string;
  className?: string;
};

export default function LoadingSpinner({
  label = "Loading...",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center gap-2 py-4 ${className}`}>
      <Loader2 className="size-5 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
