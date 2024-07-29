import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const Testimonials = () => {
  return (
    <div className="max-w-[1200px] w-full flex flex-col mt-8 items-center justify-center">
      <Image
        src="/decorators/line-3.svg"
        alt="line"
        width={5 * 1.4}
        height={292 * 1.4}
        className="mt-12"
      ></Image>
      <h2 className="w-[400px] mt-6">
        What clients say <span className="text-gradient">about us</span>
      </h2>

      <Carousel className="max-w-[700px]">
        <CarouselContent>
          <CarouselItem>
            <TestimonialsCard
              name="John Doe"
              position="CEO at Company"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              image="/images/dude.png"
            />
          </CarouselItem>
          <CarouselItem>
            <TestimonialsCard
              name="John Doe"
              position="CEO at Company"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              image="/images/dude.png"
            />
          </CarouselItem>
          <CarouselItem>
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
      className="flex flex-col items-start w-[700px] h-[280px]
      rounded-[20px] border-2 border-slate-400/10 bg-card p-8  dark:bg-neutral-900
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
