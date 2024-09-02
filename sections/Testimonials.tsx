"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Autoplay from "embla-carousel-autoplay";

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div
      id="testimonials"
      className="max-w-[1200px] w-full flex flex-col  items-center justify-center"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full flex flex-col mt-4 items-center justify-center"
      >
        <h2 id="h2" className="w-[450px] text-center ml-8 ">
          What clients say <span className="text-gradient">about us</span>
        </h2>
        <Carousel
          className="max-w-[1200px] mt-12 relative "
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          {/* <div
            className="absolute -top-24 left-28 w-52 h-52 bg-purple-300 rounded-full mix-blend-normal filter blur-xl opacity-70 animate-blob"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div>
          <div
            className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000"
            style={{
              background:
                "linear-gradient(176deg, rgba(168, 192, 255, 0.63) -6.53%, rgba(109, 109, 196, 0.63) 27.56%, rgba(63, 43, 150, 0.63) 54.34%)",
            }}
          ></div> */}

          <CarouselContent>
            <CarouselItem className="basis-1/3">
              <TestimonialsCard
                name="John Doe"
                position="CEO at Company"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image="/images/dude.png"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonialsCard
                name="John Doe"
                position="CEO at Company"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image="/images/dude.png"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonialsCard
                name="John Doe"
                position="CEO at Company"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image="/images/dude.png"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonialsCard
                name="John Doe"
                position="CEO at Company"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image="/images/dude.png"
              />
            </CarouselItem>
            <CarouselItem className="basis-1/3">
              <TestimonialsCard
                name="John Doe"
                position="CEO at Company"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image="/images/dude.png"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default Testimonials;

interface TestimonialsCardProps {
  name: string;
  position: string;
  text: string;
  image: string;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  name,
  position,
  text,
  image,
}) => {
  return (
    <div
      className="flex flex-col items-start  h-[280px]
      rounded-[20px] border-2 border-slate-400/10 bg-card-landing p-8  
     "
    >
      <div className="flex flex-col w-[350px] justify-between h-full">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="w-[55px] h-[55px]">
            <AvatarImage src={image} alt="ItzRoxer" />
            <AvatarFallback>ItzRoxer</AvatarFallback>
          </Avatar>
          <div className="">
            <p className="text-[25px] font-semibold">{name}</p>
            <p className="text-sm text-neutral-400">{position}</p>
          </div>
        </div>

        <p className="text-[17px] text-neutral-300">&quot;{text}&quot;</p>
      </div>
    </div>
  );
};
<div className=""></div>;
