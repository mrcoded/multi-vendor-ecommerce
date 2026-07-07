"use client";

import { Loader2 } from "lucide-react";

import { useLoadingTimeout } from "@/hooks/useLoadingTimeout";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import { cn } from "@/lib/utils";

type AsyncContentProps = {
  isLoading: boolean;
  isError?: boolean;
  onRetry?: () => void;
  children: React.ReactNode;
  variant?: "fullscreen" | "inline" | "overlay";
  loadingLabel?: string;
  showHomeLink?: boolean;
  className?: string;
};

export default function AsyncContent({
  isLoading,
  isError = false,
  onRetry,
  children,
  variant = "inline",
  loadingLabel = "Loading...",
  showHomeLink = true,
  className,
}: AsyncContentProps) {
  const isOnline = useOnlineStatus();
  const { timedOut, resetTimeout } = useLoadingTimeout(isLoading);

  const handleRetry = () => {
    resetTimeout();
    if (onRetry) {
      onRetry();
      return;
    }
    window.location.reload();
  };

  if (isError || timedOut || (!isOnline && isLoading)) {
    const reason = !isOnline ? "offline" : isError ? "error" : "timeout";

    return (
      <ContentUnavailable
        reason={reason}
        onRetry={handleRetry}
        variant={variant}
        showHomeLink={showHomeLink}
        className={className}
      />
    );
  }

  if (isLoading) {
    const spinner = (
      <div
        className={cn(
          "flex flex-col items-center gap-2 text-center",
          className,
        )}
      >
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
        <p className="text-sm text-muted-foreground">{loadingLabel}</p>
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

  return <>{children}</>;
}
