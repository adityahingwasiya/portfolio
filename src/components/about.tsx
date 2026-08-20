import { site } from "@/data/site";
import { FadeIn } from "./fade-in";
import { Metrics } from "./metrics";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <RevealSection
      id="about"
      className="scroll-mt-24 py-24 md:py-32"
      aria-label="About"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionHeading index="01" title={site.about.heading} />
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <FadeIn delay={0.05}>
            <p className="text-sm leading-7 text-zinc-500">
              IIIT Vadodara · B.Tech CSE · CPI 8.29
            </p>
          </FadeIn>

          <div className="space-y-5">
            {site.about.paragraphs.map((paragraph, index) => (
              <FadeIn key={paragraph} delay={0.08 + index * 0.06}>
                <p className="text-base leading-8 text-zinc-700 dark:text-zinc-200">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        <Metrics />
      </div>
    </RevealSection>
  );
}
