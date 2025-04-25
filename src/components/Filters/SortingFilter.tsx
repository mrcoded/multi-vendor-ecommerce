"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

  const sortingLinks = [
    {
      title: "Relevance",
      href: `/category/${slug}`,
      sort: null,
    },
    {
      title: "Price - High to Low",
      href: `/category/${slug}?sort=desc`,
      sort: "desc",
    },
    {
      title: "Price - Low to High",
      href: `/category/${slug}?sort=asc`,
      sort: "asc",
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-medium">
        {isSearch && "Search Results - "}
        {title}
      </h2>
      <div className="flex text-sm items-center gap-3">
        <p>Sort by:</p>
        <div className="flex items-center">
          {sortingLinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className={`${link.sort === sortParam ? "border border-lime-400 bg-slate-800 px-2 py-1 text-lime-400" : "border border-slate-500 px-2 py-1"}`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SortingFilter;
