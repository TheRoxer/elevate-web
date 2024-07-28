import { admin, ux, web } from "../lib/icons";
import Card from "@/components/landing/ServicesCard";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="max-w-[1200px] w-full flex flex-col mt-8 items-center justify-center">
      <h2 className="w-96 mt-6">
        Learn about our <span className="text-gradient">services</span>
      </h2>

      <div className="w-[1040px] mx-auto grid grid-rows-2 grid-cols-5 gap-6 mt-8">
        <Card
          title="Web Development"
          description="We build websites that serve as powerful marketing tools and bring memorable brand experiences."
          icon={web}
          colspan={5}
          rowspan={1}
        />
        <Card
          title="UI/UX Design"
          description="We design user-friendly interfaces that increase user satisfaction and drive conversions."
          icon={ux}
          colspan={3}
          rowspan={1}
        />
        <Card
          title="Administration"
          description="We provide a wide range of administrative services to help businesses run smoothly."
          icon={admin}
          colspan={2}
          rowspan={1}
        />
      </div>

      <Image
        src="/decorators/line-3.svg"
        alt="line"
        width={5 * 1.4}
        height={292 * 1.4}
        className="mt-12"
      ></Image>
    </div>
  );
};

export default Hero;
