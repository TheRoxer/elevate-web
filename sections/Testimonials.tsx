import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  return (
    <div className="max-w-[1200px] w-full flex flex-col mt-8 items-center justify-center">
      <Carousel>
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
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
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
      className="flex flex-col items-start w-[500px] h-[280px]
      rounded-[20px] border-2 border-slate-400/10 bg-card p-8  dark:bg-neutral-900
     "
    >
      <div className="flex flex-col w-[280px] justify-between h-full">
        <div className="gap-8">
          <div className="flex flex-row gap-4">
            <Avatar>
              <AvatarImage src={image} alt="ItzRoxer" />
              <AvatarFallback>ItzRoxer</AvatarFallback>
            </Avatar>
            <p className="text-[25px] font-semibold">{name}</p>
          </div>

          <p className="text-sm text-neutral-400">{position}</p>
        </div>

        <p className="text-[17px] text-neutral-300">&quot;{text}&quot;</p>
      </div>
    </div>
  );
};
<div className=""></div>;
