"use client";

import { useState, useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import SideBar from "./Sidebar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const { sidebarCollapsed, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } =
    useUIStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for hydration to complete to avoid mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use default state during SSR/hydration
  const collapsed = isHydrated ? sidebarCollapsed : false;
  const mobileOpen = isHydrated ? mobileMenuOpen : false;

  return (
    <div className="grid h-screen w-full overflow-hidden">
      {/* Desktop Sidebar - Hidden on mobile (md = 768px) */}
      <div className="hidden md:block">
        <SideBar isCollapsed={collapsed} setIsCollapsed={toggleSidebar} />
      </div>

      {/* Mobile Menu Button - Only visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-[#12121c] hover:bg-[#181826] border border-border"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          className="p-0 w-64 bg-[#12121c] border-r"
          aria-describedby={"navigation-menu"}
        >
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <SideBar
            isCollapsed={false}
            isMobile
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div
        className={`flex flex-col h-screen transition-all duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
