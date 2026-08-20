"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Petal = {
  id: number;
  left: string;
  top: string;
  width: number;
  height: number;
  rotate: number;
  duration: number;
  color: string;
  glow: string;
  kind: "circle" | "petal";
};

const palette = [
  { color: "rgba(244, 114, 182, 0.7)", glow: "rgba(244, 114, 182, 0.45)" },
  { color: "rgba(34, 211, 238, 0.7)", glow: "rgba(34, 211, 238, 0.45)" },
  { color: "rgba(250, 204, 21, 0.7)", glow: "rgba(250, 204, 21, 0.4)" },
  { color: "rgba(167, 139, 250, 0.75)", glow: "rgba(167, 139, 250, 0.45)" },
] as const;

function createPetal(id: number): Petal {
  const swatch = palette[Math.floor(Math.random() * palette.length)];
  const kind = Math.random() > 0.45 ? "petal" : "circle";
  const width = kind === "circle" ? 8 + Math.random() * 14 : 10 + Math.random() * 18;

  return {
    id,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width,
    height: kind === "circle" ? width : width * (1.35 + Math.random() * 0.5),
    rotate: Math.random() * 360,
    duration: 1.1 + Math.random() * 0.9,
    color: swatch.color,
    glow: swatch.glow,
    kind,
  };
}

export function BlinkingPetals() {
  const reduceMotion = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let timeoutId = 0;
    let cancelled = false;

    const spawn = () => {
      if (cancelled || document.visibilityState === "hidden") {
        timeoutId = window.setTimeout(spawn, 250);
        return;
      }

      const burst = 3 + Math.floor(Math.random() * 3);
      const incoming = Array.from({ length: burst }, () => {
        const petal = createPetal(nextId.current);
        nextId.current += 1;
        return petal;
      });

      setPetals((current) => [...current, ...incoming].slice(-120));
      timeoutId = window.setTimeout(spawn, 120 + Math.random() * 880);
    };

    timeoutId = window.setTimeout(spawn, 40);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.span
            key={petal.id}
            initial={{ opacity: 0, scale: 0.35 }}
            animate={{ opacity: [0, 0.55, 0], scale: [0.35, 1.12, 0.4] }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: petal.duration, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setPetals((current) => current.filter((item) => item.id !== petal.id));
            }}
            className={
              petal.kind === "circle"
                ? "absolute rounded-full blur-[1px]"
                : "absolute blur-[0.5px]"
            }
            style={{
              left: petal.left,
              top: petal.top,
              width: petal.width,
              height: petal.height,
              rotate: `${petal.rotate}deg`,
              background: petal.color,
              borderRadius: petal.kind === "circle" ? "9999px" : "50% 0 50% 50%",
              boxShadow: `0 0 16px ${petal.glow}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
