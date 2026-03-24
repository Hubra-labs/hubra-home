"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import NextLink from "next/link";

const STATS = [
  { value: "8.2%", label: "avg. stablecoin APY" },
  { value: "Zero", label: "gas fees for users" },
  { value: "100%", label: "self-custody" },
  { value: "$12M+", label: "total value earning" },
];

export const AutoEarnSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const animProps = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 } as const,
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay },
        };

  return (
    <section ref={ref} className="relative w-full max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Content (left) */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <motion.div {...animProps(0)}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="text-sm text-white/70">Auto-Earn</span>
              <span className="px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-400 text-xs font-medium">Beta</span>
            </div>
          </motion.div>

          <motion.h2 {...animProps(0.1)} className="text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-tight leading-[1.1]">
            <span className="text-white">No Idle Funds.</span>
            <br />
            <span className="text-gradient-brand">Ever.</span>
          </motion.h2>

          <motion.p {...animProps(0.15)} className="text-base text-white/40 leading-relaxed max-w-md">
            The moment you deposit, your assets go to work. Auto-Earn continuously routes your assets to the highest-yielding opportunities
            — no manual management, no missed returns.
          </motion.p>

          <motion.div {...animProps(0.2)} className="pt-2">
            <NextLink
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
              href="/link">
              Try Auto-Earn
            </NextLink>
          </motion.div>
        </div>

        {/* Stat cards (right) */}
        <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} {...animProps(0.1 + i * 0.1)} className="relative rounded-2xl overflow-hidden">
              {/* Border gradient */}
              <div
                className="absolute inset-0 rounded-2xl p-px pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(218,165,32,0.3) 0%, rgba(218,165,32,0.02) 50%, rgba(46,211,135,0.15) 100%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor" as any,
                  maskComposite: "exclude",
                }}
              />
              <div className="relative bg-[#111116] rounded-2xl p-6 flex flex-col gap-1.5">
                <div className="text-2xl md:text-3xl font-bold text-gradient-brand">{stat.value}</div>
                <div className="text-xs text-[#8E8E93]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
