"use client";

import type { SVGProps } from "react";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { EarnPreview, ManagePreview, StakePreview, SwapPreview, TrackPreview } from "@/components/home/FeaturePreviews";

type Partner = {
  name: string;
  icon: string;
  width: number;
  height: number;
  wordmark: boolean;
  heightClass: string;
};

const ASSET_VERSION = "2";

const TRUST: Partner[] = [
  {
    name: "Kamino",
    icon: `/image/partners/kamino.svg?v=${ASSET_VERSION}`,
    width: 124,
    height: 28,
    wordmark: true,
    heightClass: "h-4 md:h-[18px]",
  },
  {
    name: "Jupiter",
    icon: `/image/partners/jupiter.svg?v=${ASSET_VERSION}`,
    width: 91,
    height: 28,
    wordmark: true,
    heightClass: "h-5 md:h-6",
  },
  {
    name: "Sanctum",
    icon: `/image/partners/sanctum.svg?v=${ASSET_VERSION}`,
    width: 101,
    height: 28,
    wordmark: true,
    heightClass: "h-5 md:h-6",
  },
  {
    name: "Privy",
    icon: `/image/partners/privy.svg?v=${ASSET_VERSION}`,
    width: 101,
    height: 28,
    wordmark: false,
    heightClass: "h-4 md:h-[18px]",
  },
];

const strokeIconBase: SVGProps<SVGSVGElement> = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.6,
  viewBox: "0 0 24 24",
};

const ManageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...strokeIconBase} {...props}>
    <rect height="7.5" rx="1.6" width="7.5" x="3" y="3" />
    <rect height="7.5" rx="1.6" width="7.5" x="13.5" y="3" />
    <rect height="7.5" rx="1.6" width="7.5" x="3" y="13.5" />
    <rect height="7.5" rx="1.6" width="7.5" x="13.5" y="13.5" />
  </svg>
);

const StakeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...strokeIconBase} {...props}>
    <path d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3z" />
    <path d="M3.5 12L12 16.5 20.5 12" />
    <path d="M3.5 16.5L12 21l8.5-4.5" />
  </svg>
);

const SwapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...strokeIconBase} {...props}>
    <path d="M7 5v14" />
    <path d="M3.5 8.5L7 5l3.5 3.5" />
    <path d="M17 19V5" />
    <path d="M13.5 15.5L17 19l3.5-3.5" />
  </svg>
);

const EarnIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...strokeIconBase} {...props}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>
);

const TrackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...strokeIconBase} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

type FeatureKey = "manage" | "stake" | "swap" | "earn" | "track";

type Feature = {
  key: FeatureKey;
  label: string;
  tagline: string;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  Preview: () => JSX.Element;
};

const FEATURES: Feature[] = [
  { key: "manage", label: "Manage", tagline: "Every wallet, one dashboard.", Icon: ManageIcon, Preview: ManagePreview },
  { key: "stake", label: "Stake", tagline: "Put SOL to work, instantly.", Icon: StakeIcon, Preview: StakePreview },
  { key: "swap", label: "Swap", tagline: "Best routes across Solana.", Icon: SwapIcon, Preview: SwapPreview },
  { key: "earn", label: "Earn", tagline: "Yield curated for you.", Icon: EarnIcon, Preview: EarnPreview },
  { key: "track", label: "Track", tagline: "Live portfolio, real P&L.", Icon: TrackIcon, Preview: TrackPreview },
];

export const HeroHorus = (): JSX.Element => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>("manage");

  const active = FEATURES.find((feature) => feature.key === activeFeature) ?? FEATURES[0];

  useEffect(() => {
    const id = window.setTimeout(() => {
      const currentIndex = FEATURES.findIndex((feature) => feature.key === activeFeature);
      const next = FEATURES[(currentIndex + 1) % FEATURES.length];

      setActiveFeature(next.key);
    }, 6000);

    return () => window.clearTimeout(id);
  }, [activeFeature]);

  return (
    <section className="relative w-full min-h-[92svh] md:min-h-[92vh] flex flex-col items-center justify-center px-5 sm:px-6 py-16 md:py-0 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          background: "radial-gradient(60% 50% at 50% 40%, rgba(218,165,32,0.18) 0%, rgba(13,14,33,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto">
        <h1 className="font-sans text-white font-semibold tracking-[-0.03em] md:tracking-[-0.035em] leading-[1.05] md:leading-[1.02] text-[38px] sm:text-[56px] md:text-[60px] lg:text-[80px]">
          <span>
            AI-powered{" "}
            <span className="bg-gradient-to-r from-[#F5D478] via-primary to-[#B8860B] bg-clip-text text-transparent">
              crypto aggregator
            </span>
          </span>
          <br />
          <span>for everyone.</span>
        </h1>

        <p className="mt-6 md:mt-8 max-w-xl text-[15px] md:text-lg text-white/55 leading-relaxed px-2 md:px-0 hidden md:block">
          Hubra has everything you need to navigate your crypto journey and earn - no PhD required.
        </p>

        <div className="mt-8 md:mt-10 flex flex-col items-center gap-3 w-full sm:w-auto hidden md:flex">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
            <a
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary text-black px-6 py-3.5 md:py-3 text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(218,165,32,0.6)] hover:brightness-110 hover:shadow-[0_12px_36px_-10px_rgba(218,165,32,0.8)] transition-all"
              href="https://hubra.app">
              Launch app
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] text-white/80 px-6 py-3.5 md:py-3 text-sm font-medium hover:bg-white/[0.1] hover:text-white transition-colors"
              href="https://docs.hubra.app"
              rel="noopener noreferrer"
              target="_blank">
              Learn more
            </a>
          </div>
          <p className="text-xs text-white/35 tracking-wide">Self-custody - your keys, always.</p>
        </div>
      </div>

      <div className="relative z-10 mt-14 md:mt-28 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch gap-6 md:gap-10">
          <div className="md:col-span-3 flex justify-center md:items-center md:justify-center">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/40">
                <span className="h-px w-6 bg-white/20" />
                Your wallet, unified
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.05] text-white">
                One app.
                <br />
                Single tap.
              </h2>
            </div>
          </div>
          {/** product preview */}
          <div className="md:col-span-6">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] backdrop-blur-sm min-h-[280px] md:min-h-[300px] p-4 md:p-7 flex items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  background: "radial-gradient(80% 60% at 50% 0%, rgba(218,165,32,0.12) 0%, rgba(13,14,33,0) 70%)",
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative w-full flex flex-col items-center text-center gap-5"
                  exit={{ opacity: 0, y: -8 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <active.Preview />
                  <p className="text-sm text-white/60 max-w-xs">{active.tagline}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="md:col-span-3 flex md:items-center">
            <ul className="w-full grid grid-cols-5 md:flex md:flex-col">
              {FEATURES.map((feature) => {
                const isActive = feature.key === active.key;

                return (
                  <li key={feature.key} className="flex md:flex-none">
                    <button
                      aria-pressed={isActive}
                      className={`group w-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-1.5 md:gap-3 px-1 md:px-4 py-2.5 rounded-xl transition-colors min-h-[52px] md:min-h-0 ${
                        isActive ? "text-white bg-white/[0.05] md:bg-transparent" : "text-white/35 hover:text-white/75"
                      }`}
                      type="button"
                      onClick={() => setActiveFeature(feature.key)}
                      onFocus={() => setActiveFeature(feature.key)}
                      onMouseEnter={() => setActiveFeature(feature.key)}>
                      <span className="relative inline-flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3">
                        <span
                          aria-hidden
                          className={`hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full transition-all ${
                            isActive ? "bg-primary opacity-100" : "bg-white/30 opacity-0 group-hover:opacity-40"
                          }`}
                        />
                        <feature.Icon
                          className={`h-[18px] w-[18px] md:h-5 md:w-5 shrink-0 transition-colors ${isActive ? "text-primary" : "text-white/40 group-hover:text-white/60"}`}
                        />
                        <span className="text-[11px] md:text-xl font-semibold tracking-[-0.01em]">{feature.label}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 md:mt-28 w-full max-w-4xl">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40">Powering by the best of Solana</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {TRUST.map((partner) => (
            <div
              key={partner.name}
              className="flex h-6 md:h-7 items-center justify-center text-white/60 hover:text-white/90 transition-colors">
              <Image
                alt={partner.name}
                className={`block opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-200 w-auto ${partner.heightClass}`}
                height={partner.height}
                src={partner.icon}
                width={partner.width}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
