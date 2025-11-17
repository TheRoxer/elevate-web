"use client";

import React from "react";
import { admin, ux, web } from "@/lib/icons";
import Image from "next/image";
import IconButton from "@/components/landing/IconButton";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay || 0,
      },
    }),
  };

  return (
    <div
      id="services"
      className="max-w-[1200px] w-[90vw] sm:w-[80vw] md:w-[90vw] lg:w-[80vw] flex flex-col items-center justify-center px-4 sm:px-0"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <h2 id="h2" className="w-full max-w-[96vw] sm:max-w-96 mt-4 px-2">
          Learn about our <span className="text-gradient">services</span>
        </h2>

        <div className="max-w-[1050px] w-[100%] mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mt-8 sm:mt-12 relative ">
          <div
            className="hidden sm:block absolute -bottom-40 -right-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10 "
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
          <div
            className="hidden sm:block absolute top-36 -left-20 w-72 h-72 bg-color rounded-full filter blur-2xl opacity-70 -z-10"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.4}
            variants={cardVariants}
            className={`group col-span-1 md:col-span-5 h-[280px] sm:h-[310px] rounded-[20px] border-2 border-slate-400/10 p-5 sm:p-6 
              bg-[#201d2c97] md:bg-[#201d2c00] md:bg-[url(/images/services-bg-1.png)] bg-cover bg-center bg-no-repeat
              relative overflow-hidden cursor-pointer`}
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 192, 255, 0.15) 0%, rgba(109, 109, 196, 0.15) 50%, rgba(63, 43, 150, 0.15) 100%)",
              }}
            />
            <div className="flex flex-col gap-2 space h-full justify-between relative z-10">
              <IconButton icon={web} target="_blank" />
              <div className="w-full max-w-[300px] xl:max-w-[400px] group-hover:-translate-y-2 transition-transform duration-300">
                <p className="text-[22px] sm:text-[25px] font-semibold">
                  Web Development
                </p>
                <p className="text-[14px] sm:text-[15px] text-neutral-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus iste est placeat saepe. Cumque fugiat earum
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.6}
            variants={cardVariants}
            className={`group col-span-1 md:col-span-3 h-[280px] sm:h-[310px] rounded-[20px] border-2 border-slate-400/10 p-5 sm:p-6 
              bg-[#201d2cc8] md:bg-[#201d2c00] md:bg-[url(/images/services-bg-2.png)] bg-cover bg-center bg-no-repeat
              relative overflow-hidden cursor-pointer`}
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 192, 255, 0.15) 0%, rgba(109, 109, 196, 0.15) 50%, rgba(63, 43, 150, 0.15) 100%)",
              }}
            />
            <div className="flex flex-col gap-2 space h-full justify-between relative z-10">
              <IconButton icon={ux} target="_blank" />
              <div className="w-full max-w-[270px] sm:max-w-[350px] group-hover:-translate-y-2 transition-transform duration-300">
                <p className="text-[22px] sm:text-[25px] font-semibold">
                  UI/UX Design
                </p>
                <p className="text-[14px] sm:text-[15px] text-neutral-300">
                  We design user-friendly interfaces that increase user
                  satisfaction and drive conversions. lorem ipsum dolor
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.8}
            variants={cardVariants}
            className={`group col-span-1 md:col-span-2 h-[280px] sm:h-[310px] rounded-[20px] border-2 border-slate-400/10 p-5 sm:p-6 
              bg-[#201d2cc8] md:bg-[#201d2c00] md:bg-[url(/images/services-bg-3.png)] bg-cover bg-center bg-no-repeat
              relative overflow-hidden cursor-pointer`}
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 192, 255, 0.15) 0%, rgba(109, 109, 196, 0.15) 50%, rgba(63, 43, 150, 0.15) 100%)",
              }}
            />
            <div className="flex flex-col gap-2 space h-full justify-between relative z-10">
              <IconButton icon={admin} target="_blank" />
              <div className="w-full max-w-[210px] xl:max-w-[350px] group-hover:-translate-y-2 transition-transform duration-300">
                <p className="text-[22px] sm:text-[25px] font-semibold">
                  Administration
                </p>
                <p className="text-[14px] sm:text-[15px] text-neutral-300">
                  We provide a wide range of administrative services to help
                  businesses run smoothly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Image
        src="/decorators/line-3.png"
        alt="line"
        width={50}
        height={250}
        className="mt-8 sm:mt-16"
      ></Image>
    </div>
  );
};

export default Services;
