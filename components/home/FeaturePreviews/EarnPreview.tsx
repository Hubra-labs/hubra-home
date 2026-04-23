"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { TokenIcon, shell } from "./shared";

type Pool = { id: string; apy: number };

// Market-rate snapshots. The row's max is the active rate; as it shifts,
// capital follows. No provider names implied — pools are anonymous.
const POOL_STATES: Pool[][] = [
  [
    { id: "a", apy: 10.24 },
    { id: "b", apy: 9.81 },
    { id: "c", apy: 12.42 },
  ],
  [
    { id: "a", apy: 13.12 },
    { id: "b", apy: 10.52 },
    { id: "c", apy: 11.83 },
  ],
  [
    { id: "a", apy: 11.54 },
    { id: "b", apy: 13.41 },
    { id: "c", apy: 11.25 },
  ],
  [
    { id: "a", apy: 11.22 },
    { id: "b", apy: 11.03 },
    { id: "c", apy: 13.25 },
  ],
];

const STATE_MS = 2000;

const EYEBROW = "text-[11px] uppercase tracking-[0.22em] text-white/55";

function findActiveIdx(pools: Pool[]): number {
  let best = 0;

  for (let i = 1; i < pools.length; i += 1) {
    if (pools[i].apy > pools[best].apy) best = i;
  }

  return best;
}

export const EarnPreview = (): JSX.Element => {
  const reduce = useReducedMotion();
  const [stateIdx, setStateIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setStateIdx((i) => (i + 1) % POOL_STATES.length);
    }, STATE_MS);

    return () => clearInterval(id);
  }, [reduce]);

  const pools = POOL_STATES[stateIdx];
  const activeIdx = findActiveIdx(pools);
  const active = pools[activeIdx];

  return (
    <div className={`${shell} flex flex-col justify-between p-5 md:p-6`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <TokenIcon size={18} token="usdc" />
          <span className={EYEBROW}>Always-on yield</span>
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
          AI
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={active.apy}
              animate={{ opacity: 1, y: 0 }}
              className="text-[42px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-success-500 md:text-[52px]"
              exit={{ opacity: 0, y: -8 }}
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
              {active.apy.toFixed(2)}%
            </motion.span>
          </AnimatePresence>
          <span className={EYEBROW}>APY</span>
        </div>
        <p className="mt-2 max-w-[32ch] text-[14px] leading-[1.5] text-white/60">Funds automatically move to the highest rate available.</p>
      </div>

      <div>
        <div className={`mb-2.5 ${EYEBROW}`}>Live rates</div>
        <div className="relative grid grid-cols-3">
          {pools.map((p, i) => {
            const isActive = i === activeIdx;

            return (
              <div key={p.id} className="relative flex flex-col items-center pb-2">
                <span
                  className={`text-[14px] tabular-nums transition-colors duration-500 ${
                    isActive ? "font-medium text-success-500" : "text-white/40"
                  }`}>
                  {p.apy.toFixed(2)}%
                </span>
                {isActive && (
                  <motion.span
                    aria-hidden
                    className="absolute bottom-0 h-[2px] w-10 rounded-full bg-success-500"
                    layoutId="earn-active-underline"
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
