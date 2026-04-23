"use client";

import { Icon } from "@iconify/react";

import { MagicBento, type BentoItem } from "./MagicBento";

const BeforeAfter = ({
  beforeLabel,
  beforeValue,
  afterLabel,
  afterValue,
}: {
  beforeLabel: string;
  beforeValue: string;
  afterLabel: string;
  afterValue: string;
}): JSX.Element => (
  <div className="bento-before-after">
    <div className="bento-before-after__col">
      <span className="bento-before-after__eyebrow">{beforeLabel}</span>
      <span className="bento-before-after__value bento-before-after__value--before">{beforeValue}</span>
    </div>
    <Icon className="bento-before-after__arrow" icon="ph:arrow-right-bold" />
    <div className="bento-before-after__col">
      <span className="bento-before-after__eyebrow bento-before-after__eyebrow--accent">{afterLabel}</span>
      <span className="bento-before-after__value bento-before-after__value--after text-gradient-brand">{afterValue}</span>
    </div>
  </div>
);

const SoloStat = ({ caption, value }: { caption: string; value: string }): JSX.Element => (
  <div className="bento-solo-stat">
    <span className="bento-solo-stat__caption">{caption}</span>
    <span className="bento-solo-stat__value text-gradient-brand">{value}</span>
  </div>
);

const ITEMS: BentoItem[] = [
  {
    label: "Clarity",
    title: "Every wallet, one view.",
    description: "Live PnL. Live yield.",
    icon: <Icon icon="ph:squares-four-fill" />,
  },
  {
    label: "Curation",
    title: "Only the best of Solana.",
    description: "Jupiter. Kamino. Sanctum.",
    icon: <Icon icon="ph:seal-check-fill" />,
  },
  {
    label: "Intelligence",
    title: "Horus, your AI co-pilot.",
    description: "You talk. Horus executes - gaslessly, on your signature.",
    icon: <Icon icon="ph:eye-fill" />,
    hero: <BeforeAfter afterLabel="Hubra" afterValue="1 prompt" beforeLabel="Typical" beforeValue="20 clicks" />,
  },
  {
    label: "Friction",
    title: "We cover every click.",
    description: "Swap, stake, claim - no SOL needed to move.",
    icon: <Icon icon="ph:feather-fill" />,
    hero: <SoloStat caption="Your gas" value="$0" />,
  },
  {
    label: "Depth",
    title: "Degen-grade, one tap.",
    description: "Smart routing. Bulk claim.",
    icon: <Icon icon="ph:lightning-fill" />,
  },
  {
    label: "Security",
    title: "Self-custody.",
    description: "Your keys, always.",
    icon: <Icon icon="ph:shield-check-fill" />,
  },
];

export const ForEveryone = (): JSX.Element => {
  return (
    <section className="w-full px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">For everyone</div>
          <h2 className="font-sans text-white text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1]">
            Built for both sides
            <br />
            <span className="text-white/40">of the chart.</span>
          </h2>
          <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
            Six reasons Hubra works for first-timers and Solana natives alike - from the first click to the last bulk-claim.
          </p>
        </div>

        <MagicBento
          clickEffect
          enableBorderGlow
          enableMagnetism
          enableSpotlight
          enableStars
          glowColor="218, 165, 32"
          items={ITEMS}
          particleCount={10}
          spotlightRadius={320}
          textAutoHide={false}
        />
      </div>
    </section>
  );
};
