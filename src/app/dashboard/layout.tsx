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
      <div className="w-full">
        {/* Navbar */}
        <Navbar />
        {/* Main */}
        <main className="ml-60 p-8 bg-slate-900 text-slate-50 min-h-screen mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
