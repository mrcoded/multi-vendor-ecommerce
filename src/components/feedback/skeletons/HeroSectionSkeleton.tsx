export default function HeroSectionSkeleton() {
  return (
    <div
      className="mb-3 grid animate-pulse grid-cols-12 gap-3 lg:mb-6 lg:gap-5 xl:gap-8"
      aria-hidden
    >
      <div className="col-span-4 hidden rounded-lg bg-muted sm:block lg:col-span-3">
        <div className="h-12 border-b border-border bg-muted/80" />
        <div className="space-y-3 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-muted/80" />
              <div className="h-3 flex-1 rounded bg-muted/80" />
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-full aspect-[5/2] rounded-lg bg-muted sm:col-span-8 lg:col-span-7" />

      <div className="hidden space-y-3 rounded-lg bg-muted p-3 lg:col-span-2 lg:block">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-10 rounded bg-muted/80" />
        ))}
        <div className="mt-4 aspect-square rounded bg-muted/80" />
      </div>
    </div>
  );
}
