import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function BreadCrumb({
  title,
  resultCount,
}: {
  title: string;
  resultCount: number;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center">
        <Link href="/">Home</Link>
        <ChevronRight className="size-5" />
        <p>{title}</p>
      </div>
      <p>1-40 of {resultCount} results</p>
    </div>
  );
}

export default BreadCrumb;
