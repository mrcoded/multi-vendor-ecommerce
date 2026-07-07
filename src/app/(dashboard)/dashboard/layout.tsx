"use client";

import React, { useState } from "react";
import Sidebar from "./_components/shared/Sidebar";
import Navbar from "./_components/shared/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        <main className="mt-16 flex-1 bg-muted/40 p-4 transition-all duration-300 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
