"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Execution = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div
      id="execution"
      className="max-w-[1200px] w-full flex flex-col mt-4 items-center justify-center"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full flex flex-col mt-8 items-center justify-center"
      >
        <h2 id="h2" className="w-[400px] mb-12">
          How the <span className="text-gradient">execution</span> takes place
        </h2>

        <div className=" w-[49vw] rounded-[20px] border-2 border-slate-400/10 bg-card-landing p-12   relative">
          {/* <div
              className="absolute -top-12 -left-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10 "
              style={{
                background:
                  "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
              }}
            ></div> */}

          <div className="w-full h-full flex flex-row justify-between items-center">
            <Image
              src="/images/img-placeholder-1.png"
              alt="execution"
              width={280}
              height={280}
              className="h-[280px]"
            />
            <Image
              src="/images/exec-nr-1.png"
              alt="execution"
              width={80}
              height={80}
            />
            <div className="flex flex-col w-[280px]">
              <p className="text-[25px]  font-semibold">Visualization</p>
              <p className="text-md text-neutral-300">
                After setting clear goals, we will create a strategic execution
                plan that defines each step of fulfilling the goal vision and
                its agenda. This is the exact moment for feedback on details and
                the final agreement.
              </p>
            </div>
          </div>
        </div>

        <Image
          src="/decorators/exec-connector-1.png"
          alt="execution"
          width={570}
          height={140}
          className="w-[29.5vw]"
        />

        <div className="">
          <div className=" w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card-landing p-12   relative">
            <div
              className="absolute top-18 -right-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10 "
              style={{
                background:
                  "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
              }}
            ></div>

            <div className="w-full h-full flex flex-row justify-between items-center">
              <div className="flex flex-col w-[280px] items-end">
                <p className="text-[25px]  font-semibold">Application</p>
                <p className="text-md text-neutral-300 text-right">
                  Development of the project, where we will apply the strategies
                  and techniques that will make the project a success. This is
                  the moment when the project starts to take its final shape
                </p>
              </div>

              <Image
                src="/images/exec-nr-2.png"
                alt="execution"
                width={80}
                height={80}
              />
              <Image
                src="/images/img-placeholder-2.png"
                alt="execution"
                width={280}
                height={280}
                className="h-[280px]"
              />
            </div>
          </div>
        </div>

        <Image
          src="/decorators/exec-connector-2.png"
          alt="execution"
          width={570}
          height={140}
        />

        <div className="">
          <div className=" w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card-landing p-12   relative">
            <div
              className="absolute top-12 -left-20 w-72 h-80 rotate-45 bg-color rounded-full filter blur-2xl opacity-70 -z-10 "
              style={{
                background:
                  "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
              }}
            ></div>

            <div className="w-full h-full flex flex-row justify-between items-center">
              <Image
                src="/images/img-placeholder-3.png"
                alt="execution"
                width={280}
                height={280}
                className="h-[280px]"
              />
              <Image
                src="/images/exec-nr-3.png"
                alt="execution"
                width={80}
                height={80}
              />
              <div className="flex flex-col w-[280px]">
                <p className="text-[30px]  font-semibold">Finalization</p>
                <p className="text-md text-neutral-300">
                  The finalization of the project is the moment when we will
                  deliver the project to the client. This is the moment when we
                  will make the final adjustments to your website and make sure
                  everything is perfect.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[565px]">
          <Image
            src="/decorators/line-4.png"
            alt="line"
            width={259.34 * 1.3}
            height={162.66 * 1.3}
          ></Image>
        </div>
      </motion.div>
    </div>
  );
};

export default Execution;
