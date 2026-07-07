"use client";

import React from "react";
import Link from "next/link";
import { Circle, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";
import { priceRanges } from "@/constants/price-ranges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function PriceFilter({
  slug,
  isSearch,
}: {
  slug: string | undefined;
  isSearch: boolean | undefined;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsObject = new URLSearchParams(searchParams);

  const maxParam = searchParams.get("max");
  const minParam = searchParams.get("min");
  const page = searchParamsObject.get("page") || 1;
  const sort = searchParamsObject.get("sort") || "asc";
  const search = searchParamsObject.get("search") || "";

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    const { min, max } = data;

    if (!min && !max) return;

    if (min && max) {
      router.push(`?sort=asc&max=${max}&min=${min}`);
      reset();
    } else if (min) {
      router.push(`?sort=asc&min=${min}`);
      reset();
    } else if (max) {
      router.push(`?sort=asc&max=${max}`);
      reset();
    }
  };

  const isRangeActive = (range: (typeof priceRanges)[number]) =>
    (range.min && range.min == Number(minParam)) ||
    (range.max && range.max == Number(maxParam)) ||
    (range.min &&
      range.max &&
      range.min == Number(minParam) &&
      range.max == Number(maxParam));

  const resetHref = isSearch ? `?search=${search}` : `/category/${slug}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Price Range</h3>
        <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-xs">
          <Link href={resetHref}>
            <RotateCcw className="size-3" />
            Reset
          </Link>
        </Button>
      </div>

      <ul className="space-y-2">
        {priceRanges.map((range, i) => {
          const active = isRangeActive(range);
          return (
            <li key={i}>
              <Link
                href={
                  isSearch
                    ? `?search=${search}&page=${page}&sort=${sort}&min=${range.min || 0}&max=${range.max || ""}`
                    : `?page=${page}&sort=${sort}&min=${range.min || 0}&max=${range.max || ""}`
                }
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted",
                  active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground font-medium",
                )}
              >
                <Circle
                  className={cn(
                    "size-3.5 shrink-0",
                    active && "fill-primary text-primary",
                  )}
                />
                {range.display}
              </Link>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 border-t border-border pt-4"
      >
        <p className="text-xs font-medium text-muted-foreground">
          Custom range
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              {...register("min", { required: "Required" })}
              type="number"
              id="min-filter"
              placeholder="Min"
              className="h-9"
            />
            {errors.min && (
              <p className="mt-1 text-xs text-destructive">
                {String(errors.min.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("max", { required: "Required" })}
              type="number"
              id="max-filter"
              placeholder="Max"
              className="h-9"
            />
            {errors.max && (
              <p className="mt-1 text-xs text-destructive">
                {String(errors.max.message)}
              </p>
            )}
          </div>
        </div>
        <Button type="submit" variant="accent" size="sm" className="w-full">
          Apply
        </Button>
      </form>
    </div>
  );
}

export default PriceFilter;
