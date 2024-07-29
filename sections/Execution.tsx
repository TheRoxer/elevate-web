import Image from "next/image";

const Execution = () => {
  return (
    <div
      id="execution"
      className="max-w-[1200px] w-full flex flex-col mt-8 items-center justify-center"
    >
      <h2 className="w-[400px] mt-6">
        How the <span className="text-gradient">execution</span> takes place
      </h2>

      <div className="pt-8">
        <div className=" w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card p-12  dark:bg-neutral-900">
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
      </div>

      <Image
        src="/decorators/exec-connector-1.png"
        alt="execution"
        width={570}
        height={140}
      />

      <div className="">
        <div className=" w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card p-12  dark:bg-neutral-900">
          <div className="w-full h-full flex flex-row justify-between items-center">
            <div className="flex flex-col w-[280px] items-end">
              <p className="text-[25px]  font-semibold">Application</p>
              <p className="text-md text-neutral-300 text-right">
                Development of the project, where we will apply the strategies
                and techniques that will make the project a success. This is the
                moment when the project starts to take its final shape
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
        <div className=" w-[950px] rounded-[20px] border-2 border-slate-400/10 bg-card p-12  dark:bg-neutral-900">
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
    </div>
  );
};

export default Execution;
