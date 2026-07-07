"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

import { ERROR_MESSAGES, type UnavailableReason } from "@/constants/feedback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContentUnavailableProps = {
  reason?: UnavailableReason;
  onRetry?: () => void;
  reloadOnRetry?: boolean;
  variant?: "fullscreen" | "inline" | "overlay";
  showHomeLink?: boolean;
  className?: string;
};

export default function ContentUnavailable({
  reason = "error",
  onRetry,
  reloadOnRetry = false,
  variant = "inline",
  showHomeLink = true,
  className,
}: ContentUnavailableProps) {
  const message = ERROR_MESSAGES[reason];
  const handleRetry =
    onRetry ??
    (reloadOnRetry
      ? () => {
          window.location.reload();
        }
      : undefined);

  const content = (
    <div
      className={cn(
        "flex flex-col items-center gap-3 px-4 text-center",
        className,
      )}
    >
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {handleRetry && (
          <Button
            type="button"
            variant="accent"
            size="sm"
            onClick={handleRetry}
          >
            <RefreshCw className="size-4" />
            Try again
          </Button>
        )}
        {showHomeLink && (
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Go home</Link>
          </Button>
        )}
      </div>
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
        {content}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center py-8">
      {content}
    </div>
  );
}
