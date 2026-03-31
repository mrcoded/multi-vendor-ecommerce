"use client";

import React from "react";
import Link from "next/link";
import { Circle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { FieldValues, useForm } from "react-hook-form";
import { priceRanges } from "@/constants/price-ranges";

function PriceFilter({
  slug,
  isSearch,
}: {
  slug: string | undefined;
  isSearch: boolean | undefined;
}) {
  const router = useRouter();

  //extract search params
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

  //submit function handler
  const onSubmit = (data: FieldValues) => {
    const { min, max } = data;
    // console.log(min, max);

    if (!min && !max) {
      return;
    }

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

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-sm md:text-xl font-medium dark:text-muted-foreground">
          Price
        </h2>
        <Link
          href={`/category/${slug}`}
          className="text-xs sm:text-sm px-2 sm:px-5 py-1.5 sm:py-2.5 me-2 mb-2 text-white bg-lime-700 hover:bg-lime-800 focus:ring:4 focus:ring-lime-300 font-medium rounded-lg dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
        >
          Reset Filters
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 sm:flex lg:flex-col lg:justify-normal gap-4 lg:gap-3">
        {priceRanges.map((range, i) => {
          return (
            <Link
              key={i}
              href={
                isSearch
                  ? `?search=${search}&page=${page}&sort=${sort}&min=${range.min || 0}&max=${range.max || ""}`
                  : `?page=${page}&sort=${sort}&min=${range.min || 0}&max=${range.max || ""}`
              }
              className={`flex gap-0.5 lg:gap-2 items-center w-fit hover:text-lime-500 dark:hover:text-lime-500 ${
                (range.min && range.min == Number(minParam)) ||
                (range.max && range.max == Number(maxParam)) ||
                (range.min &&
                  range.max &&
                  range.min == Number(minParam) &&
                  range.max == Number(maxParam))
                  ? "text-lime-500 peer:bg-lime-500"
                  : " dark:text-muted-foreground"
              }`}
            >
              <Circle className="size-4 flex-shrink-0 peer-hover:fill-lime-500 group-checked:fill-lime-500 peer-active:fill-lime-500" />
              {range.display}
            </Link>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4 my-4"
      >
        <div className="col-span-1">
          <input
            {...register("min", { required: "Value required" })}
            type="number"
            id="min-filter"
            placeholder="min"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-1.5 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          />
          <>
            {errors.min && (
              <p className="text-red-500 text-xs md:text-sm">
                <>{errors.min.message}</>
              </p>
            )}
          </>
        </div>
        <div className="col-span-1">
          <input
            {...register("max", { required: "Value required" })}
            type="number"
            id="max-filter"
            placeholder="max"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-1.5 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-whit dark:focus:ring-lime-500 dark:focus:border-lime-500"
          />
          <>
            {errors.max && (
              <p className="text-red-500 text-xs md:text-sm">
                <>{errors.max.message}</>
              </p>
            )}
          </>
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="text-white bg-lime-700 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 me-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}

export default PriceFilter;
