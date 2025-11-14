import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Execution from "@/components/sections/Execution";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-start items-center mt-8 w-full overflow-auto">
        <div className="flex flex-col justify-start items-center max-w-1200px pb-8 mt-8">
          <Navbar />
          <Hero />
          <Services />
          <Execution />
          <Testimonials />
          <Footer />
        </div>
      </main>
    </>
  );
}
