"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";

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
      className={`flex justify-between items-center p-6 fixed top-4 w-[calc(64%+2rem)] 
        transition-colors duration-600 ease-in rounded-[20px] border-2 border-b-2  ${
          scrolled ? "bg-card  border-slate-400/10 " : "border-transparent"
        }`}
    >
      <Image
        src="/images/logo.png"
        alt="logo"
        width={183 * 1.2}
        height={38 * 1.2}
      ></Image>
      <ul className="flex justify-center items-center gap-5">
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

      <div className="flex justify-center items-center gap-[35px]">
        <Button href="https://example.com" unstyled>
          Panel
        </Button>
        <Button href="https://example.com">Learn More</Button>
      </div>
    </div>
  );
};

export default Navbar;
