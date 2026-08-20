"use client";

import { site } from "@/data/site";
import { FadeIn } from "./fade-in";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <RevealSection
      id="experience"
      className="scroll-mt-24 py-24 md:py-32"
      aria-label="Experience and education"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionHeading
            index="02"
            title="Experience"
            description="Internship work across mobile, web, and backend — with a measurable impact on load time."
          />
        </FadeIn>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <ol className="relative space-y-10 border-l border-cyan-400/25 pl-7">
            {site.experience.map((item) => (
              <li key={`${item.company}-${item.role}`} className="relative">
                <span className="absolute top-1.5 -left-[35px] h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.8)]" />
                <FadeIn>
                  <p className="font-mono text-xs tracking-[0.16em] text-zinc-500 uppercase">
                    {item.dates}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-300">
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-4 transition-colors hover:text-cyan-600 hover:underline dark:hover:text-cyan-200"
                    >
                      {item.company}
                    </a>
                    <span className="text-zinc-500"> · {item.location}</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm leading-7 text-zinc-600 dark:text-zinc-300"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </li>
            ))}
          </ol>

          <FadeIn delay={0.1}>
            <article className="rounded-2xl border border-zinc-200 bg-white/80 p-6 dark:border-white/10 dark:bg-[#0b0c12]/90">
              <p className="font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase">
                Education
              </p>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                {site.education.degree}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {site.education.school}
              </p>
              <dl className="mt-5 space-y-2 font-mono text-xs text-zinc-500">
                <div className="flex justify-between gap-4">
                  <dt>Duration</dt>
                  <dd className="text-zinc-700 dark:text-zinc-300">
                    {site.education.dates}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>CPI</dt>
                  <dd className="text-cyan-700 dark:text-cyan-300">
                    {site.education.detail}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Campus</dt>
                  <dd className="text-zinc-700 dark:text-zinc-300">
                    {site.education.location}
                  </dd>
                </div>
              </dl>
            </article>
          </FadeIn>
        </div>
      </div>
    </RevealSection>
  );
}
