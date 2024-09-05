"use client";

import {
  Book,
  Bot,
  Code2,
  LifeBuoy,
  Settings2,
  SquareTerminal,
  SquareUser,
  Bitcoin,
  LayoutDashboard,
  PieChart,
  Settings,
  HandCoins,
  MessageSquareText,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface NavbarLinkProps {
  icon: typeof Book;
  label: string;
  activeLink?: boolean;
  href: string;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  activeLink,
  href,
  onClick,
}: NavbarLinkProps) {
  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-lg ${activeLink ? "bg-muted" : ""}`}
            aria-label="Playground"
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

const navdata = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard/home" },
  { icon: PieChart, label: "Monitoring", href: "/dashboard/monitoring" },
  { icon: HandCoins, label: "Transfers", href: "/dashboard/transfers" },
  { icon: MessageSquareText, label: "Chat", href: "/dashboard/chat" },
];

const SideBar = () => {
  const router = useRouter();

  const [activeLink, setActiveLink] = useState<string>("/dashboard/panel");

  useEffect(() => {
    setActiveLink(window.location.pathname);
    handleClick(activeLink);
  }, [setActiveLink, activeLink]);

  const handleClick = (path: string) => {
    setActiveLink(path);
  };

  const links = navdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      href={link.href}
      activeLink={link.href === activeLink}
      onClick={() => handleClick(navdata[index].href)}
    />
  ));

  return (
    <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Home"
          onClick={() => {
            router.push("/");
          }}
        >
          <Bitcoin className="size-5" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">{links}</nav>
      <nav className="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
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
      </nav>
    </aside>
  );
};

export default SideBar;
