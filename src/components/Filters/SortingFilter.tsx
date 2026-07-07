"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { sortingLinks } from "@/constants/sorting-links";
import { cn } from "@/lib/utils";

function SortingFilter({
  title,
  isSearch,
  slug,
}: {
  isSearch: boolean | undefined;
  title: string | undefined;
  slug: string | undefined;
}) {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort");
  const activeSort = sortingLinks(slug).find((l) => l.sort === sortParam);

  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {isSearch && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
            Search Results
          </p>
        )}
        <h1 className="line-clamp-2 text-2xl font-semibold capitalize text-foreground sm:text-3xl">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Sort by
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="min-w-[140px] justify-between"
            >
              <span className="truncate">{activeSort?.title || "Default"}</span>
              <ChevronDown className="size-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortingLinks(slug).map((link, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "w-full cursor-pointer",
                    link.sort === sortParam &&
                      "bg-secondary font-medium text-primary",
                  )}
                >
                  {link.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default SortingFilter;
