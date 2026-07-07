import { FieldValues, UseFormReset } from "react-hook-form";

import toast from "react-hot-toast";

import { ERROR_MESSAGES } from "@/constants/feedback";
import {
  ApiError,
  MUTATION_TIMEOUT_MS,
  QUERY_TIMEOUT_MS,
  normalizeClientError,
  toastApiError,
  toUserMessage,
} from "@/lib/api/api-errors";
import { withTimeout } from "@/lib/with-timeout";

export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: number;
  [key: string]: unknown;
};

export type SuccessfulActionResult<TData = unknown> = ActionResult<TData> & {
  success: true;
};

export type ServiceResult<TData = unknown> = {
  success: boolean;
  data?: TData;
  error?: string;
  message?: string;
};

export type UnwrapMode = "entity" | "service" | "action";

function isServiceResult(value: unknown): value is ActionResult<unknown> {
  return (
    !!value &&
    typeof value === "object" &&
    "success" in value &&
    typeof (value as ActionResult).success === "boolean"
  );
}

export function unwrapActionResult<T>(
  res: ActionResult<unknown>,
  mode: UnwrapMode = "entity",
): T {
  if (!res?.success) {
    throw new ApiError("error", toUserMessage(res?.error));
  }

  if (mode === "action") {
    return res as T;
  }

  const payload = res.data;

  if (isServiceResult(payload)) {
    if (!payload.success) {
      throw new ApiError("error", toUserMessage(payload.error));
    }

    if (mode === "service") {
      return payload as T;
    }

    return (payload.data ?? payload) as T;
  }

  if (mode === "service") {
    return res as T;
  }

  return (payload ?? res) as T;
}

export async function withClientRequest<T>(
  fn: () => Promise<T>,
  timeoutMs = MUTATION_TIMEOUT_MS,
): Promise<T> {
  if (typeof window !== "undefined" && !window.navigator.onLine) {
    throw new ApiError("offline", ERROR_MESSAGES.offline);
  }

  try {
    return await withTimeout(fn(), timeoutMs);
  } catch (error) {
    throw normalizeClientError(error);
  }
}

export async function invokeServerAction<T>(
  fn: () => Promise<ActionResult<unknown>>,
  mode: UnwrapMode = "entity",
  timeoutMs = MUTATION_TIMEOUT_MS,
): Promise<T> {
  const res = await withClientRequest(fn, timeoutMs);
  return unwrapActionResult<T>(res, mode);
}

export async function runQueryAction<T>(
  fn: () => Promise<ActionResult<unknown>>,
  mode: UnwrapMode = "entity",
  timeoutMs = QUERY_TIMEOUT_MS,
): Promise<T> {
  return invokeServerAction<T>(fn, mode, timeoutMs);
}

interface PostRequestProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint: string;
  data: FieldValues;
  resourceName: string;
  successMsg?: string;
  method?: string;
  reset?: UseFormReset<FieldValues>;
  redirectUrl?: (id: string) => void;
}

export const makePostRequest = async ({
  setLoading,
  endpoint,
  data,
  method = "POST",
  resourceName,
  reset,
  redirectUrl,
  successMsg,
}: PostRequestProps) => {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await withClientRequest(() =>
      fetch(`${baseUrl}/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    );

    let responseData = null;
    if (response.status !== 204) {
      responseData = await response.json();
    }

    if (response.ok) {
      toast.success(successMsg ?? `${resourceName} updated successfully`);
      reset?.();

      const extractedId = responseData?.id ?? responseData?.data?.id;

      if (redirectUrl) {
        redirectUrl(extractedId);
      }
      return responseData;
    }

    if (response.status === 409) {
      toast.error(`${resourceName} already exists!`);
      return responseData;
    }

    if (response.status === 403) {
      toast.error("Unauthorized");
      return responseData;
    }

    toast.error(ERROR_MESSAGES.error);
    return responseData;
  } catch (error) {
    toastApiError(error);
    return null;
  } finally {
    setLoading(false);
  }
};
