"use client";

import { CATALOG_PAGE_SIZE } from "@/constants/catalog";
import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";

function BreadCrumb({
  title,
  resultCount,
}: {
  title: string | undefined;
  resultCount: number;
}) {
  const searchParams = useSearchParams();
  const pageSize = CATALOG_PAGE_SIZE;
  const currentPage = parseInt(searchParams.get("page") || "1");
  const startRange = Math.min(
    (currentPage - 1) * pageSize + 1,
    resultCount || 1,
  );
  const endRange = Math.min(currentPage * pageSize, resultCount);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm"
    >
      <ol className="flex items-center gap-1 text-muted-foreground">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Home className="size-3.5" />
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-4 text-border" />
        </li>
        <li>
          <span className="font-medium capitalize text-foreground">
            {title}
          </span>
        </li>
      </ol>

      {resultCount > 0 && (
        <p className="text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {startRange}–{endRange}
          </span>{" "}
          of <span className="font-medium text-foreground">{resultCount}</span>{" "}
          results
        </p>
      )}
    </nav>
  );
}

export default BreadCrumb;
