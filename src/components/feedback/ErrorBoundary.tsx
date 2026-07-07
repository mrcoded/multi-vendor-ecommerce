"use client";

import React, { ErrorInfo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ContentUnavailable from "@/components/feedback/ContentUnavailable";
import type { UnavailableReason } from "@/constants/feedback";
import { getFriendlyErrorMessage } from "@/lib/api/api-errors";
import { ServerReadError, type ReadErrorCode } from "@/lib/api/resilient-read";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  variant?: "fullscreen" | "inline" | "overlay";
  showHomeLink?: boolean;
  showToast?: boolean;
  onRetry?: () => void;
};

type InnerProps = ErrorBoundaryProps & {
  onRetry: () => void;
};

type State = {
  hasError: boolean;
  reason: UnavailableReason;
};

function toUnavailableReason(code: ReadErrorCode): UnavailableReason {
  if (code === "OFFLINE") return "offline";
  if (code === "TIMEOUT") return "timeout";
  return "error";
}

class ErrorBoundaryInner extends React.Component<InnerProps, State> {
  constructor(props: InnerProps) {
    super(props);
    this.state = { hasError: false, reason: "error" };
  }

  static getDerivedStateFromError(error: Error): State {
    if (error instanceof ServerReadError) {
      return { hasError: true, reason: toUnavailableReason(error.code) };
    }
    return { hasError: true, reason: "error" };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    if (this.props.showToast) {
      toast.error(getFriendlyErrorMessage(error));
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, reason: "error" });
    this.props.onRetry();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ContentUnavailable
          reason={this.state.reason}
          onRetry={this.handleRetry}
          variant={this.props.variant}
          showHomeLink={this.props.showHomeLink}
        />
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({
  children,
  variant = "fullscreen",
  showHomeLink = true,
  showToast = false,
  onRetry,
}: ErrorBoundaryProps) {
  const router = useRouter();

  const handleRetry =
    onRetry ??
    (variant === "inline"
      ? () => router.refresh()
      : () => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        });

  return (
    <ErrorBoundaryInner
      variant={variant}
      showHomeLink={showHomeLink}
      showToast={showToast}
      onRetry={handleRetry}
    >
      {children}
    </ErrorBoundaryInner>
  );
}
