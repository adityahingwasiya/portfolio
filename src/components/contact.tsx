import { site } from "@/data/site";
import { FadeIn } from "./fade-in";
import {
  IconCodechef,
  IconGfg,
  IconGithub,
  IconLeetcode,
  IconLinkedin,
} from "./icons";
import { SectionHeading } from "./section-heading";

const socials = [
  { label: "GitHub", href: site.social.github, icon: IconGithub },
  { label: "LinkedIn", href: site.social.linkedin, icon: IconLinkedin },
  { label: "LeetCode", href: site.social.leetcode, icon: IconLeetcode },
  { label: "CodeChef", href: site.social.codechef, icon: IconCodechef },
  { label: "GeeksforGeeks", href: site.social.gfg, icon: IconGfg },
] as const;

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative z-10 scroll-mt-24 border-t border-zinc-200 py-24 md:py-32 dark:border-white/8"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <SectionHeading
            index="06"
            title="Let’s connect"
            description="I’m open to internships, collaborations, and conversations about building software."
          />
        </FadeIn>

        <FadeIn delay={0.08}>
          <a
            href={`mailto:${site.email}`}
            className="inline-block text-2xl font-medium tracking-tight text-zinc-900 transition-colors hover:text-zinc-700 sm:text-3xl dark:text-zinc-100 dark:hover:text-white"
          >
            {site.email}
          </a>
        </FadeIn>

        <FadeIn delay={0.12}>
          <ul className="mt-10 flex flex-wrap gap-3">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-white/10 dark:bg-transparent dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-zinc-100"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <p className="mt-16 text-sm text-zinc-500 dark:text-zinc-600">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
