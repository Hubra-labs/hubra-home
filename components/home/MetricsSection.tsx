"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Metric = {
  value: number;
  display: (n: number) => string;
  label: string;
  sub?: string;
};

const METRICS: Metric[] = [
  {
    value: 6,
    display: (n) => `${n}`,
    label: "Years operating",
    sub: "Shipping since 2020",
  },
  {
    value: 1,
    display: (n) => `${n}M+`,
    label: "Users onboarded",
    sub: "Across 140 countries",
  },
  {
    value: 7,
    display: (n) => `$${n}M`,
    label: "Total value locked",
    sub: "Growing every week",
  },
];

const CountUp = ({ target, display }: { target: number; display: (n: number) => string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);

      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const rounded = target < 10 ? Number(value.toFixed(1)) : Math.round(value);

  return <span ref={ref}>{display(rounded)}</span>;
};

export const MetricsSection = (): JSX.Element => {
  return (
    <section className="w-full px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The numbers</div>
          <h2 className="font-sans text-white text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1]">Proven at scale.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-3xl overflow-hidden border border-white/[0.06]">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="relative bg-[#0d0e21] p-8 md:p-10 min-h-[220px] flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}>
              <div className="text-white font-semibold tracking-[-0.03em] leading-none text-6xl md:text-7xl lg:text-8xl">
                <CountUp display={m.display} target={m.value} />
              </div>
              <div>
                <div className="text-white/80 text-base md:text-lg font-medium">{m.label}</div>
                {m.sub && <div className="text-white/40 text-sm mt-1">{m.sub}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
