"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Execution = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ref3, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div
      id="execution"
      className="max-w-[1200px] w-[90vw] sm:w-[80vw] flex flex-col mt-4 items-center justify-center px-4 sm:px-0"
    >
      <div className="w-full flex flex-col mt-8 items-center justify-center">
        <h2
          id="h2"
          className="w-full max-w-[90vw] sm:max-w-[400px] mb-8 sm:mb-12 px-2"
        >
          How the <span className="text-gradient">execution</span> takes place
        </h2>

        <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={sectionVariants}
          className="flex flex-col items-center relative"
        >
          <div
            className="hidden md:block absolute -top-12 -left-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>

          <div className="group w-full sm:w-[70vw] md:w-[90vw] lg:w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card-landing p-6 sm:p-8 md:p-12 relative mb-8 sm:mb-12 md:mb-0 cursor-pointer overflow-hidden">
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 192, 255, 0.15) 0%, rgba(109, 109, 196, 0.15) 50%, rgba(63, 43, 150, 0.15) 100%)",
              }}
            />

            <div className="w-full h-full gap-4 sm:gap-6 flex flex-col md:flex-row justify-between items-center relative z-10">
              <Image
                src="/images/img-placeholder-1.png"
                alt="execution"
                width={220}
                height={220}
                className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]"
              />
              <Image
                src="/images/exec-nr-1.png"
                alt="execution"
                width={80}
                height={80}
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
              />
              <div className="flex flex-col w-full sm:w-[280px] items-center md:items-start group-hover:-translate-y-2 transition-transform duration-300">
                <p className="text-[22px] sm:text-[25px] font-semibold">
                  Visualization
                </p>
                <p className="text-sm sm:text-md text-neutral-300 text-center md:text-left">
                  After setting clear goals, we will create a strategic
                  execution plan that defines each step of fulfilling the goal
                  vision and its agenda. This is the exact moment for feedback
                  on details and the final agreement.
                </p>
              </div>
            </div>
          </div>

          <Image
            src="/decorators/exec-connector-1.png"
            alt="execution"
            width={637}
            height={140}
            className="hidden md:block"
          />
        </motion.div>

        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={sectionVariants}
          className="flex flex-col items-center relative"
        >
          <div
            className="hidden md:block absolute top-18 -right-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>

          <div className="group w-full sm:w-[70vw] md:w-[90vw] lg:w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card-landing p-6 sm:p-8 md:p-12 relative mb-8 sm:mb-12 md:mb-0 cursor-pointer overflow-hidden">
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 192, 255, 0.15) 0%, rgba(109, 109, 196, 0.15) 50%, rgba(63, 43, 150, 0.15) 100%)",
              }}
            />

            <div className="w-full h-full gap-4 sm:gap-6 flex flex-col md:flex-row-reverse justify-between items-center relative z-10">
              <Image
                src="/images/img-placeholder-2.png"
                alt="execution"
                width={220}
                height={220}
                className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]"
              />
              <Image
                src="/images/exec-nr-2.png"
                alt="execution"
                width={80}
                height={80}
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
              />
              <div className="flex flex-col w-full sm:w-[280px] items-center md:items-end group-hover:-translate-y-2 transition-transform duration-300">
                <p className="text-[22px] sm:text-[25px] font-semibold">
                  Application
                </p>
                <p className="text-sm sm:text-md text-neutral-300 text-center md:text-right">
                  Development of the project, where we will apply the strategies
                  and techniques that will make the project a success. This is
                  the moment when the project starts to take its final shape
                </p>
              </div>
            </div>
          </div>

          <Image
            src="/decorators/exec-connector-2.png"
            alt="execution"
            width={637}
            height={140}
            className="hidden md:block"
          />
        </motion.div>

        <motion.div
          ref={ref3}
          initial="hidden"
          animate={inView3 ? "visible" : "hidden"}
          variants={sectionVariants}
          className="flex flex-col items-center relative"
        >
          <div
            className="hidden md:block absolute top-12 -left-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>

          <div className="group w-full sm:w-[70vw] md:w-[90vw] lg:w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card-landing p-6 sm:p-8 md:p-12 relative mb-8 sm:mb-12 md:mb-0 cursor-pointer overflow-hidden">
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 192, 255, 0.15) 0%, rgba(109, 109, 196, 0.15) 50%, rgba(63, 43, 150, 0.15) 100%)",
              }}
            />

            <div className="w-full h-full gap-4 sm:gap-6 flex flex-col md:flex-row justify-between items-center relative z-10">
              <Image
                src="/images/img-placeholder-3.png"
                alt="execution"
                width={220}
                height={220}
                className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]"
              />
              <Image
                src="/images/exec-nr-3.png"
                alt="execution"
                width={80}
                height={80}
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
              />
              <div className="flex flex-col w-full sm:w-[280px] items-center md:items-start group-hover:-translate-y-2 transition-transform duration-300">
                <p className="text-[25px] sm:text-[30px] font-semibold">
                  Finalization
                </p>
                <p className="text-sm sm:text-md text-neutral-300 text-center md:text-left">
                  The finalization of the project is the moment when we will
                  deliver the project to the client. This is the moment when we
                  will make the final adjustments to your website and make sure
                  everything is perfect.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[637px]">
            <Image
              src="/decorators/line-4.png"
              alt="line"
              width={259.34 * 1.4}
              height={162.66 * 1.3}
              className="hidden md:block"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Execution;
