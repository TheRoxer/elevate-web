import Navbar from "@/components/landing/Navbar";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Execution from "@/sections/Execution";
import Testimonials from "@/sections/Testimonials";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-start items-center mt-8 w-full">
        <div className="flex flex-col justify-start items-center max-w-1200px pb-8 mt-8">
          <Navbar />
          {/* <Hero /> */}
          <Services />
          <Execution />
          {/* <Testimonials /> */}
          {/* <Footer /> */}
        </div>
      </main>
    </>
  );
}
