import About from "@/components/About";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <About />
      <Projects />
      <TechStack/>
      {/* <Projects /> */}
      {/* <Contact /> */}
    </main>
  );
}