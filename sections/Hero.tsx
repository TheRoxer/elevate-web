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
    <div className="max-w-[1200px] w-full flex flex-col mt-24 items-center justify-center min-h-screen">
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
        <div className="flex flex-row gap-12 w-[950px] ">
          <Image
            src="/decorators/line-1.png"
            alt="line"
            width={37}
            height={363}
            className="mt-5"
          ></Image>
          <div className="flex justify-start flex-col gap-[3.75rem] relative">
            <TextWrite className="w-[750px]">
              We take our job to the{" "}
              <span className="text-gradient">Next Level</span>
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
        <div className="relative">
          <Image
            src="/images/card.png"
            alt="line"
            width={1200}
            height={472}
          ></Image>
          <div
            className="absolute -top-12 -right-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10 "
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 bg-color rounded-full filter blur-2xl opacity-70 -z-10"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
        </div>

        <div className="flex flex-row gap-12 w-[920px] ">
          <Image
            src="/decorators/line-2.png"
            alt="line"
            width={237 * 2}
            height={426 * 2}
          ></Image>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
