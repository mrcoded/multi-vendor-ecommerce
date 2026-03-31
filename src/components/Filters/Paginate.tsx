"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Paginate({
  totalPages,
  productCount,
}: {
  totalPages: number;
  productCount: number;
}) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Helper to keep existing URL filters when changing pages
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  // Logic for the disabled states
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <Pagination className="my-10">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={isFirstPage ? "#" : createPageURL(currentPage - 1)}
            className={cn(
              isFirstPage &&
                "pointer-events-none text-foreground opacity-50 grayscale cursor-not-allowed",
            )}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;

          // Simple logic: Only show numbers if they are relevant
          // You can expand this with ellipsis logic if you have many pages
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={pageNum === currentPage}
                href={createPageURL(pageNum)}
                className={cn(
                  pageNum === currentPage &&
                    "text-foreground dark:text-slate-200",
                )}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={isLastPage ? "#" : createPageURL(currentPage + 1)}
            className={cn(
              isLastPage &&
                "pointer-events-none text-foreground opacity-50 grayscale cursor-not-allowed",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginate;
