"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { site } from "@/data/site";

const tiltSpring = { stiffness: 140, damping: 18, mass: 0.45 };

export function ProfilePortrait() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, tiltSpring);
  const rotateY = useSpring(0, tiltSpring);
  const hover = useSpring(0, { stiffness: 160, damping: 22 });
  const auraScale = useTransform(hover, [0, 1], [1, 1.16]);
  const auraOpacity = useTransform(hover, [0, 1], [0.42, 0.95]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - py) * 8);
    rotateY.set((px - 0.5) * 10);
    hover.set(1);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    hover.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px]">
      <motion.div
        aria-hidden="true"
        style={{ scale: auraScale, opacity: auraOpacity }}
        className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_28%_18%,rgba(34,211,238,0.5),transparent_44%),radial-gradient(circle_at_82%_78%,rgba(167,139,250,0.42),transparent_48%)] blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ scale: auraScale, opacity: auraOpacity }}
        className="pointer-events-none absolute -inset-5 rounded-[2.4rem] bg-violet-500/20 blur-2xl dark:bg-violet-400/15"
      />

      <div className="relative [perspective:1100px]">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="will-change-transform"
        >
          <div className="portrait-border">
            <div className="overflow-hidden rounded-[1.65rem] bg-zinc-950">
              <Image
                src={site.photo}
                alt={`${site.name} professional portrait`}
                width={720}
                height={900}
                priority
                className="aspect-[4/5] w-full object-cover object-[center_12%]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
