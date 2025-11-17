"use client";

import Button from "@/components/landing/Button";
import IconButton from "@/components/landing/IconButton";
import { github } from "@/lib/icons";
import Image from "next/image";
import { TextWrite } from "@/components/landing/TextWrite";
import LightRays from "@/components/ui/lightRays";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div className="max-w-[1200px] w-full flex flex-col mt-12 sm:mt-16 items-center justify-start min-h-screen px-4 sm:px-0">
      {/* LightRays Background */}
      <div className="absolute top-0 left-0 w-full h-screen -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#12121c] pointer-events-none z-10"></div>
        <LightRays
          raysOrigin="top-center"
          raysColor="#A8C0FF"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.75 }}
        className="w-full flex flex-col mt-4 sm:mt-8 items-center justify-center"
      >
        <div className="flex flex-row gap-3 sm:gap-4 md:gap-12 max-w-[950px] w-full sm:w-[90%] pl-2 sm:pl-4">
          <Image
            src="/decorators/line-1.png"
            alt="line"
            width={37}
            height={363}
            className="hidden sm:block mt-3 sm:mt-5 w-[20px] h-[200px] sm:w-[28.6px] sm:h-[285.4px] lg:w-[37px] lg:h-[363px]"
          />
          <div className="flex justify-start sm:justify-start flex-col gap-4 sm:gap-7 lg:gap-[3.75rem] relative w-full items-center sm:items-start">
            <div className="flex flex-col gap-2 sm:items-start items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=" mb-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-400/20 bg-slate-800/30 backdrop-blur-sm">
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute w-3 h-3 rounded-full animate-ping opacity-75"
                      style={{
                        background:
                          "linear-gradient(109deg, rgba(168, 192, 255, 0.9) 12.88%, rgba(90, 82, 177, 0.9) 60.68%, rgba(63, 43, 150, 0.9) 87.02%)",
                      }}
                    ></div>
                    <div
                      className="relative w-2 h-2 rounded-full"
                      style={{
                        background:
                          "linear-gradient(109deg, rgba(168, 192, 255, 1) 12.88%, rgba(90, 82, 177, 1) 60.68%, rgba(63, 43, 150, 1) 87.02%)",
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-neutral-300 font-medium">
                    Creating Your Dreams
                  </span>
                </div>
              </motion.div>

              <TextWrite className="whitespace-pre-line max-w-[320px] sm:max-w-[750px] lg:max-w-[708px] text-center sm:text-left">
                We take our job to the
                <span className="text-gradient whitespace-pre-line">
                  Next Level
                </span>
              </TextWrite>
            </div>

            <div className="flex flex-row gap-3 sm:gap-5 justify-center sm:justify-start">
              <Button>Learn More</Button>
              <IconButton
                icon={github}
                href="https://example.com"
                target="_blank"
              />
            </div>

            <div
              className="hidden sm:block absolute -top-12 -left-32 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-60 -z-10 "
              style={{
                background:
                  "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
              }}
            ></div>
          </div>
        </div>
        <div className="relative w-full sm:w-[90%] px-0 sm:px-2 mt-6 sm:mt-0">
          <Image
            className="hidden sm:block w-[85vw] lg:w-[65vw]"
            src="/images/card.png"
            alt="line"
            width={1200}
            height={472}
          ></Image>
          <Image
            className="block sm:hidden w-full max-w-[95vw]"
            src="/images/cardSmall.png"
            alt="line"
            width={1200}
            height={472}
          ></Image>

          <div
            id="decorator"
            className="absolute -top-12 -right-10 sm:-right-20 w-48 h-48 sm:w-72 sm:h-80 bg-color rounded-full filter blur-2xl opacity-70 -z-10 animate-blob animation-delay-2000"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
          <div
            id="decorator2"
            className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-48 h-48 sm:w-72 sm:h-72 bg-color rounded-full filter blur-2xl opacity-70 -z-10 animate-blob"
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
