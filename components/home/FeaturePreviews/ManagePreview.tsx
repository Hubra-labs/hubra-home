"use client";

import type { IconProps } from "./shared";

import { motion, useReducedMotion } from "framer-motion";

import { PRIMARY, WalletIcon, WalletKey, eyebrow, shell } from "./shared";

const ArrowUpRight = ({ className = "", style }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} style={style} viewBox="0 0 24 24">
    <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WALLETS: Array<{ wallet: WalletKey; name: string; balance: string }> = [
  { wallet: "phantom", name: "Main", balance: "$8,240" },
  { wallet: "solflare", name: "Trading", balance: "$2,410" },
  { wallet: "backpack", name: "Cold", balance: "$1,800" },
];

export const ManagePreview = (): JSX.Element => {
  const reduce = useReducedMotion();

  return (
    <div className={`${shell} flex flex-col gap-3 p-4 md:p-5`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`flex items-center gap-1.5 text-[10px] ${eyebrow}`}>
            <span className="inline-flex -space-x-1">
              <WalletIcon size={14} wallet="phantom" />
              <WalletIcon size={14} wallet="solflare" />
              <WalletIcon size={14} wallet="backpack" />
            </span>
            3 wallets · unified
          </div>
          <div className="mt-1 text-xl font-semibold tabular-nums tracking-tight text-white md:text-2xl">$12,450.82</div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-[10px] ${eyebrow}`}>30d PnL</span>
          <span className="mt-0.5 flex items-center gap-1 text-sm font-semibold tabular-nums text-success-500">
            <ArrowUpRight className="h-3 w-3" />
            +$734.21
          </span>
        </div>
      </div>

      <div className="relative min-h-[50px] flex-1">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 320 90">
          <defs>
            <linearGradient id="fp-pnl-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.32" />
              <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            animate={{ opacity: 1 }}
            d="M0,72 C30,70 55,66 80,60 C110,52 140,60 170,48 C200,36 230,42 260,30 C285,20 305,15 320,10 L320,90 L0,90 Z"
            fill="url(#fp-pnl-grad)"
            initial={{ opacity: reduce ? 1 : 0 }}
            transition={{ delay: 0.1, duration: reduce ? 0 : 0.6 }}
          />
          <motion.path
            animate={{ pathLength: 1 }}
            d="M0,72 C30,70 55,66 80,60 C110,52 140,60 170,48 C200,36 230,42 260,30 C285,20 305,15 320,10"
            fill="none"
            initial={{ pathLength: reduce ? 1 : 0 }}
            stroke={PRIMARY}
            strokeLinecap="round"
            strokeWidth={1.75}
            transition={{ delay: 0.2, duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.circle
            animate={{ opacity: 1, scale: 1 }}
            cx={316}
            cy={11}
            fill={PRIMARY}
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0 }}
            r={2.75}
            transition={{ delay: reduce ? 0 : 1.0, duration: reduce ? 0 : 0.25 }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {WALLETS.map((w) => (
          <div key={w.wallet} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-1.5">
            <WalletIcon size={18} wallet={w.wallet} />
            <div className="flex min-w-0 flex-col leading-tight">
              <span className={`truncate text-[10px] ${eyebrow}`}>{w.name}</span>
              <span className="text-[11px] font-semibold tabular-nums text-white">{w.balance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
