"use client";

import { Loader2 } from "lucide-react";

import { useLoadingTimeout } from "@/hooks/useLoadingTimeout";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { cn } from "@/lib/utils";

type LoadingFallbackProps = {
  label?: string;
  variant?: "fullscreen" | "inline" | "overlay";
  enableTimeout?: boolean;
  showHomeLink?: boolean;
  className?: string;
};

export default function LoadingFallback({
  label = "Loading...",
  variant = "fullscreen",
  enableTimeout = true,
  showHomeLink = true,
  className,
}: LoadingFallbackProps) {
  const isOnline = useOnlineStatus();
  const { timedOut } = useLoadingTimeout(enableTimeout);

  const handleRetry = () => {
    window.location.reload();
  };

  if (enableTimeout && (!isOnline || timedOut)) {
    return (
      <ContentUnavailable
        reason={!isOnline ? "offline" : "timeout"}
        onRetry={handleRetry}
        variant={variant}
        showHomeLink={showHomeLink}
      />
    );
  }

  const spinner = (
    <div
      className={cn("flex flex-col items-center gap-2 text-center", className)}
    >
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );

  if (variant === "fullscreen" || variant === "overlay") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]",
          variant === "overlay"
            ? "absolute inset-0 z-10"
            : "fixed inset-0 z-[9999]",
        )}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center py-8">
      {spinner}
    </div>
  );
}
