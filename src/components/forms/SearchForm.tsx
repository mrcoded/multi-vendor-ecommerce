"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Loader2, Search } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function SearchForm({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const handleSearch = (data: FieldValues) => {
    const { searchTerm } = data;
    reset();
    router.push(`/search?search=${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className={cn(
        "flex w-full items-center",
        compact ? "gap-1.5" : "mx-auto max-w-lg gap-2",
        className,
      )}
    >
      <label htmlFor={compact ? "mobile-search" : "search"} className="sr-only">
        Search
      </label>
      <div className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <Search className="size-4 text-muted-foreground" />
        </div>
        <Input
          {...register("searchTerm")}
          type="search"
          id={compact ? "mobile-search" : "search"}
          disabled={isSubmitting}
          className={cn("ps-9", compact && "h-9 text-sm")}
          placeholder={
            compact
              ? "Search products, stores..."
              : "Search Products, Categories, Markets..."
          }
          required
        />
      </div>
      <Button
        type="submit"
        variant="accent"
        size={compact ? "icon-sm" : "sm"}
        disabled={isSubmitting}
        className="shrink-0"
        aria-label={isSubmitting ? "Searching" : "Search"}
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Search className="size-4" />
        )}
        {!compact && (
          <span className="hidden sm:inline">
            {isSubmitting ? "Searching..." : "Search"}
          </span>
        )}
      </Button>
    </form>
  );
}

export default SearchForm;
