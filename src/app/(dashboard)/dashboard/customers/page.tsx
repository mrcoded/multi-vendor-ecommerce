import React from "react";
import getData from "@/lib/getData";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

const page = async () => {
  const customers = await getData("customers");

  return (
    <div>
      <div className="py-8">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>
  );
};

export default page;
