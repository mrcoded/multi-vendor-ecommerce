import React from "react";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
      <Heading title={heading} />

      <Button variant="accent" asChild className="self-start sm:self-auto">
        <Link href={href}>
          <Plus className="size-4" />

          <span>{linkAction}</span>
        </Link>
      </Button>
    </div>
  );
};

export default PageHeader;
