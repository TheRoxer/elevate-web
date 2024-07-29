import Navbar from "@/components/landing/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Execution from "@/sections/Execution";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-start items-center mt-8">
        <div className="flex flex-col justify-start items-center w-1200px pb-8 mt-8">
          <Navbar />
          <Hero />
          <Services />
          <Execution />
          <Testimonials />
        </div>
      </main>
    </>
  );
}
