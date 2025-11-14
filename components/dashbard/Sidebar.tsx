"use client";

import {
  Book,
  Bitcoin,
  LayoutDashboard,
  PieChart,
  Settings,
  HandCoins,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

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
}

function NavbarLink({
  icon: Icon,
  label,
  activeLink,
  href,
  onClick,
  isCollapsed,
}: NavbarLinkProps) {
  const router = useRouter();

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
              onClick={() => {
                router.push(href);
              }}
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
      onClick={() => {
        router.push(href);
      }}
    >
      <Icon className="size-5" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}

const navdata = [
  { icon: LayoutDashboard, label: "Panel", href: "/dashboard/panel" },
  { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
  { icon: MessageSquareText, label: "Chat", href: "/dashboard/chat" },
];

interface SideBarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

const SideBar = ({
  isCollapsed: externalIsCollapsed,
  setIsCollapsed: externalSetIsCollapsed,
}: SideBarProps = {}) => {
  const router = useRouter();
  const pathname = usePathname();

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

  const links = navdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      href={link.href}
      activeLink={link.href === activeLink}
      isCollapsed={isCollapsed}
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
            }}
          >
            <Bitcoin className="size-5" />
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
                  className="rounded-lg hover:bg-[hsl(240,23%,14%)]"
                  aria-label="Settings"
                  onClick={() => {
                    router.push("/dashboard/settings");
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
            className="w-full justify-start gap-3 rounded-lg px-3 hover:bg-[hsl(240,23%,14%)]"
            aria-label="Settings"
            onClick={() => {
              router.push("/dashboard/settings");
            }}
          >
            <Settings className="size-5" />
            <span className="text-sm font-medium">Settings</span>
          </Button>
        )}
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
      </nav>
    </aside>
  );
};

export default SideBar;
