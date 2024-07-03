import Button from "@/components/landing/Button";
import IconButton from "@/components/landing/IconButton";
import { github } from "../lib/icons";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-[1200px] flex mt-24 gap-5">
      <Image src="/images/line.png" alt="line" width={37} height={363}></Image>
      <div className="w-[1200px] flex justify-start flex-col  gap-5">
        <h1 className="">
          We take our job to the{" "}
          <span className="text-gradient">Next Level</span>
        </h1>
        <div className="flex flex-row gap-5">
          <Button>Learn More</Button>
          <IconButton
            icon={github}
            href="https://example.com"
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
