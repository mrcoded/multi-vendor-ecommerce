import React from "react";
import Image from "next/image";

import { Row } from "@tanstack/react-table";
import { RowDatas } from "@/app/dashboard/(catalogue)/categories/columns";

function ImageColumn({
  row,
  accessorKey,
}: {
  row: Row<RowDatas>;
  accessorKey: string;
}) {
  const imageUrl = row.getValue(`${accessorKey}`);

  return (
    <div className="shrink-0">
      <Image
        width={500}
        height={500}
        src={imageUrl as string}
        alt="category image"
        className="w-10 h-10 rounded-full object-cover"
      />
    </div>
  );
}

export default ImageColumn;
