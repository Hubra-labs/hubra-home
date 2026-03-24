"use client";
import { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    title: "Eagle Eye",
    description: "Track and manage your entire portfolio from one dashboard",
    gradient: "from-[#F5A623]/20 via-[#F5A623]/5 to-transparent",
    accentColor: "#F5A623",
    borderGradient: "linear-gradient(135deg, rgba(245,166,35,0.4) 0%, rgba(245,166,35,0.05) 50%, rgba(245,166,35,0.2) 100%)",
  },
  {
    title: "Swap",
    description: "Best rates across every DEX. Always.",
    gradient: "from-[#30D158]/20 via-[#30D158]/5 to-transparent",
    accentColor: "#30D158",
    borderGradient: "linear-gradient(135deg, rgba(48,209,88,0.4) 0%, rgba(48,209,88,0.05) 50%, rgba(48,209,88,0.2) 100%)",
  },
  {
    title: "Earn",
    description: "Tap into yield opportunities with one click",
    gradient: "from-[#F5A623]/20 via-[#DAA520]/5 to-transparent",
    accentColor: "#F5A623",
    borderGradient: "linear-gradient(135deg, rgba(245,166,35,0.5) 0%, rgba(218,165,32,0.05) 50%, rgba(245,166,35,0.3) 100%)",
  },
  {
    title: "Cross-Platform",
    description: "One app. One account. All devices.",
    gradient: "from-[#0A84FF]/15 via-[#0A84FF]/5 to-transparent",
    accentColor: "#0A84FF",
    borderGradient: "linear-gradient(135deg, rgba(10,132,255,0.3) 0%, rgba(10,132,255,0.05) 50%, rgba(10,132,255,0.2) 100%)",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Card visuals                                                       */
/* ------------------------------------------------------------------ */

function EagleEyeVisual() {
  const tokens = [
    { name: "SOL", price: "$168.42", change: "+5.2%", color: "#F5A623" },
    { name: "JUP", price: "$1.84", change: "+12.7%", color: "#30D158" },
    { name: "USDC", price: "$1.00", change: "0.0%", color: "#8E8E93" },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {tokens.map((t) => (
        <div
          key={t.name}
          className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold"
              style={{ background: `${t.color}15`, color: t.color }}>
              {t.name[0]}
            </div>
            <span className="text-sm font-medium text-[#F5F5F7]">{t.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#8E8E93]">{t.price}</span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{
                color: t.change.startsWith("+") ? "#30D158" : "#8E8E93",
                background: t.change.startsWith("+") ? "rgba(48,209,88,0.1)" : "rgba(142,142,147,0.1)",
              }}>
              {t.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SwapVisual() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] flex justify-between items-center">
        <span className="text-xs text-[#8E8E93]">From</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#F5F5F7]">500</span>
          <span className="text-xs text-[#8E8E93] bg-white/[0.05] px-2 py-0.5 rounded-md">USDC</span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-[#30D158]/10 border border-[#30D158]/20 flex items-center justify-center">
        <svg fill="none" height="12" viewBox="0 0 12 12" width="12">
          <path d="M6 2v8M3 7l3 3 3-3" stroke="#30D158" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] flex justify-between items-center">
        <span className="text-xs text-[#8E8E93]">To</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#F5F5F7]">2.97</span>
          <span className="text-xs text-[#8E8E93] bg-white/[0.05] px-2 py-0.5 rounded-md">SOL</span>
        </div>
      </div>
      <span className="text-[11px] text-[#30D158]/60 mt-1">Best rate via Jupiter</span>
    </div>
  );
}

function EarnVisual() {
  const yields = [
    { name: "Kamino", apy: "8.4%", w: "84%" },
    { name: "Marinade", apy: "7.2%", w: "72%" },
    { name: "Lulo", apy: "6.8%", w: "68%" },
  ];

  return (
    <div className="flex flex-col gap-2.5">
      {yields.map((y) => (
        <div key={y.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
          <div className="flex justify-between mb-2">
            <span className="text-[13px] font-medium text-[#F5F5F7]">{y.name}</span>
            <span className="text-xs font-medium text-[#F5A623]">{y.apy} APY</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/[0.04] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: y.w,
                background: "linear-gradient(90deg, #F5A623 0%, #DAA520 100%)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CrossPlatformVisual() {
  return (
    <div className="flex justify-center items-end gap-7 pt-4">
      {[
        { label: "Desktop", w: 56, h: 38, r: 4 },
        { label: "Mobile", w: 24, h: 40, r: 6 },
        { label: "Web", w: 44, h: 32, r: 4 },
      ].map((d) => (
        <div key={d.label} className="flex flex-col items-center gap-2.5">
          <div
            className="relative"
            style={{
              width: d.w,
              height: d.h,
              borderRadius: d.r,
              border: "1.5px solid rgba(10,132,255,0.25)",
              background: "rgba(10,132,255,0.04)",
              boxShadow: "0 0 20px rgba(10,132,255,0.08)",
            }}>
            <div
              className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: d.label === "Mobile" ? 10 : 16,
                height: 2,
                background: "rgba(10,132,255,0.2)",
              }}
            />
          </div>
          <span className="text-[11px] text-[#8E8E93]">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "Eagle Eye": EagleEyeVisual,
  "Swap": SwapVisual,
  "Earn": EarnVisual,
  "Cross-Platform": CrossPlatformVisual,
};

/* ------------------------------------------------------------------ */
/*  Feature Card with gradient border + spotlight hover                */
/* ------------------------------------------------------------------ */

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
  const Visual = VISUALS[feature.title];
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
      animate={inView ? { opacity: 1, y: 0 } : reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      className="relative rounded-[20px] cursor-pointer group"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      whileHover={reduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouse}>
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-[20px] p-px pointer-events-none"
        style={{
          background: feature.borderGradient,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor" as any,
          maskComposite: "exclude",
          opacity: isHovered ? 1 : 0.5,
          transition: "opacity 300ms",
        }}
      />

      {/* Spotlight hover effect */}
      {isHovered && !reduceMotion && (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none z-[1] opacity-60"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${feature.accentColor}10, transparent 60%)`,
          }}
        />
      )}

      {/* Card body */}
      <div className="relative z-[2] rounded-[20px] bg-[#111116] p-7 md:p-8 h-full">
        {/* Subtle inner gradient glow at top */}
        <div
          className={`absolute top-0 left-0 right-0 h-32 rounded-t-[20px] bg-gradient-to-b ${feature.gradient} pointer-events-none opacity-50`}
        />

        <div className="relative">
          {/* Title */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: feature.accentColor }} />
              <h3 className="text-xl font-semibold text-[#F5F5F7]">{feature.title}</h3>
            </div>
            <p className="text-sm text-[#8E8E93] leading-relaxed">{feature.description}</p>
          </div>

          {/* Visual */}
          <div className="min-h-[180px]">
            <Visual />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export const BentoFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="w-full max-w-[960px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} inView={inView} index={i} reduceMotion={reduceMotion} />
        ))}
      </div>
    </div>
  );
};
