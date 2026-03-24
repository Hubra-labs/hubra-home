"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import NextLink from "next/link";

const BULLETS = ["AI-scored yield opportunities", "Dynamic vault allocation", "Cross-protocol optimization"];

export const ChessSection = () => {
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
        {/* Video / Visual placeholder (left) */}
        <motion.div {...animProps(0)}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#111116] border border-white/[0.06]">
            {/* Animated gradient placeholder for video */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-success-400/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                {/* Animated routing lines */}
                <div className="relative w-48 h-32">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        pathLength: [0, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      className="absolute left-0 right-0"
                      style={{
                        top: `${20 + i * 30}%`,
                        height: 2,
                        background: `linear-gradient(90deg, transparent, ${i === 1 ? "#DAA520" : "#2ED387"}, transparent)`,
                        borderRadius: 1,
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  {/* Nodes */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-500 shadow-lg shadow-primary-500/30" />
                  <div className="absolute right-0 top-1/4 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-success-400 shadow-lg shadow-success-400/30" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-400 shadow-lg shadow-primary-400/30" />
                  <div className="absolute right-0 top-3/4 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-success-400 shadow-lg shadow-success-400/30" />
                </div>
                <span className="text-xs text-white/30 font-medium tracking-wider uppercase">Smart Routing</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content (right) */}
        <div className="flex flex-col gap-6">
          <motion.div {...animProps(0.1)}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="text-sm text-white/70">Smart Routing</span>
              <span className="px-2 py-0.5 rounded-full bg-success-400/15 text-success-400 text-xs font-medium">New</span>
            </div>
          </motion.div>

          <motion.h2 {...animProps(0.15)} className="text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-tight leading-[1.1]">
            <span className="text-white">Your Assets Find</span>
            <br />
            <span className="text-gradient-brand">Its Best Path</span>
          </motion.h2>

          <motion.p {...animProps(0.2)} className="text-base text-white/40 leading-relaxed max-w-md">
            Intelligent yield scoring meets adaptive routing. Your funds are automatically matched to the vaults, protocols, and strategies
            most likely to maximize returns — in real time.
          </motion.p>

          <motion.ul {...animProps(0.25)} className="flex flex-col gap-3">
            {BULLETS.map((text) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-success-400/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-success-400" />
                </div>
                <span className="text-sm text-white/60">{text}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div {...animProps(0.3)} className="flex flex-col sm:flex-row items-start gap-3 pt-2">
            <NextLink
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
              href="/link">
              See It in Action
            </NextLink>
            <NextLink
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.08] transition-colors"
              href="https://docs.hubra.app">
              Read the Docs
            </NextLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
