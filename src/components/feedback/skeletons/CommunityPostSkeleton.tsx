export default function CommunityPostSkeleton() {
  return (
    <section
      className="mt-6 animate-pulse border-t border-border py-6 sm:py-8"
      aria-hidden
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
          <div className="space-y-2">
            <div className="h-6 w-52 rounded bg-muted" />
            <div className="h-4 w-72 max-w-full rounded bg-muted" />
          </div>
          <div className="h-8 w-20 rounded bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="aspect-[16/10] bg-muted" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-2/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
