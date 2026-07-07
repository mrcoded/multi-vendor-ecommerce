"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function getVisiblePages(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 1) return total === 1 ? [1] : [];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  if (!pages.includes(total)) {
    pages.push(total);
  }

  return pages;
}

type PaginateProps = {
  totalPages: number;
  productCount: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

function Paginate({
  totalPages,
  productCount,
  currentPage: controlledPage,
  onPageChange,
}: PaginateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = controlledPage ?? urlPage;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    if (onPageChange) {
      onPageChange(page);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  const visiblePages = getVisiblePages(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Pagination>
        <PaginationContent className="flex-wrap justify-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (!isFirstPage) goToPage(currentPage - 1);
              }}
              className={cn(
                "rounded-lg border-border",
                isFirstPage && "pointer-events-none opacity-40",
              )}
            />
          </PaginationItem>

          {visiblePages.map((page, index) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className="text-muted-foreground" />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(page);
                  }}
                  className={cn(
                    "min-w-9 rounded-lg",
                    page === currentPage &&
                      "border-primary bg-primary/10 font-semibold text-primary hover:bg-primary/15",
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (!isLastPage) goToPage(currentPage + 1);
              }}
              className={cn(
                "rounded-lg border-border",
                isLastPage && "pointer-events-none opacity-40",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages}
        {productCount > 0 && (
          <span className="hidden sm:inline">
            {" "}
            · {productCount} total items
          </span>
        )}
      </p>
    </div>
  );
}

export default Paginate;
