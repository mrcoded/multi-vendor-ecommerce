import React from "react";
import getData from "@/lib/getData";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { columns } from "./columns";
import { DataTable } from "@/components/tables/DataTable/page";

const page = async () => {
  const sales = await getData("orders/sales");
  const session = await getServerSession(authOptions);

  //GET userID and Role
  const id = session?.user?.id;
  const role = session?.user?.role;

  //Fetch all the sales
  //Filter by vendorId => to get sales for this vendor
  //Fetch Order by Id
  //Customer Name, Email, Phone, OrderNumber

  const vendorSales = sales?.filter(
    (sale: { userId: string }) => sale.userId === id
  );

  return (
    <div>
      {/* Header */}
      {/* <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkAction="Add Coupon"
      /> */}

      {/* Table Actions */}
      {/* <TableActions /> */}

      <div className="py-8">
        {role === "ADMIN" ? (
          <DataTable data={sales} columns={columns} />
        ) : (
          <DataTable data={vendorSales} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default page;
