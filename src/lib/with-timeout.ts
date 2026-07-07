const DEFAULT_TIMEOUT_MESSAGE = "Request timed out";

export class TimeoutError extends Error {
  constructor(message = DEFAULT_TIMEOUT_MESSAGE) {
    super(message);
    this.name = "TimeoutError";
  }
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  fallbackValue?: T,
): Promise<T> {
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<T>((resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      if (fallbackValue !== undefined) {
        resolve(fallbackValue);
        return;
      }

      reject(
        new TimeoutError(`${DEFAULT_TIMEOUT_MESSAGE} after ${timeoutMs}ms`),
      );
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
  }
}
