import React from "react";

import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="lg:ml-64 ml-0 flex-grow bg-slate-100 min-h-screen">
        {/* Header */}
        <Navbar />
        {/* Main */}
        <main className="p-8 bg-slate-100 dark:bg-slate-900 text-slate-50  mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
