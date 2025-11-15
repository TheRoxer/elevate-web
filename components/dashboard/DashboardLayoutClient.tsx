"use client";

import { useUIStore } from "@/store/uiStore";
import SideBar from "./Sidebar";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <div className="grid h-screen w-full">
      <SideBar isCollapsed={sidebarCollapsed} setIsCollapsed={toggleSidebar} />
      <div
        className={`flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
