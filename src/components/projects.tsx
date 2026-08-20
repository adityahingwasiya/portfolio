import { AnalyticalGrid } from "./analytical-grid";
import { site } from "@/data/site";
import { FadeIn } from "./fade-in";
import { ProjectCard } from "./project-card";
import { RevealSection } from "./reveal-section";
import { SectionHeading } from "./section-heading";

const groups = Array.from(new Set(site.projects.map((project) => project.group)));

export function Projects() {
  return (
    <RevealSection
      id="projects"
      className="relative scroll-mt-24 py-24 md:py-32"
      aria-label="Projects"
    >
      <AnalyticalGrid />

      <div className="relative mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionHeading
            index="04"
            title="Selected work"
            description="Full-stack Flutter/Spring Boot products with a clear API boundary between client and server."
          />
        </FadeIn>

        <div className="space-y-12">
          {groups.map((group) => {
            const items = site.projects.filter((project) => project.group === group);

            return (
              <div key={group}>
                <p className="mb-5 font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase">
                  {group}
                </p>
                <ul className="grid gap-6 overflow-visible sm:grid-cols-2">
                  {items.map((project, index) => (
                    <li key={project.title} className="relative z-0 hover:z-10">
                      <FadeIn delay={index * 0.06}>
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          tags={project.tags}
                          github={project.github}
                        />
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
