const Hero = () => {
  return (
    <div className="max-w-[1200px] w-full flex flex-col mt-8 items-center justify-center">
      <h2 className="w-96 mt-6">
        Learn about our <span className="text-gradient">services</span>
      </h2>

      <div className="w-[1040px] mx-auto grid grid-rows-2 grid-cols-5 gap-4 mt-8">
        <div className="row-span-1 col-span-5 h-[300px] rounded-xl border-2 border-slate-400/10 bg-card p-4 dark:bg-neutral-900"></div>
        <div className="row-span-1 col-span-3 h-[300px] rounded-xl border-2 border-slate-400/10 bg-card p-4 dark:bg-neutral-900"></div>
        <div className="row-span-1 col-span-2 h-[300px] rounded-xl border-2 border-slate-400/10 bg-card p-4 dark:bg-neutral-900"></div>
      </div>
    </div>
  );
};

export default Hero;
