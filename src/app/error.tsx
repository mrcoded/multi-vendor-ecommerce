"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("App error:", error);

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-2xl text-red-600 font-bold">Something went wrong</h2>
      <p className="mt-2 text-gray-700 text-lg">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700"
      >
        Try Again
      </button>
    </div>
  );
}
