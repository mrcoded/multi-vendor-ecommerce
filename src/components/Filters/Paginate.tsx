"use client";

import React from "react";
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
import { cn } from "@/lib/utils";

function Paginate({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${parseInt(currentPage) == 1 ? `?${new URLSearchParams({ page: "1" })}` : `?${new URLSearchParams({ page: (parseInt(currentPage) - 1).toString() })}`}`}
          />
        </PaginationItem>
        {totalPages <= 3 ? (
          Array.from({ length: 3 }, (_, index) => {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === parseInt(currentPage)}
                  href={`?${new URLSearchParams({ page: (index + 1).toString() })}`}
                  className={cn(
                    index + 1 === parseInt(currentPage) && "dark:text-slate-200"
                  )}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <>
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink href="#">{index + 1}</PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href={`${parseInt(currentPage) == totalPages ? `?${new URLSearchParams({ page: `${totalPages}` })}` : `?${new URLSearchParams({ page: `${parseInt(currentPage) + 1}` })}`}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginate;
