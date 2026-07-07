export const LOADING_TIMEOUT_MS = 8_000;

export const ERROR_MESSAGES = {
  timeout: "This is taking longer than expected. Please try again.",
  offline: "Check your connection and try again.",
  error: "Something went wrong. Please try again.",
} as const;

export type UnavailableReason = keyof typeof ERROR_MESSAGES;
