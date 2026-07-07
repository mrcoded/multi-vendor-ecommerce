"use client";

import { useEffect } from "react";
import ContentUnavailable from "@/components/feedback/ContentUnavailable";

export default function DashboardErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[DASHBOARD_ERROR]", error);
  }, [error]);

  return (
    <ContentUnavailable
      reason="error"
      onRetry={reset}
      variant="inline"
      showHomeLink={false}
      className="min-h-[40vh]"
    />
  );
}
