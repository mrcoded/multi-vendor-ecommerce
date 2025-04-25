"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

function BreadCrumb({
  title,
  resultCount,
}: {
  title: string;
  resultCount: number;
}) {
  const searchParams = useSearchParams();
  const pageSize = 3;
  const currentPage = searchParams.get("page") || "1";
  const startRange = (parseInt(currentPage) - 1) * pageSize + 1;
  const endRange = Math.ceil(parseInt(currentPage) * pageSize);

  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center">
        <Link href="/">Home</Link>
        <ChevronRight className="size-5" />
        <p>{title}</p>
      </div>
      <p>
        {startRange}-{endRange} of {resultCount} results
      </p>
    </div>
  );
}

export default BreadCrumb;
