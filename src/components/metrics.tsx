"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

type Metric = (typeof site.metrics)[number];

function MetricValue({ value, suffix }: Pick<Metric, "value" | "suffix">) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!inView || started.current) {
      return;
    }

    started.current = true;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [inView, motionValue, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-zinc-200 pt-10 sm:grid-cols-3 dark:border-white/10">
      {site.metrics.map((metric) => (
        <div key={metric.label} className="space-y-2">
          <dt className="font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase">
            {metric.label}
          </dt>
          <dd className="font-mono text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            <MetricValue value={metric.value} suffix={metric.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
