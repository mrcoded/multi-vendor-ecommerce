"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

function BreadCrumb({
  labels,
  hiddenSegments,
  className,
}: {
  labels?: Record<string, string>;
  hiddenSegments?: string[];
  className?: string;
}) {
  const pathname = usePathname();
  const allSegments = pathname.split("/").filter((path) => path !== "");

  const formatLabel = (segment: string) =>
    labels?.[segment] ?? segment.replace(/-/g, " ");

  const isSegmentHidden = (segment: string) =>
    hiddenSegments?.includes(segment) ?? false;

  const isLastVisibleSegment = (index: number) =>
    !allSegments.slice(index + 1).some((segment) => !isSegmentHidden(segment));

  return (
    <nav
      className={cn("mb-4 w-full sm:mb-5", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center">
        <li className="shrink-0">
          <Link
            href="/"
            className="flex items-center text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Home className="mr-1.5 size-3.5" />
            <span className="hidden sm:inline">Home</span>
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {allSegments.map((path, index) => {
          if (isSegmentHidden(path)) return null;

          const isLast = isLastVisibleSegment(index);
          const href = `/${allSegments.slice(0, index + 1).join("/")}`;
          const label = formatLabel(path);

          return (
            <li key={index} className="flex min-w-0 items-center">
              <ChevronRight className="mx-1 size-3.5 shrink-0 text-muted-foreground/60" />

              <div className="min-w-0">
                {isLast ? (
                  <span className="block truncate text-xs font-semibold capitalize text-foreground">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="block truncate text-xs font-medium capitalize text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
