"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import NextLink from "next/link";

export const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <motion.h2
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}>
          <span className="text-white">Ready to Give Your</span>
          <br />
          <span className="text-gradient-brand">Asset Superpowers?</span>
        </motion.h2>

        <motion.p
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-base text-white/40 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          Join 10,000+ people already earning smarter with Hubra. No crypto knowledge required.
        </motion.p>

        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col sm:flex-row items-center gap-3 pt-2"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <NextLink
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
            href="/link">
            Start Earning Free
          </NextLink>
          <NextLink
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.08] transition-colors"
            href="https://discord.gg/62NFPhpHtH">
            Talk to Us
          </NextLink>
        </motion.div>
      </div>
    </section>
  );
};
