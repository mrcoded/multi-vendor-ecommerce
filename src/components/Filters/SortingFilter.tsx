"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, SortAsc } from "lucide-react";

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

function SortingFilter({
  title,
  isSearch,
  slug,
}: {
  isSearch: boolean | undefined;
  title: string;
  slug: string;
}) {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort");

  // Find the active title to display on the button
  const activeSort = sortingLinks(slug).find((l) => l.sort === sortParam);

  return (
    <div className="flex flex-row items-center justify-between">
      <h2 className="text-2xl font-medium capitalize truncate line-clamp-2 dark:text-muted-foreground">
        {isSearch && "Search Results - "}
        {title}
      </h2>
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sort by:</p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-500 text-sm font-normal dark:text-muted-foreground"
            >
              <p className="hidden sm:block ">
                {activeSort?.title || "Default"}
              </p>
              <ChevronDown className="size-2.5 sm:size-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortingLinks(slug).map((link, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href={link.href}
                  className={`w-full cursor-pointer ${
                    link.sort === sortParam
                      ? "bg-slate-100 font-medium text-lime-600 dark:bg-slate-800 dark:text-lime-400"
                      : ""
                  }`}
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
