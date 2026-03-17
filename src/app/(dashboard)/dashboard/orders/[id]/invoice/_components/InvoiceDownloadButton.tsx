"use client";

import React from "react";

function InvoiceDownloadButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center p-1.5 sm:px-4 sm:py-3 text-xs
        font-bold dark:text-gray-900 transition-all duration-200 bg-slate-800 dark:bg-gray-100 text-slate-200 border
        border-transparent rounded-md focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-gray-500"
    >
      Download Invoice
    </button>
  );
}

export default InvoiceDownloadButton;
