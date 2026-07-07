import {
  classifyApiErrorFromMessage,
  getErrorMessage,
} from "@/lib/api/api-errors";
import { withTimeout } from "@/lib/with-timeout";

export type ReadErrorCode = "TIMEOUT" | "OFFLINE" | "DATABASE" | "UNKNOWN";

export class ServerReadError extends Error {
  readonly code: ReadErrorCode;

  constructor(code: ReadErrorCode, message: string) {
    super(message);
    this.name = "ServerReadError";
    this.code = code;
  }
}

export function classifyReadError(error: unknown): {
  code: ReadErrorCode;
  message: string;
} {
  const message = getErrorMessage(error);

  if (message.toLowerCase().includes("timed out")) {
    return { code: "TIMEOUT", message: "Request timed out." };
  }

  const apiCode = classifyApiErrorFromMessage(message);
  if (apiCode === "offline") {
    return {
      code: "OFFLINE",
      message:
        "Cannot reach the server right now. Please check your connection.",
    };
  }

  if (
    message.includes("Prisma") ||
    message.includes("Raw query failed") ||
    message.includes("P2010")
  ) {
    return {
      code: "DATABASE",
      message: "Database is temporarily unavailable.",
    };
  }

  return { code: "UNKNOWN", message: "Unable to load data right now." };
}

type SafeReadOptions<T> = {
  source: string;
  fallback: T;
  timeoutMs?: number;
};

export async function safeServerRead<T>(
  operation: () => Promise<T>,
  options: SafeReadOptions<T>,
): Promise<T> {
  const { source, fallback, timeoutMs = 4500 } = options;

  try {
    return await withTimeout(operation(), timeoutMs);
  } catch (error) {
    const issue = classifyReadError(error);
    console.warn(`[resilient-read:${source}] ${issue.code}: ${issue.message}`);
    return fallback;
  }
}

type ServerReadOptions = {
  source: string;
  timeoutMs?: number;
};

export async function serverRead<T>(
  operation: () => Promise<T>,
  options: ServerReadOptions,
): Promise<T> {
  const { source, timeoutMs = 4500 } = options;

  try {
    return await withTimeout(operation(), timeoutMs);
  } catch (error) {
    const issue = classifyReadError(error);
    console.warn(`[server-read:${source}] ${issue.code}: ${issue.message}`);
    throw new ServerReadError(issue.code, issue.message);
  }
}
