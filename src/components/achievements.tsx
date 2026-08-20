"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { FadeIn } from "./fade-in";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

const palettes = {
  leetcode: {
    card: "border-[#FFA116]/35 bg-[linear-gradient(160deg,#141414_0%,#1c140a_55%,#0b0b0b_100%)]",
    eyebrow: "text-[#FFA116]",
    title: "text-white",
    body: "text-zinc-300",
    chip: "border-[#FFA116]/30 bg-[#FFA116]/10 text-[#FFA116]",
  },
  codechef: {
    card: "border-[#c4a574]/35 bg-[linear-gradient(160deg,#2a1d14_0%,#3d2918_48%,#1a120c_100%)]",
    eyebrow: "text-[#e8d5b5]",
    title: "text-[#f6efe4]",
    body: "text-[#d7c4a8]",
    chip: "border-[#c4a574]/40 bg-white/8 text-[#f6efe4]",
  },
} as const;

export function Achievements() {
  return (
    <RevealSection
      id="achievements"
      className="scroll-mt-24 py-24 md:py-32"
      aria-label="Competitive programming achievements"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionHeading
            index="03"
            title="Achievements"
            description="Contest performance, distilled into the badges that matter on a resume."
          />
        </FadeIn>

        <ul className="grid gap-5 md:grid-cols-2">
          {site.achievements.map((item, index) => {
            const palette = palettes[item.palette];

            return (
              <li key={item.platform}>
                <FadeIn delay={index * 0.08}>
                  <motion.a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className={`block rounded-2xl border p-6 shadow-[0_20px_60px_rgb(0_0_0_/_0.25)] ${palette.card}`}
                  >
                    <p
                      className={`font-mono text-xs tracking-[0.2em] uppercase ${palette.eyebrow}`}
                    >
                      {item.platform}
                    </p>
                    <h3 className={`mt-3 text-3xl font-semibold tracking-tight ${palette.title}`}>
                      {item.title}
                    </h3>
                    <ul className="mt-5 space-y-2">
                      {item.stats.map((stat) => (
                        <li
                          key={stat}
                          className={`rounded-full border px-3 py-1.5 font-mono text-xs ${palette.chip}`}
                        >
                          {stat}
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-6 text-sm ${palette.body}`}>View profile →</p>
                  </motion.a>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </RevealSection>
  );
}
