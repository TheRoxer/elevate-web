"use client";

import React from "react";
import { admin, ux, web } from "../lib/icons";
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
    visible: (delay: any) => ({
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
      className="max-w-[1200px] w-[80vw] md:w-[90vw] lg:w-[80vw] flex flex-col items-center justify-center"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <h2 id="h2" className="w-96 mt-4">
          Learn about our <span className="text-gradient">services</span>
        </h2>

        <div className="w-[100%] mx-auto grid grid-rows-2 grid-cols-5 gap-6 mt-12 relative ">
          <div
            className="absolute -bottom-40 -right-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10 "
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
          <div
            className="absolute top-36 -left-20 w-72 h-72 bg-color rounded-full filter blur-2xl opacity-70 -z-10"
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
            className={`col-span-5 row-span-1 h-[310px] rounded-[20px] border-2 border-slate-400/10 p-6 
              bg-[#201d2c97] md:bg-[#201d2c00] md:bg-[url(/images/services-bg-1.png)] bg-cover bg-center bg-no-repeat`}
          >
            <div className="flex flex-col gap-2 space h-full justify-between">
              <IconButton icon={web} target="_blank" />
              <div className="w-[300px] xl:w-[400px]">
                <p className="text-[25px]  font-semibold">Web Development</p>
                <p className="text-[15px] text-neutral-300">
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
            className={`col-span-5 md:col-span-3 row-span-1 h-[310px] rounded-[20px] border-2 border-slate-400/10 p-6 
              bg-[#201d2cc8] md:bg-[#201d2c00] md:bg-[url(/images/services-bg-2.png)] bg-cover bg-center bg-no-repeat`}
          >
            <div className="flex flex-col gap-2 space h-full justify-between">
              <IconButton icon={ux} target="_blank" />
              <div className="w-[270px] sm:w-[350px]">
                <p className="text-[25px]  font-semibold">UI/UX Design</p>
                <p className="text-[15px] text-neutral-300">
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
            className={`col-span-5 md:col-span-2 row-span-1 h-[310px] rounded-[20px] border-2 border-slate-400/10 p-6 
              bg-[#201d2cc8] md:bg-[#201d2c00] md:bg-[url(/images/services-bg-3.png)] bg-cover bg-center bg-no-repeat`}
          >
            <div className="flex flex-col gap-2 space h-full justify-between">
              <IconButton icon={admin} target="_blank" />
              <div className="w-[210px] xl:w-[350px]">
                <p className="text-[25px]  font-semibold">Administration</p>
                <p className="text-[15px] text-neutral-300">
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
        className="mt-16"
      ></Image>
    </div>
  );
};

export default Services;
