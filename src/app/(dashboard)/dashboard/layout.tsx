"use client";

import React, { useState } from "react";
import Sidebar from "./_components/shared/Sidebar";
import Navbar from "./_components/shared/Navbar";

import AuthProvider from "@/providers/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
        {/* SIDEBAR*/}
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <div className="flex flex-col flex-1 lg:ml-64 min-w-0">
          {/* NAVBAR */}
          <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

          {/* MAIN VIEWPORT */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 mt-16 bg-slate-100 dark:bg-slate-900 transition-all duration-300">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
