import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { Circle } from "lucide-react";

function PriceFilter({ slug }: { slug: string }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");
  console.log(minParam, maxParam);

  const priceRanges = [
    {
      display: "under 300",
      max: 300,
    },
    {
      display: "Between 300 and 500",
      max: 500,
      min: 300,
    },
    {
      display: "Between 500 and 700",
      max: 700,
      min: 500,
    },
    {
      display: "Above 700",
      min: 700,
    },
  ];

  const { handleSubmit, reset, register } = useForm();

  const onSubmit = (data: FieldValues) => {
    const { min, max } = data;
    console.log(min, max);

    if (min && max) {
      router.push(`/category/${slug}?sort=asc&max=${max}&min=${min}`);
      reset();
    } else if (min) {
      router.push(`/category/${slug}?sort=asc&min=${min}`);
      reset();
    } else if (max) {
      router.push(`/category/${slug}?sort=asc&max=${max}`);
      reset();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Price</h2>
        <Link
          href={`/category/${slug}`}
          className="text-white bg-lime-700 hover:bg-lime-800 focus:ring:4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
        >
          Reset Filters
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        {priceRanges.map((range, i) => {
          return (
            <Link
              key={i}
              href={
                range.max && range.min
                  ? `/category/${slug}?sort=asc&max=${range.max}&min=${range.min}`
                  : range.max
                    ? `/category/${slug}?sort=asc&max=${range.max}:`
                    : `/category/${slug}?sort=asc&min=${range.min}`
              }
              className={`${
                (range.min && range.min == Number(minParam)) ||
                (range.max && range.max == Number(maxParam)) ||
                (range.min &&
                  range.max &&
                  range.min == Number(minParam) &&
                  range.max == Number(maxParam))
                  ? "flex gap-2 items-center text-lime-500"
                  : "flex gap-2 items-center"
              }`}
            >
              <Circle className="size-4 flex-shrink-0" />
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
            {...register("min")}
            type="number"
            id="cvv-input"
            placeholder="min"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          />
        </div>
        <div className="col-span-1">
          <input
            {...register("max")}
            type="number"
            id="cvv-input"
            placeholder="max"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="text-white bg-lime-700 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}

export default PriceFilter;
