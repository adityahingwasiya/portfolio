import { About } from "@/components/about";
import { Achievements } from "@/components/achievements";
import { AnimatedBackground } from "@/components/animated-background";
import { BlinkingPetals } from "@/components/blinking-petals";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { MouseFollower } from "@/components/mouse-follower";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-sm focus:text-zinc-50 dark:focus:bg-zinc-100 dark:focus:text-zinc-950"
      >
        Skip to content
      </a>
      <AnimatedBackground />
      <BlinkingPetals />
      <MouseFollower />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Achievements />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
