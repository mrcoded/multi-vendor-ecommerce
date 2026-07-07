export default function ProductLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="hidden h-4 w-48 rounded bg-muted sm:block" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="aspect-square rounded-xl bg-muted" />
          <div className="mt-3 flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="size-16 shrink-0 rounded-lg bg-muted sm:size-20"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-7">
          <div className="h-8 w-3/4 rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-24 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>
          <div className="h-10 w-32 rounded bg-muted" />
          <div className="h-11 w-full rounded-md bg-muted sm:w-48" />
        </div>
      </div>
    </div>
  );
}
