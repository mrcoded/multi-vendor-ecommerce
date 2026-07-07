import toast from "react-hot-toast";

import { ERROR_MESSAGES } from "@/constants/feedback";
import { TimeoutError } from "@/lib/with-timeout";

export type ApiErrorCode = "offline" | "timeout" | "error";

export class ApiError extends Error {
  readonly code: ApiErrorCode;

  constructor(code: ApiErrorCode, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

export const MUTATION_TIMEOUT_MS = 15_000;
export const QUERY_TIMEOUT_MS = 15_000;

const OFFLINE_ERROR_PATTERNS = [
  "ENOTFOUND",
  "EAI_AGAIN",
  "ECONNREFUSED",
  "ECONNRESET",
  "ReplicaSetNoPrimary",
  "Server selection timeout",
  "os error 11001",
  "os error 11002",
  "Failed to fetch",
  "NetworkError",
  "network error",
  "Load failed",
];

const TECHNICAL_ERROR_PATTERNS = [
  "Prisma",
  "P2010",
  "Raw query failed",
  "Invalid `prisma",
  "hydration",
  "digest",
];

const USER_FACING_PATTERNS = [
  "already exists",
  "not found",
  "required",
  "authentication required",
  "forbidden",
  "cannot change",
  "invalid",
  "unauthorized",
  "email",
  "password",
];

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unexpected error";
}

export function isOfflineError(message: string): boolean {
  return OFFLINE_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}

export function classifyApiErrorFromMessage(message: string): ApiErrorCode {
  if (typeof window !== "undefined" && !window.navigator.onLine) {
    return "offline";
  }
  if (isOfflineError(message)) return "offline";
  if (message.toLowerCase().includes("timed out")) return "timeout";
  return "error";
}

export function isTechnicalError(message: string): boolean {
  const lower = message.toLowerCase();
  return TECHNICAL_ERROR_PATTERNS.some((pattern) =>
    lower.includes(pattern.toLowerCase()),
  );
}

export function toUserMessage(
  message?: string,
  fallback = ERROR_MESSAGES.error,
): string {
  if (!message?.trim()) return fallback;

  if (isOfflineError(message)) return ERROR_MESSAGES.offline;
  if (message.toLowerCase().includes("timed out")) {
    return ERROR_MESSAGES.timeout;
  }
  if (isTechnicalError(message)) return fallback;

  const lower = message.toLowerCase();
  const isUserFacing = USER_FACING_PATTERNS.some((pattern) =>
    lower.includes(pattern),
  );

  return isUserFacing ? message : fallback;
}

export function normalizeClientError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (typeof window !== "undefined" && !window.navigator.onLine) {
    return new ApiError("offline", ERROR_MESSAGES.offline);
  }

  if (error instanceof TimeoutError) {
    return new ApiError("timeout", ERROR_MESSAGES.timeout);
  }

  const message = getErrorMessage(error);

  if (isOfflineError(message)) {
    return new ApiError("offline", ERROR_MESSAGES.offline);
  }

  if (message.toLowerCase().includes("timed out")) {
    return new ApiError("timeout", ERROR_MESSAGES.timeout);
  }

  return new ApiError("error", toUserMessage(message));
}

export function getFriendlyErrorMessage(
  error: unknown,
  fallback = ERROR_MESSAGES.error,
): string {
  return normalizeClientError(error).message || fallback;
}

export function toastApiError(
  error: unknown,
  fallback = ERROR_MESSAGES.error,
): void {
  toast.error(getFriendlyErrorMessage(error, fallback));
}

export function sanitizeServerError(
  error: unknown,
  fallback = ERROR_MESSAGES.error,
): string {
  return toUserMessage(getErrorMessage(error), fallback);
}
