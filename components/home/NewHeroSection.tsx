"use client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import NextLink from "next/link";

import { Marquee } from "@/components/ui/marquee";

const PARTNERS = ["Jupiter", "Marinade", "Sanctum", "Jito", "Drift", "Kamino"];

export const NewHeroSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary-500/[0.06] blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-primary-400/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto px-4 md:px-6 text-center">
        {/* Announcement Badge */}
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }}>
          <NextLink
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] transition-colors"
            href="/blog/horus">
            <span className="text-sm text-white/80">Horus Agent is Live!</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-500/15 text-primary-400 text-xs font-medium">
              Explore
              <ChevronRight className="w-3 h-3" />
            </span>
          </NextLink>
        </motion.div>

        {/* Heading */}
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          <span className="text-gradient-brand">Financial Superpowers</span>
          <br />
          <span className="text-white">For Everyone</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl text-base md:text-lg text-white/50 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Your assets, optimized 24/7. Earn DeFi yields, swap instantly, and let Horus handle the complexity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <NextLink
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
            href="/link">
            Start Earning Now
          </NextLink>
          <NextLink
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.08] transition-colors backdrop-blur-sm"
            href="#features">
            See How It Works
          </NextLink>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div
          animate={{ opacity: 1 }}
          className="w-full mt-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}>
          <div className="flex-shrink-0 text-sm text-white/40 leading-snug text-center sm:text-left">
            Trusted by thousands
            <br />
            earning smarter
          </div>
          <div className="flex-1 overflow-hidden">
            <Marquee pauseOnHover className="[--duration:25s] [--gap:2rem]" repeat={3}>
              {PARTNERS.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-primary-400">
                    {name[0]}
                  </div>
                  <span className="text-sm text-white/60 font-medium whitespace-nowrap">{name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
