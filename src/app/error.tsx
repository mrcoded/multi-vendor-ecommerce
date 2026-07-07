"use client";

import ContentUnavailable from "@/components/feedback/ContentUnavailable";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ContentUnavailable reason="error" onRetry={reset} variant="fullscreen" />
  );
}
