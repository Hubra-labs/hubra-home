"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronRight, Fingerprint, Coins, Bot } from "lucide-react";

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Seamless Onboarding",
    description:
      "Sign in with Google, Apple, or email. No wallet downloads, no extensions, no seed phrases. You're on-chain before you realize it.",
    stat: "30 seconds",
    statLabel: "to your first earn",
    accentColor: "#DAA520",
    borderGradient: "linear-gradient(135deg, rgba(218,165,32,0.4) 0%, rgba(218,165,32,0.05) 50%, rgba(218,165,32,0.2) 100%)",
    gradient: "from-primary-500/20 via-primary-500/5 to-transparent",
  },
  {
    icon: Coins,
    title: "One-Tap Yields",
    description: "Access 5\u201310%+ APY on stablecoins and SOL through managed vaults. Auto-compounding, no gas fees, full self-custody.",
    stat: "8%+",
    statLabel: "avg. stablecoin yield",
    accentColor: "#2ED387",
    borderGradient: "linear-gradient(135deg, rgba(46,211,135,0.4) 0%, rgba(46,211,135,0.05) 50%, rgba(46,211,135,0.2) 100%)",
    gradient: "from-success-400/20 via-success-400/5 to-transparent",
  },
  {
    icon: Bot,
    title: "Horus \u2014 Your DeFi Agent",
    description:
      "Your personal financial agent. It monitors yields, suggests optimizations, and moves your funds to better opportunities \u2014 with your permission.",
    stat: "24/7",
    statLabel: "autonomous optimization",
    accentColor: "#FEAA01",
    borderGradient: "linear-gradient(135deg, rgba(254,170,1,0.4) 0%, rgba(254,170,1,0.05) 50%, rgba(254,170,1,0.2) 100%)",
    gradient: "from-primary-400/20 via-primary-400/5 to-transparent",
  },
] as const;

function FeatureCard({
  feature,
  index,
  inView,
  reduceMotion,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
  inView: boolean;
  reduceMotion: boolean | null;
}) {
  const Icon = feature.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || reduceMotion) return;
      const rect = cardRef.current.getBoundingClientRect();

      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [reduceMotion]
  );

  return (
    <motion.div
      ref={cardRef}
      animate={inView ? { opacity: 1, y: 0 } : reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      className="relative rounded-2xl cursor-pointer group"
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      whileHover={reduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouse}>
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl p-px pointer-events-none"
        style={{
          background: feature.borderGradient,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor" as any,
          maskComposite: "exclude",
          opacity: isHovered ? 1 : 0.5,
          transition: "opacity 300ms",
        }}
      />

      {/* Spotlight hover */}
      {isHovered && !reduceMotion && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-[1] opacity-60"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${feature.accentColor}10, transparent 60%)`,
          }}
        />
      )}

      {/* Card body */}
      <div className="relative z-[2] rounded-2xl bg-[#111116] p-7 md:p-8 h-full flex flex-col">
        {/* Top gradient glow */}
        <div
          className={`absolute top-0 left-0 right-0 h-32 rounded-t-2xl bg-gradient-to-b ${feature.gradient} pointer-events-none opacity-50`}
        />

        <div className="relative flex flex-col flex-1">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{
              background: `${feature.accentColor}12`,
              border: `1px solid ${feature.accentColor}25`,
            }}>
            <Icon className="w-5 h-5" style={{ color: feature.accentColor }} />
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-semibold text-[#F5F5F7] mb-2">{feature.title}</h3>
          <p className="text-sm text-[#8E8E93] leading-relaxed mb-6 flex-1">{feature.description}</p>

          {/* Stat */}
          <div className="pt-5 border-t border-white/[0.06]">
            <div className="text-2xl font-bold" style={{ color: feature.accentColor }}>
              {feature.stat}
            </div>
            <div className="text-xs text-[#8E8E93] mt-0.5">{feature.statLabel}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative w-full max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24" id="features">
      {/* Section header */}
      <div className="text-center mb-12 md:mb-16">
        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}>
          <span className="text-sm text-white/70">Three Layers</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-400 text-xs font-medium">
            Overview
            <ChevronRight className="w-3 h-3" />
          </span>
        </motion.div>

        <motion.h2
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <span className="text-white">Built So You Don&apos;t Have</span>
          <br />
          <span className="text-gradient-brand">To Be an Expert</span>
        </motion.h2>

        <motion.p
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-base text-white/40 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Three layers working together — so your assets grow while you focus on life.
        </motion.p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} inView={inView} index={i} reduceMotion={reduceMotion} />
        ))}
      </div>
    </section>
  );
};
