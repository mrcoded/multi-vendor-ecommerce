import React from "react";
import Link from "next/link";

import { Pencil } from "lucide-react";

function EditBtn({
  title,
  editPageRoute,
}: {
  title: string;
  editPageRoute: string;
}) {
  return (
    <Link
      href={`/dashboard/${editPageRoute}`}
      className="flex items-center text-lime-600"
    >
      <Pencil className="mr-2 w-4 h-4" />
      <span>Edit {title}</span>
    </Link>
  );
}

export default EditBtn;
