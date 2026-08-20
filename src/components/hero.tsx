"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { IconArrowDown } from "./icons";
import { ProfilePortrait } from "./profile-portrait";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const hidden = reduceMotion ? false : { opacity: 0, y: 18 };
  const shown = { opacity: 1, y: 0 };
  const transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center pt-16"
      aria-label="Introduction"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-[minmax(0,1.05fr)_minmax(240px,0.9fr)] md:gap-12 lg:gap-16">
        <div className="order-2 md:order-1">
          <motion.p
            initial={hidden}
            animate={shown}
            transition={transition}
            className="mb-5 font-mono text-xs tracking-[0.22em] text-zinc-500 uppercase"
          >
            {site.role}
          </motion.p>

          <motion.h1
            initial={hidden}
            animate={shown}
            transition={{ ...transition, delay: 0.08 }}
            className="hero-gradient-text max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={hidden}
            animate={shown}
            transition={{ ...transition, delay: 0.16 }}
            className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-300"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={hidden}
            animate={shown}
            transition={{ ...transition, delay: 0.24 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={site.resumePath}
              download
              className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              Download Resume
            </a>
            <a
              href="#projects"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-400 px-5 text-sm text-zinc-800 transition-colors hover:border-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/18 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:bg-white/5 dark:hover:text-zinc-100"
            >
              View projects
              <IconArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={hidden}
          animate={shown}
          transition={{ ...transition, delay: 0.12 }}
          className="order-1 md:order-2"
        >
          <ProfilePortrait />
        </motion.div>
      </div>
    </section>
  );
}
