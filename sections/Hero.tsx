"use client";

import Button from "@/components/landing/Button";
import IconButton from "@/components/landing/IconButton";
import { github } from "../lib/icons";
import Image from "next/image";
import { TextWrite } from "@/components/landing/TextWrite";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div className="max-w-[1200px] w-full flex flex-col mt-16 items-center justify-start min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.75 }}
        className="
          w-full flex flex-col mt-8 items-center justify-center 
          bg-[url('/decorators/hero-pattern.svg')] bg-no-repeat bg-[top_-60px_center]
        "
      >
        <div className="flex flex-row gap-4 md:gap-12 max-w-[950px] w-[90%] pl-2 sm:pl-4">
          <Image
            src="/decorators/line-1.png"
            alt="line"
            width={37}
            height={363}
            className="mt-5 w-[28.6px] h-[285.4] lg:w-[37px] lg:h-[363px]"
          />
          <div className="flex justify-start flex-col gap-7 lg:gap-[3.75rem] relative ">
            {/* max-w-[550px] lg:max-w-[750px] */}
            <TextWrite className=" whitespace-pre-line max-w-[280px] md:max-w-[240.9px] sm:w-[750px] sm:max-w-[750px]">
              We take our job to the
              <span className="text-gradient whitespace-pre-line">
                Next Level
              </span>
            </TextWrite>

            <div className="flex flex-row gap-5">
              <Button>Learn More</Button>
              <IconButton
                icon={github}
                href="https://example.com"
                target="_blank"
              />
            </div>

            <div
              className="absolute -top-12 -left-32 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-60 -z-10 "
              style={{
                background:
                  "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
              }}
            ></div>
          </div>
        </div>
        <div className="relative w-[90%] px-0 sm:px-2">
          <Image
            className="hidden sm:block w-[85vw] lg:w-[65vw]"
            src="/images/card.png"
            alt="line"
            width={1200}
            height={472}
          ></Image>
          <Image
            className="bock sm:hidden w-[85vw] lg:w-[65vw]"
            src="/images/cardSmall.png"
            alt="line"
            width={1200}
            height={472}
          ></Image>

          <div
            id="decorator"
            className="absolute -top-12 -right-20 w-72 h-80  bg-color rounded-full filter blur-2xl opacity-70 -z-10"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
          <div
            id="decorator2"
            className="absolute -bottom-20 -left-20 w-72 h-72 bg-color rounded-full filter blur-2xl opacity-70 -z-10"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
        </div>

        <div className="hidden flex-row gap-12 max-w-[920px] w-[90%] pl-6 md:flex  ">
          <Image
            src="/decorators/line-2.png"
            alt="line"
            width={471}
            height={295}
            className="w-[51.5%]"
          ></Image>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
