"use client";

import { Masonry, type MasonryItem } from "./Masonry";

const GOLD = "radial-gradient(circle, rgba(218,165,32,0.45) 0%, transparent 70%)";
const MINT = "radial-gradient(circle, rgba(46,211,135,0.40) 0%, transparent 70%)";
const ROSE = "radial-gradient(circle, rgba(253,111,142,0.40) 0%, transparent 70%)";
const ICE = "radial-gradient(circle, rgba(140,180,255,0.35) 0%, transparent 70%)";
const VIOLET = "radial-gradient(circle, rgba(170,120,255,0.40) 0%, transparent 70%)";

const ITEMS: MasonryItem[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    icon: "ph:chart-pie-slice-fill",
    title: "Portfolio",
    body: "Your whole Solana net worth, in one place.",
    height: 260,
    accent: GOLD,
  },
  {
    id: "earn",
    label: "Earn",
    icon: "ph:seal-check-fill",
    title: "Earn",
    body: "Put idle tokens to work - yields from the best DeFi protocols.",
    height: 320,
    accent: MINT,
  },
  {
    id: "swap",
    label: "Swap",
    icon: "ph:arrows-left-right-fill",
    title: "Swap",
    body: "Swap any token on Solana at the best price.",
    height: 240,
    accent: ICE,
  },
  {
    id: "stake",
    label: "Stake",
    icon: "ph:lightning-fill",
    title: "Stake",
    body: "Stake SOL and earn while you hold.",
    height: 300,
    accent: GOLD,
  },
  {
    id: "auto-earn",
    label: "Auto-Earn",
    icon: "ph:sparkle-fill",
    title: "Auto-Earn",
    body: "Set it once. We'll chase the best yield for you.",
    height: 360,
    accent: MINT,
  },
  {
    id: "horus",
    label: "Horus",
    icon: "ph:eye-fill",
    title: "Horus",
    body: "Your AI co-pilot for Solana DeFi.",
    height: 280,
    accent: VIOLET,
  },
  {
    id: "activity",
    label: "Activity",
    icon: "ph:pulse-fill",
    title: "Activity",
    body: "Every move, clearly explained.",
    height: 240,
    accent: ICE,
  },
  {
    id: "send",
    label: "Send & Receive",
    icon: "ph:paper-plane-tilt-fill",
    title: "Send & Receive",
    body: "Move tokens with zero friction - gas on us.",
    height: 320,
    accent: GOLD,
  },
  {
    id: "fund",
    label: "Fund",
    icon: "ph:plus-circle-fill",
    title: "Fund",
    body: "Top up with card, or crypto in seconds.",
    height: 260,
    accent: MINT,
  },
  {
    id: "cleanup",
    label: "Cleanup",
    icon: "ph:broom-fill",
    title: "Cleanup",
    body: "Reclaim SOL trapped in dust accounts.",
    height: 300,
    accent: ROSE,
  },
  {
    id: "bulk-claim",
    label: "Bulk Claim",
    icon: "ph:hand-coins-fill",
    title: "Bulk Claim",
    body: "Sweep every reward across every position in one tap.",
    height: 340,
    accent: GOLD,
  },
  {
    id: "watchlist",
    label: "Watchlist",
    icon: "ph:star-fill",
    title: "Watchlist",
    body: "Track the tokens you care about.",
    height: 240,
    accent: ICE,
  },
  {
    id: "xstocks",
    label: "xStocks",
    icon: "ph:chart-line-up-fill",
    title: "xStocks",
    body: "Trade tokenized stocks, 24/7, onchain.",
    height: 300,
    accent: VIOLET,
  },
  {
    id: "security",
    label: "Security",
    icon: "ph:shield-check-fill",
    title: "Security",
    body: "Self-custody, hardware-grade - your keys, always.",
    height: 280,
    accent: MINT,
  },
];

export const ProductGrid = (): JSX.Element => {
  return (
    <section className="w-full px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">The product</div>
          <h2 className="font-sans text-white text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1]">
            Endless tools. <span className="text-white/40">One app.</span>
          </h2>
          <p className="mt-6 text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
            Everything you need to move, grow, and protect your Solana - crafted to feel simple, even when the chain isn&apos;t.
          </p>
        </div>

        <Masonry
          blurToFocus
          scaleOnHover
          animateFrom="bottom"
          duration={0.6}
          ease="power3.out"
          hoverScale={0.97}
          items={ITEMS}
          stagger={0.05}
        />
      </div>
    </section>
  );
};
