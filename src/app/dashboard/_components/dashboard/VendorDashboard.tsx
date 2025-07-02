import React from "react";
import getData from "@/lib/getData";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import OverViewCards from "@/components/cards/OverViewCards";

async function VendorDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  //Fetch all the sales
  const sales = await getData("orders/sales");
  const salesById = sales?.filter(
    (sale: { vendorId: string }) => sale.vendorId === user?.id
  );

  //Fetch all the products
  const products = await getData("products");
  const productsById = products?.filter(
    (product: { userId: string }) => product.userId === user?.id
  );

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <OverViewCards sales={salesById} products={productsById} />
    </div>
  );
}

export default VendorDashboard;
