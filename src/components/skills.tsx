import { site } from "@/data/site";
import { FadeIn } from "./fade-in";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

const groups = Array.from(new Set(site.skills.map((skill) => skill.group)));

export function Skills() {
  return (
    <RevealSection
      id="skills"
      className="scroll-mt-24 py-24 md:py-32"
      aria-label="Skills"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionHeading
            index="05"
            title="Skills"
            description="The tools and fundamentals I use most often."
          />
        </FadeIn>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => {
            const items = site.skills.filter((skill) => skill.group === group);

            if (items.length === 0) {
              return null;
            }

            return (
              <FadeIn key={group} delay={index * 0.06}>
                <div>
                  <h3 className="mb-4 font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase">
                    {group}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <li
                        key={skill.name}
                        className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-sm text-zinc-800 dark:border-white/10 dark:bg-zinc-900/50 dark:text-zinc-200"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
