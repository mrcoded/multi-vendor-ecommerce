"use client";

import React, { useState } from "react";

import "../../../styles/main.scss";

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
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="lg:ml-64 ml-0 flex-grow bg-slate-100 min-h-screen">
        {/* Header */}
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        {/* Main */}
        <main className="p-8 bg-slate-100 dark:bg-slate-900 text-slate-50 min-h-screen mt-16">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
