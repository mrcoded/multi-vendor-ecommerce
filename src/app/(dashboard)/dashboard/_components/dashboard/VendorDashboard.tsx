import React from "react";
import getData from "@/lib/getData";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import OverViewCards from "@/components/cards/OverViewCards";
import { Info } from "lucide-react";

async function VendorDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const { id, status = false } = user;

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

  if (!status) {
    return (
      <div className="max-w-2xl mx-auto min-h-screen mt-8">
        <div
          role="alert"
          id="alert-additional-content-1"
          className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        >
          <div className="flex items-center">
            <Info className="flex shrink-0 size-4 me-2" />
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Account Under Review</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            Your account details are currently under review. Please note that it
            may take 24-48 hours for approval. Thank you for your patience.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <OverViewCards sales={salesById} products={productsById} />
    </div>
  );
}

export default VendorDashboard;
