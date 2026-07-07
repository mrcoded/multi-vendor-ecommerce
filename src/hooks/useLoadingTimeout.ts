"use client";

import { useCallback, useEffect, useState } from "react";

import { LOADING_TIMEOUT_MS } from "@/constants/feedback";

export function useLoadingTimeout(
  isLoading: boolean,
  timeoutMs = LOADING_TIMEOUT_MS,
) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimedOut(false);
      return;
    }

    const timer = window.setTimeout(() => setTimedOut(true), timeoutMs);
    return () => window.clearTimeout(timer);
  }, [isLoading, timeoutMs]);

  const resetTimeout = useCallback(() => setTimedOut(false), []);

  return { timedOut, resetTimeout };
}
