"use client";

import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const { profile, signOut } = useAuthContext();
  const router = useRouter();

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return profile?.email?.slice(0, 2).toUpperCase() || "U";
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
      logger.error("Logout error", error);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex min-h-[69px] h-[69px] items-center gap-1 border-b bg-[#12121c] px-3 sm:px-5">
      <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center ml-12 md:ml-0">
        <div className="w-[3.5px] h-[21px] rounded-[18px] bg-[#4a18d2]"></div>
        <h1 className="text-lg sm:text-xl font-semibold">Elevate Dashboard</h1>
      </div>

      <div className="flex flex-row items-center gap-2 sm:gap-4 ml-auto mr-2 sm:mr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full ml-auto"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={profile?.avatar_url || undefined}
                  alt={profile?.full_name || profile?.email || "User"}
                />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {profile?.full_name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
