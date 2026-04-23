"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { GAIN, LOSS, PRIMARY, TokenIcon, TokenKey, eyebrow, shell } from "./shared";

type TrackOp = "swap" | "send" | "stake" | "receive";

const trackIconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const trackIcons: Record<TrackOp, JSX.Element> = {
  swap: (
    <svg className="h-3 w-3" {...trackIconProps}>
      <path d="M7 4v14M4 7l3-3 3 3M17 20V6M14 17l3 3 3-3" />
    </svg>
  ),
  send: (
    <svg className="h-3 w-3" {...trackIconProps}>
      <path d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  ),
  stake: (
    <svg className="h-3 w-3" {...trackIconProps}>
      <path d="M12 3l8.5 4.5L12 12 3.5 7.5 12 3z" />
      <path d="M3.5 12L12 16.5 20.5 12" />
    </svg>
  ),
  receive: (
    <svg className="h-3 w-3" {...trackIconProps}>
      <path d="M17 7L7 17M7 17h8M7 17V9" />
    </svg>
  ),
};

type TrackItem = {
  id: string;
  op: TrackOp;
  title: string;
  amount: string;
  tokens: TokenKey[];
  time: string;
  insertedAt?: number;
  color: string;
};

const INITIAL_TODAY: TrackItem[] = [
  { id: "t1", op: "swap", title: "Swap", amount: "+876.20", tokens: ["sol", "usdc"], time: "1h", color: PRIMARY },
  { id: "t2", op: "stake", title: "Stake", amount: "+9.87", tokens: ["rasol"], time: "5h", color: GAIN },
];

const YESTERDAY: TrackItem[] = [
  { id: "y1", op: "receive", title: "Received", amount: "+100.00", tokens: ["usdc"], time: "22h", color: GAIN },
  { id: "y2", op: "send", title: "Sent", amount: "-50.00", tokens: ["usdc"], time: "1d", color: LOSS },
];

// New transactions cycle in to convey a real on-chain feed.
const LIVE_POOL: Array<Omit<TrackItem, "id" | "time" | "insertedAt">> = [
  { op: "swap", title: "Swap", amount: "+45.20", tokens: ["sol", "usdc"], color: PRIMARY },
  { op: "receive", title: "Received", amount: "+2.50", tokens: ["sol"], color: GAIN },
  { op: "stake", title: "Claim", amount: "+1.24", tokens: ["rasol"], color: GAIN },
  { op: "swap", title: "Swap", amount: "+12.80", tokens: ["usdc", "sol"], color: PRIMARY },
];

const TODAY_CAP = 3;
const INSERT_START_MS = 1200;
const INSERT_INTERVAL_MS = 3500;
const NOW_TICK_MS = 1000;

function renderTime(it: TrackItem, now: number): string {
  if (it.insertedAt === undefined || now === 0) return it.time;
  const elapsed = Math.max(0, Math.floor((now - it.insertedAt) / 1000));

  if (elapsed < 2) return "just now";
  if (elapsed < 60) return `${elapsed}s`;

  return `${Math.floor(elapsed / 60)}m`;
}

export const TrackPreview = (): JSX.Element => {
  const reduce = useReducedMotion();
  const [todayItems, setTodayItems] = useState<TrackItem[]>(INITIAL_TODAY);
  const [now, setNow] = useState(0);

  // Real-time clock for aging "just now" labels. Gated by reduced-motion.
  useEffect(() => {
    if (reduce) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), NOW_TICK_MS);

    return () => clearInterval(id);
  }, [reduce]);

  // Periodically inject a new transaction. Oldest falls off when capped.
  useEffect(() => {
    if (reduce) return;
    let tick = 0;
    const insert = () => {
      const template = LIVE_POOL[tick % LIVE_POOL.length];

      tick += 1;
      setTodayItems((prev) =>
        [
          {
            ...template,
            id: `live-${Date.now()}-${tick}`,
            time: "just now",
            insertedAt: Date.now(),
          } satisfies TrackItem,
          ...prev,
        ].slice(0, TODAY_CAP)
      );
    };
    const firstId = window.setTimeout(insert, INSERT_START_MS);
    const intervalId = window.setInterval(insert, INSERT_INTERVAL_MS);

    return () => {
      window.clearTimeout(firstId);
      window.clearInterval(intervalId);
    };
  }, [reduce]);

  return (
    <div className={`${shell} flex flex-col gap-2 overflow-hidden p-3 md:p-4`}>
      <TrackGroup live header="Today" items={todayItems} now={now} />
      <TrackGroup header="Yesterday" items={YESTERDAY} now={now} />
    </div>
  );
};

const TrackGroup = ({ header, items, live = false, now }: { header: string; items: TrackItem[]; live?: boolean; now: number }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center justify-between px-1">
      <span className={`text-[10px] ${eyebrow}`}>{header}</span>
      {live && (
        <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-success-500">
          <span className="h-1 w-1 rounded-full bg-success-500 motion-safe:animate-pulse" />
          Live
        </span>
      )}
    </div>
    <div className="relative pl-3">
      <span aria-hidden className="absolute bottom-1 left-1 top-1 w-px bg-white/10" />
      <AnimatePresence initial={true}>
        {items.map((it, idx) => (
          <motion.div
            key={it.id}
            layout
            animate={{ opacity: 1, y: 0 }}
            className="relative flex items-center justify-between py-1.5"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}>
            <span
              aria-hidden
              className="absolute -left-[7px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: it.color }}
            />
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${it.color}22`, color: it.color }}>
                {trackIcons[it.op]}
              </span>
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="text-[11px] font-semibold text-white">{it.title}</span>
                <span className="inline-flex -space-x-1.5">
                  {it.tokens.map((t) => (
                    <TokenIcon key={t} size={14} token={t} />
                  ))}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[11px] font-semibold tabular-nums" style={{ color: it.color }}>
                {it.amount}
              </span>
              <span className="text-[10px] tabular-nums text-white/45">{renderTime(it, now)}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);
