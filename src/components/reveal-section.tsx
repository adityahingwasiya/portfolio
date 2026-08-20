"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

type RevealSectionProps = ComponentPropsWithoutRef<"section">;

export function RevealSection({
  children,
  className,
  ...props
}: RevealSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      {...props}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
