export default function CategoryListsSkeleton() {
  return (
    <div className="space-y-3 sm:space-y-5" aria-hidden>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-lg border border-border bg-card"
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="h-4 w-36 rounded bg-muted" />
            <div className="h-7 w-16 rounded bg-muted" />
          </div>
          <div className="flex gap-3 px-2 py-2.5">
            {Array.from({ length: 5 }).map((_, productIndex) => (
              <div
                key={productIndex}
                className="h-36 w-28 shrink-0 rounded-lg bg-muted sm:h-40 sm:w-32"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
