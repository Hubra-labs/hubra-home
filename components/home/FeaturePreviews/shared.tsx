import type { CSSProperties } from "react";

import Image from "next/image";

// SVG fills/strokes need raw values; Tailwind classes handle everything else.
// Keep in sync with tailwind.config.js: primary.500, success.500, error.500.
export const PRIMARY = "#DAA520";
export const GAIN = "#15B79E";
export const LOSS = "#F63D68";

export const shell =
  "relative w-full aspect-[3/2] sm:aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015]";

export const eyebrowBase = "uppercase tracking-[0.22em]";
export const eyebrow = `${eyebrowBase} text-white/55`;

export type IconProps = { className?: string; style?: CSSProperties };

export const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type TokenKey = "sol" | "usdc" | "rasol";

const TOKEN_SRC: Record<TokenKey, string> = {
  sol: "/image/tokens/sol.svg",
  usdc: "/image/tokens/usdc.png",
  rasol: "/image/tokens/raSOL.svg",
};

export const TokenIcon = ({ token, size = 24 }: { token: TokenKey; size?: number }) => (
  <Image
    alt={token}
    className="shrink-0 rounded-full"
    height={size}
    src={TOKEN_SRC[token]}
    style={{ width: size, height: size }}
    width={size}
  />
);

export type WalletKey = "phantom" | "solflare" | "backpack";

const WALLET_SRC: Record<WalletKey, string> = {
  phantom: "/image/wallets/phantom.png",
  solflare: "/image/wallets/solflare.png",
  backpack: "/image/wallets/backpack.png",
};

export const WalletIcon = ({ wallet, size = 20 }: { wallet: WalletKey; size?: number }) => (
  <Image
    alt={wallet}
    className="shrink-0 rounded-md"
    height={size}
    src={WALLET_SRC[wallet]}
    style={{ width: size, height: size }}
    width={size}
  />
);
