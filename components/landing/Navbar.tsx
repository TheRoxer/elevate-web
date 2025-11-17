"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";

//
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button as ShadcnButton } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
//

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex justify-between items-center p-4 sm:p-6 fixed top-2 sm:top-4 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] xl:w-[calc(64%+2rem)] 
        transition-colors duration-600 ease-in rounded-[15px] sm:rounded-[20px] border-2 border-b-2 z-50 backdrop-blur  ${
          scrolled
            ? "bg-card-landing  border-slate-400/10 "
            : "border-transparent"
        }`}
    >
      <a href="#">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={219.6}
          height={45.6}
          className="w-[140px] h-[29px] sm:w-[183px] sm:h-[38px] md:w-[219.6px] md:h-[45.6px]"
        ></Image>
      </a>

      <ul className="justify-center items-center gap-4 lg:gap-5 hidden lg:flex">
        <li>
          <a
            href="/#"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/#services"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/#execution"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Execution
          </a>
        </li>
        <li>
          <a
            href="/#testimonials"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Testimonials
          </a>
        </li>
      </ul>

      <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-[35px]">
        <Button
          href="/auth/signin"
          unstyled
          className="hidden md:flex text-sm sm:text-base"
        >
          Login
        </Button>
        <Button
          href="/#services"
          className="hidden sm:flex text-sm sm:text-base px-4 sm:px-6"
        >
          Learn More
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <ShadcnButton variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </ShadcnButton>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="#" prefetch={false}>
              <a href="#">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={183 * 1.2}
                  height={38 * 1.2}
                ></Image>
              </a>
              <span className="sr-only">Elevate</span>
            </Link>
            <div className="grid gap-2 py-6">
              <SheetClose asChild>
                <Link
                  href="#"
                  className="flex w-full items-center py-2 text-lg"
                  prefetch={false}
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#services"
                  className="flex w-full items-center py-2 text-lg"
                  prefetch={false}
                >
                  Services
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#execution"
                  className="flex w-full items-center py-2 text-lg"
                  prefetch={false}
                >
                  Execution
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#testimonials"
                  className="flex w-full items-center py-2 text-lg "
                  prefetch={false}
                >
                  Testimonials
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/auth/signin"
                  className="flex w-full items-center py-2 text-lg "
                  prefetch={false}
                >
                  Login
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
function MenuIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Navbar;
