"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useId, useRef, type MouseEvent } from "react";
import { IconExternal } from "./icons";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: readonly string[];
  github: string;
};

const tiltSpring = { stiffness: 160, damping: 18, mass: 0.4 };
const followSpring = { stiffness: 90, damping: 18, mass: 0.35 };

export function ProjectCard({
  title,
  description,
  tags,
  github,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const reactId = useId().replace(/:/g, "");

  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const scale = useSpring(1, tiltSpring);
  const glow = useSpring(0, { stiffness: 180, damping: 22 });
  const glareX = useSpring(50, followSpring);
  const glareY = useSpring(50, followSpring);
  const currentOffset = useSpring(0, followSpring);

  const glareBackground = useMotionTemplate`radial-gradient(28rem circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18), transparent 42%)`;
  const electricAngle = useTransform(
    [glareX, glareY],
    ([x, y]) => {
      const angle = Math.atan2(Number(y) - 50, Number(x) - 50) * (180 / Math.PI);
      return angle + 90;
    },
  );
  const electricFill = useMotionTemplate`conic-gradient(from ${electricAngle}deg, #f472b6, #60a5fa, #facc15, #f472b6)`;

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion || !cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    rotateX.set((0.5 - py) * 16);
    rotateY.set((px - 0.5) * 18);
    scale.set(1.025);
    glow.set(1);
    glareX.set(px * 100);
    glareY.set(py * 100);
    currentOffset.set(((px + py) / 2) * -1000);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glow.set(0);
    glareX.set(50);
    glareY.set(50);
    currentOffset.set(0);
  };

  return (
    <div className="h-full [perspective:1100px]">
      <motion.article
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full will-change-transform"
      >
        <motion.div
          aria-hidden="true"
          style={{ opacity: glow, background: electricFill }}
          className="electric-frame pointer-events-none absolute -inset-[1px] rounded-2xl"
        />
        <motion.div
          aria-hidden="true"
          style={{ opacity: glow, background: electricFill }}
          className="electric-frame electric-frame-blur pointer-events-none absolute -inset-2 rounded-2xl"
        />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-[2px] z-20 h-[calc(100%-4px)] w-[calc(100%-4px)] overflow-visible"
        >
          <defs>
            <linearGradient
              id={`${reactId}-current`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="45%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <filter
              id={`${reactId}-glow`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="15"
            fill="none"
            stroke={`url(#${reactId}-current)`}
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray="70 280"
            className="electric-current"
            style={{
              opacity: glow,
              filter: `url(#${reactId}-glow)`,
            }}
          />
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="15"
            fill="none"
            stroke={`url(#${reactId}-current)`}
            strokeWidth="2.2"
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray="120 880"
            style={{
              opacity: glow,
              strokeDashoffset: currentOffset,
              filter: `url(#${reactId}-glow)`,
            }}
          />
        </svg>

        <div
          className="relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 p-6 dark:border-white/10 dark:bg-[#0b0c12]/95"
          style={{ transform: "translateZ(18px)" }}
        >
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground, opacity: glow }}
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          />

          <div className="relative flex items-start justify-between gap-4">
            <h3 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              {title}
            </h3>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              GitHub
              <IconExternal className="h-3.5 w-3.5" />
            </a>
          </div>

          <p className="relative mt-3 flex-1 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>

          <ul className="relative mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-zinc-200 px-2.5 py-1 font-mono text-xs text-zinc-500 dark:border-white/8 dark:text-zinc-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}
