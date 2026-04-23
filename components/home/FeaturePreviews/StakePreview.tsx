"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { TokenIcon, eyebrow, shell } from "./shared";

// Balance ticks up continuously to convey on-chain earnings happening right now.
// Demo cadence — not a real-rate simulation.
const BASE_BALANCE = 10.00153;
const TICK_MS = 80;
const TICK_INC = 0.00001;

// Projected SOL balance at 5.83% APY, compounded. Marketing-approximate.
const PROJECTIONS: Array<{ label: string; value: string; emphasis?: boolean }> = [
  { label: "Today", value: "10.000" },
  { label: "+30d", value: "10.064" },
  { label: "+1y", value: "10.583" },
  { label: "+5y", value: "13.791", emphasis: true },
];

export const StakePreview = (): JSX.Element => {
  const reduce = useReducedMotion();
  const [balance, setBalance] = useState(BASE_BALANCE);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setBalance((b) => b + TICK_INC + Math.random() * TICK_INC);
    }, TICK_MS);

    return () => clearInterval(id);
  }, [reduce]);

  const [whole, frac] = balance.toFixed(5).split(".");

  return (
    <div className={`${shell} flex flex-col justify-between gap-3 p-4 md:p-5`}>
      <div className={`flex items-center justify-between text-[10px] ${eyebrow}`}>
        <span>Stake SOL</span>
        <span className="flex items-center gap-1.5 normal-case tracking-normal">
          <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
          <span className="font-medium tabular-nums text-success-500">5.83% APY</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <TokenIcon size={44} token="sol" />
        <div className="flex min-w-0 flex-col leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[24px] md:text-[28px] font-semibold tabular-nums tracking-tight text-white leading-none">
              {whole}
              <span className="text-white/75">.{frac}</span>
            </span>
            <span className={`text-[10px] ${eyebrow}`}>SOL</span>
          </div>
          <span className="mt-1 text-[11px] text-white/55">More SOL, every day.</span>
        </div>
      </div>

      <div>
        <div className={`mb-1.5 text-[10px] ${eyebrow}`}>Projected at 5.83% APY</div>
        <div className="grid grid-cols-4 gap-1.5">
          {PROJECTIONS.map((p) => (
            <div
              key={p.label}
              className={`rounded-lg border px-2 py-1.5 ${
                p.emphasis ? "border-success-500/30 bg-success-500/10" : "border-white/[0.06] bg-white/[0.04]"
              }`}>
              <div className={`text-[9px] ${eyebrow}`}>{p.label}</div>
              <div className={`text-[11px] font-semibold tabular-nums ${p.emphasis ? "text-success-500" : "text-white"}`}>{p.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
