import Navbar from "@/components/landing/Navbar";
import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-start items-center h-[calc(100vh-2rem)] mt-8">
        <div className="flex flex-col justify-start items-center w-1200px h-[calc(100vh-2rem)] mt-8">
          <Navbar />
          <Hero />
        </div>
      </main>
    </>
  );
}
