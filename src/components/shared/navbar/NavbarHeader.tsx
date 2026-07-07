import { Suspense, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlignJustify } from "lucide-react";

import SearchForm from "@/components/forms/SearchForm";
import { cn } from "@/lib/utils";

type NavbarHeaderProps = {
  onOpenMobileNav: () => void;
  onNavigate?: () => void;
  children?: ReactNode;
  showSearch?: boolean;
};

function SearchFallback() {
  return <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />;
}

function NavbarSearch({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchForm compact={compact} className={cn("w-full", className)} />
    </Suspense>
  );
}

export default function NavbarHeader({
  onOpenMobileNav,
  onNavigate,
  children,
  showSearch = true,
}: NavbarHeaderProps) {
  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 md:gap-4 md:py-2.5 lg:px-8">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="inline-flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted md:hidden"
          aria-label="Open menu"
        >
          <AlignJustify className="size-5" />
        </button>

        <Link href="/" className="shrink-0 md:mr-1" onClick={onNavigate}>
          <Image
            src="/assets/icon.png"
            alt="BelStore logo"
            width={64}
            height={20}
            sizes="(max-width: 1280px) 20px, 64px"
            className="h-6 w-auto xl:h-8"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>

        {showSearch ? (
          <div className="hidden min-w-0 flex-1 md:flex md:max-w-xl lg:max-w-2xl">
            <NavbarSearch />
          </div>
        ) : null}

        {children}
      </div>

      {showSearch ? (
        <div className="border-t border-border/60 px-3 pb-2.5 pt-2 md:hidden">
          <NavbarSearch compact />
        </div>
      ) : null}
    </>
  );
}
