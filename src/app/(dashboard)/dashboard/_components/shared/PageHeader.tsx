import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import Heading from "@/components/shared/Heading";

const PageHeader = ({
  heading,
  href,
  linkAction,
}: {
  heading: string;
  href: string;
  linkAction: string;
}) => {
  return (
    <div className="flex justify-between py-4 mb-4">
      <Heading title={heading} />
      <Link
        className="text-white bg-lime-600 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-600/50 font-medium rounded-lg text-base px-2 md:px-3 md:py-2.5 text-center inline-flex items-center dark:focus:ring-lime-600/55 me-2 space-x-1.5"
        href={href}
      >
        <Plus className="size-4 md:size-6" />
        <span>{linkAction}</span>
      </Link>
    </div>
  );
};

export default PageHeader;
