export default function StoreListSkeleton() {
  return (
    <section className="overflow-hidden py-4 sm:py-5" aria-hidden>
      <div className="mb-3 flex animate-pulse items-center justify-center sm:mb-4">
        <div className="h-5 w-32 rounded bg-muted" />
      </div>
      <div className="flex gap-3 overflow-hidden px-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="size-20 shrink-0 rounded-full bg-muted sm:size-24"
          />
        ))}
      </div>
    </section>
  );
}
