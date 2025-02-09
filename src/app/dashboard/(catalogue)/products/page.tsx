import React from "react";
import getData from "@/lib/getData";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

import PageHeader from "../../_components/shared/PageHeader";
import TableActions from "../../_components/shared/TableActions";

const page = async () => {
  const products = await getData("products");
  const session = await getServerSession(authOptions);

  //GET userID and Role
  const id = session?.user?.id;
  const role = session?.user?.role;

  if (!session) {
    return null;
  }

  const vendorProducts = products.filter(
    (product: { userId: string }) => product.userId === id
  );

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkAction="Add Product"
      />

      {/* Table Actions */}
      <TableActions />

      <div className="py-8">
        {role === "ADMIN" ? (
          <DataTable data={products} columns={columns} />
        ) : (
          <DataTable data={vendorProducts} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default page;
