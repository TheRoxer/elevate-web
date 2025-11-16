"use client";

import { useState, useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import SideBar from "./Sidebar";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for hydration to complete to avoid mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use default state during SSR/hydration
  const collapsed = isHydrated ? sidebarCollapsed : false;

  return (
    <div className="grid h-screen w-full">
      <SideBar isCollapsed={collapsed} setIsCollapsed={toggleSidebar} />
      <div
        className={`flex flex-col transition-all duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
