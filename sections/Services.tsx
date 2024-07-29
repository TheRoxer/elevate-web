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

  return (
    <div
      id="services"
      className="max-w-[1200px] w-full flex flex-col mt-8 items-center justify-center"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.75 }}
        className="w-full flex flex-col mt-8 items-center justify-center"
      >
        <h2 className="w-96 mt-6">
          Learn about our <span className="text-gradient">services</span>
        </h2>

        <div className="w-[1040px] mx-auto grid grid-rows-2 grid-cols-5 gap-6 mt-8 ">
          <div
            className={`col-span-5 row-span-1 h-[310px] rounded-[20px] border-2 border-slate-400/10 bg-card p-4 dark:bg-neutral-900`}
          >
            <div className="flex flex-col gap-2 space h-full justify-between">
              <IconButton icon={web} target="_blank" />
              <div className="w-[400px]">
                <p className="text-[30px]  font-semibold">Web Development</p>
                <p className="text-md text-neutral-300">
                  We build websites that serve as powerful marketing tools and
                  bring memorable brand experiences.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`col-span-3 row-span-1 h-[310px] rounded-[20px] border-2 border-slate-400/10 bg-card p-4 dark:bg-neutral-900`}
          >
            <div className="flex flex-col gap-2 space h-full justify-between">
              <IconButton icon={ux} target="_blank" />
              <div className="w-[350px]">
                <p className="text-[30px]  font-semibold">UI/UX Design</p>
                <p className="text-md text-neutral-300">
                  We design user-friendly interfaces that increase user
                  satisfaction and drive conversions.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`col-span-2 row-span-1 h-[310px] rounded-[20px] border-2 border-slate-400/10 bg-card p-4 dark:bg-neutral-900`}
          >
            <div className="flex flex-col gap-2 space h-full justify-between">
              <IconButton icon={admin} target="_blank" />
              <div className="w-[350px]">
                <p className="text-[30px]  font-semibold">Administration</p>
                <p className="text-md text-neutral-300">
                  We provide a wide range of administrative services to help
                  businesses run smoothly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
