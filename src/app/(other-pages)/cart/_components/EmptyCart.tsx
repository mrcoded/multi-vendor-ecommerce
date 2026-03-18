import Link from "next/link";
import React from "react";
import { ShoppingCart, ArrowLeft } from "lucide-react";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 scale-150 bg-lime-100 dark:bg-lime-900/20 rounded-full blur-3xl opacity-50" />
        <div className="relative flex items-center justify-center w-24 h-24 bg-white dark:bg-slate-900 rounded-full shadow-xl border border-slate-100 dark:border-slate-800">
          <ShoppingCart
            className="w-10 h-10 text-slate-400 dark:text-slate-500"
            strokeWidth={1.5}
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">0</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
        Your cart feels a bit light
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
        It looks like you haven't added anything to your cart yet. Explore our
        latest arrivals and find something you love!
      </p>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-2 sm:py-3 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-lime-600/20 active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          Start Shopping
        </Link>
      </div>

      <p className="mt-12 text-sm text-slate-400 flex items-center gap-1">
        Need help?{" "}
        <Link href="#" className="underline hover:text-lime-600">
          Contact Support
        </Link>
      </p>
    </div>
  );
}

export default EmptyCart;
