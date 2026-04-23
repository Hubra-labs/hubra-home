"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import CountUp from "./CountUp";
import { TokenIcon, TokenKey, shell } from "./shared";

type Quote = {
  output: string;
  rate: string;
  impact: string;
  min: string;
  route: ReadonlyArray<TokenKey>;
};

// Simulated quotes. Output drifts, route varies — Jupiter explores direct
// and multi-hop paths as the market moves.
const QUOTE_POOL: ReadonlyArray<Quote> = [
  { output: "876.20", rate: "175.24", impact: "0.02%", min: "874.45", route: ["sol", "usdc"] },
  { output: "874.85", rate: "174.97", impact: "0.04%", min: "872.10", route: ["sol", "rasol", "usdc"] },
  { output: "877.90", rate: "175.58", impact: "0.02%", min: "876.15", route: ["sol", "usdc"] },
  { output: "875.60", rate: "175.12", impact: "0.03%", min: "873.20", route: ["sol", "rasol", "usdc"] },
  { output: "878.45", rate: "175.69", impact: "0.01%", min: "877.70", route: ["sol", "usdc"] },
];

const REFRESH_MS = 3000;
const EYEBROW = "text-[11px] uppercase tracking-[0.22em] text-white/55";
const MICRO = "text-[10px] uppercase tracking-[0.22em] text-white/45";

export const SwapPreview = (): JSX.Element => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % QUOTE_POOL.length);
    }, REFRESH_MS);

    return () => clearInterval(id);
  }, [reduce]);

  const quote = QUOTE_POOL[idx];
  const outputValue = parseFloat(quote.output);
  const initialOutput = parseFloat(QUOTE_POOL[0].output);

  return (
    <div className={`${shell} flex flex-col justify-between p-4 md:p-5`}>
      <div className="flex items-center justify-between">
        <span className={EYEBROW}>Swap quote</span>
        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
          Best route · <span className="ml-[0.15em] text-white/85">Jupiter</span>
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <span className={MICRO}>You pay</span>
          <div className="flex items-center gap-2.5">
            <TokenIcon size={24} token="sol" />
            <span className="text-[22px] font-medium leading-none tracking-tight tabular-nums text-white/85">5.00</span>
            <span className={`ml-auto ${MICRO}`}>SOL</span>
          </div>
        </div>

        <div aria-hidden className="flex items-center gap-2">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.08] bg-background">
            <svg className="h-2.5 w-2.5 text-white/60" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <div className="flex flex-col gap-1">
          <span className={MICRO}>You receive (est.)</span>
          <div className="flex items-center gap-2.5">
            <TokenIcon size={24} token="usdc" />
            <span className="text-[30px] md:text-[34px] font-semibold leading-none tracking-tight tabular-nums text-white">
              {reduce ? quote.output : <CountUp decimals={2} duration={1.1} from={initialOutput} separator="," to={outputValue} />}
            </span>
            <span className={`ml-auto ${MICRO}`}>USDC</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/55">
        <motion.div
          key={`route-${idx}`}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5"
          initial={reduce ? false : { opacity: 0.45 }}
          transition={{ duration: 0.45 }}>
          <span className="text-white/40">Route</span>
          {quote.route.map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-1">
              <TokenIcon size={12} token={t} />
              {i < quote.route.length - 1 && (
                <span aria-hidden className="text-[9px] text-white/30">
                  →
                </span>
              )}
            </span>
          ))}
        </motion.div>
        <motion.div
          key={`stats-${idx}`}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2.5 tabular-nums"
          initial={reduce ? false : { opacity: 0.25 }}
          transition={{ duration: 0.25 }}>
          <span>
            Impact <span className="text-white/80">{quote.impact}</span>
          </span>
          <span aria-hidden className="text-white/20">
            ·
          </span>
          <span>
            Min. <span className="text-white/80">{quote.min}</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
};
