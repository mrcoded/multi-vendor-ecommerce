"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

function BreadCrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path !== "");

  return (
    <nav className="col-span-full mb-6 w-full" aria-label="Breadcrumb">
      <ol className="flex items-center w-full">
        <li className="flex-shrink-0">
          <Link
            href="/"
            className="flex items-center text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400"
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            <span className="hidden sm:flex">Home</span>
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {pathArray.map((path, index) => {
          const isLast = index === pathArray.length - 1;
          const href = `/${pathArray.slice(0, index + 1).join("/")}`;

          return (
            <li key={index} className="flex items-center min-width-0">
              <ChevronRight className="w-4 h-4 text-slate-400 mx-1 flex-shrink-0" />

              <div className="min-w-0">
                {isLast ? (
                  <span className="block truncate text-xs font-bold text-slate-900 dark:text-white capitalize">
                    {path.replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="block truncate text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 capitalize"
                  >
                    {path.replace(/-/g, " ")}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
