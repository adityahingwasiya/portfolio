"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const blobSize = 420;

export function MouseFollower() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-blobSize);
  const mouseY = useMotionValue(-blobSize);
  const x = useSpring(mouseX, { stiffness: 45, damping: 22, mass: 0.7 });
  const y = useSpring(mouseY, { stiffness: 45, damping: 22, mass: 0.7 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer && !reduceMotion);

    if (!finePointer || reduceMotion) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX - blobSize / 2);
      mouseY.set(event.clientY - blobSize / 2);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduceMotion]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 h-[420px] w-[420px] rounded-full blur-3xl"
      style={{ x, y }}
    >
      <div className="mouse-blob h-full w-full rounded-full" />
    </motion.div>
  );
}
