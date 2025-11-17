"use client";

import {
  Book,
  Bitcoin,
  LayoutDashboard,
  Settings,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavbarLinkProps {
  icon: typeof Book;
  label: string;
  activeLink?: boolean;
  href: string;
  onClick?(): void;
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

function NavbarLink({
  icon: Icon,
  label,
  activeLink,
  href,
  onClick,
  isCollapsed,
  onNavigate,
}: NavbarLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
    onNavigate?.();
  };

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${activeLink ? "bg-[#181826]" : ""}`}
              aria-label={label}
              onClick={handleClick}
            >
              <Icon className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 rounded-lg px-3 hover:bg-[hsl(240,23%,14%)] ${
        activeLink ? "bg-[#181826]" : ""
      }`}
      aria-label={label}
      onClick={handleClick}
    >
      <Icon className="size-5" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}

// All available navigation items
const allNavData = [
  {
    icon: LayoutDashboard,
    label: "Panel",
    href: "/dashboard/panel",
    adminOnly: true,
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    href: "/dashboard/orders",
    adminOnly: true,
  },
  {
    icon: MessageSquareText,
    label: "Chat",
    href: "/dashboard/chat",
    adminOnly: false,
  },
  { icon: Users, label: "Users", href: "/dashboard/users", adminOnly: true },
];

interface SideBarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  isMobile?: boolean;
  onNavigate?: () => void;
}

const SideBar = ({
  isCollapsed: externalIsCollapsed,
  setIsCollapsed: externalSetIsCollapsed,
  isMobile = false,
  onNavigate,
}: SideBarProps = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, loading } = useAuthContext();

  const [activeLink, setActiveLink] = useState<string>("/dashboard/panel");
  const [internalIsCollapsed, setInternalIsCollapsed] =
    useState<boolean>(false);

  const isCollapsed =
    externalIsCollapsed !== undefined
      ? externalIsCollapsed
      : internalIsCollapsed;
  const setIsCollapsed = externalSetIsCollapsed || setInternalIsCollapsed;

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Filter navigation items based on user role
  const navdata = loading
    ? []
    : allNavData.filter((item) => !item.adminOnly || isAdmin);

  const links = navdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      href={link.href}
      activeLink={link.href === activeLink}
      isCollapsed={isCollapsed}
      onNavigate={onNavigate}
    />
  ));

  return (
    <aside
      className={`inset-y fixed left-0 z-20 flex h-full flex-col border-r transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      style={{ backgroundColor: "#12121c" }}
    >
      <div className="border-b p-4">
        {isCollapsed ? (
          <Button
            variant="outline"
            size="icon"
            className="bg-[#181826] hover:bg-[#252538]"
            aria-label="Home"
            onClick={() => {
              router.push("/");
              onNavigate?.();
            }}
          >
            <Bitcoin className="size-5" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full justify-start gap-3 px-3 bg-[#181826] hover:bg-[#252538]"
            aria-label="Home"
            onClick={() => {
              router.push("/");
              onNavigate?.();
            }}
          >
            <Image
              src="/icons/Icon.png"
              alt="Elevate Logo"
              width={16}
              height={16}
            />
            <span className="text-sm font-semibold">Elevate</span>
          </Button>
        )}
      </div>
      <nav className="grid gap-1 p-4">{links}</nav>
      <nav className="mt-auto grid gap-1 p-4">
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-lg hover:bg-[hsl(240,23%,14%)] ${
                    activeLink === "/dashboard/settings" ? "bg-[#181826]" : ""
                  }`}
                  aria-label="Settings"
                  onClick={() => {
                    router.push("/dashboard/settings");
                    onNavigate?.();
                  }}
                >
                  <Settings className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 rounded-lg px-3 hover:bg-[hsl(240,23%,14%)] ${
              activeLink === "/dashboard/settings" ? "bg-[#181826]" : ""
            }`}
            aria-label="Settings"
            onClick={() => {
              router.push("/dashboard/settings");
              onNavigate?.();
            }}
          >
            <Settings className="size-5" />
            <span className="text-sm font-medium">Settings</span>
          </Button>
        )}
        {/* Hide collapse button on mobile */}
        {!isMobile && (
          <div className="border-t pt-4">
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              className={`${
                isCollapsed ? "w-full" : "w-full justify-start gap-3 px-3"
              } rounded-lg hover:bg-[hsl(240,23%,14%)]`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="size-5" />
              ) : (
                <>
                  <ChevronLeft className="size-5" />
                  <span className="text-sm font-medium">Collapse</span>
                </>
              )}
            </Button>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default SideBar;
