"use client";

import { useState } from "react";
import SideBar from "./Sidebar";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="grid h-screen w-full">
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex flex-col transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
