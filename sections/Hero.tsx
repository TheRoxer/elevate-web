import Button from "@/components/landing/Button";
import IconButton from "@/components/landing/IconButton";
import { github } from "../lib/icons";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="max-w-[1200px] w-full flex flex-col mt-24 items-center justify-center min-h-screen">
      <div className="flex flex-row gap-12 w-[950px]">
        <Image
          src="/images/line.png"
          alt="line"
          width={37}
          height={363}
          className="mt-5"
        ></Image>
        <div className="flex justify-start flex-col gap-[3.75rem]">
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
      <Image
        src="/images/card.png"
        alt="line"
        width={1200}
        height={472}
        layout="responsive"
      ></Image>
    </div>
  );
};

export default Hero;
