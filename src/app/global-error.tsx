"use client";

import ContentUnavailable from "@/components/feedback/ContentUnavailable";

export default function RootGlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ContentUnavailable
          reason="error"
          onRetry={reset}
          variant="fullscreen"
        />
      </body>
    </html>
  );
}
