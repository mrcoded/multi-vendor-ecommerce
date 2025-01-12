import Link from "next/link";
import React from "react";

function EmptyCart() {
  return (
    <div className="flex items-center justify-center">
      <p className="md:text-2xl">
        Your Cart is empty{" "}
        <Link href="/" className="text-slate-800 dark:text-lime-500">
          Start Shopping
        </Link>
      </p>
    </div>
  );
}

export default EmptyCart;
