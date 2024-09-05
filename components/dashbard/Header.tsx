import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b  px-5">
      <div className="flex row gap-4 justify-center items-center">
        <div className="w-[3.5px] h-[21px] rounded-[18px] bg-[#4a18d2]"></div>
        <h1 className="text-xl font-semibold">Home</h1>
      </div>

      <div className="flex row items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full ml-auto"
            >
              <Image
                src="/images/dude.png"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full "
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
