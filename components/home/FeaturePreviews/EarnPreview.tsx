"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

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

const STATE_MS = 2200;

// Horizontal center of each pool column (3 cols, equal widths).
const POOL_CENTER_X = ["16.67%", "50%", "83.33%"] as const;

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
  const [flow, setFlow] = useState<{ from: number; to: number; key: number } | null>(null);
  const prevActiveRef = useRef<number>(findActiveIdx(POOL_STATES[0]));
  const flowKeyRef = useRef(0);

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

  // Trigger a capital-flow particle whenever the winning pool changes.
  useEffect(() => {
    if (reduce) return;
    const prev = prevActiveRef.current;

    if (prev !== activeIdx) {
      flowKeyRef.current += 1;
      setFlow({ from: prev, to: activeIdx, key: flowKeyRef.current });
      prevActiveRef.current = activeIdx;
    }
  }, [activeIdx, reduce]);

  // Count the big APY number up/down to the new target instead of hard-swapping.
  const apyMV = useMotionValue(active.apy);
  const apyText = useTransform(apyMV, (v) => `${v.toFixed(2)}%`);

  useEffect(() => {
    if (reduce) {
      apyMV.set(active.apy);

      return;
    }
    const controls = animate(apyMV, active.apy, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });

    return controls.stop;
  }, [active.apy, apyMV, reduce]);

  return (
    <div className={`${shell} flex flex-col justify-between p-5 md:p-6`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <TokenIcon size={18} token="usdc" />
          <span className="text-[12px] font-medium text-white/70">Always-on yield</span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-primary/85">
          <span className="h-1 w-1 rounded-full bg-primary" />
          AI-routed
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-3">
          <motion.span className="text-[42px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-success-500 md:text-[52px]">
            {apyText}
          </motion.span>
          <span className="text-[11px] font-medium text-white/50">APY</span>
        </div>
        <p className="mt-2 max-w-[32ch] text-[14px] leading-[1.5] text-white/60">Funds automatically move to the highest rate available.</p>
      </div>

      <div>
        <div className="relative grid grid-cols-3">
          {pools.map((p, i) => {
            const isActive = i === activeIdx;

            return (
              <div key={p.id} className="relative flex flex-col items-center pb-2">
                <motion.span
                  animate={{
                    scale: isActive && !reduce ? [1, 1.06, 1] : 1,
                    y: isActive && !reduce ? [0, -1.5, 0] : 0,
                  }}
                  className={`text-[14px] tabular-nums transition-colors duration-500 ${
                    isActive ? "font-medium text-success-500" : "text-white/40"
                  }`}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  {p.apy.toFixed(2)}%
                </motion.span>
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

          {flow && !reduce && (
            <motion.span
              key={flow.key}
              aria-hidden
              animate={{
                left: [POOL_CENTER_X[flow.from], POOL_CENTER_X[flow.to], POOL_CENTER_X[flow.to]],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.8],
                top: [-30, -14, 0],
              }}
              className="pointer-events-none absolute h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-success-500 shadow-[0_0_8px_rgba(46,211,135,0.6)]"
              initial={{ left: POOL_CENTER_X[flow.from], opacity: 0, scale: 0.5, top: -30 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], times: [0, 0.45, 1] }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
