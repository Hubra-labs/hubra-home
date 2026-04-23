"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

import {
  // Partner10Icon,
  Partner11Icon,
  Partner12Icon,
  Partner13Icon,
  Partner1Icon,
  Partner2Icon,
  Partner3Icon,
  Partner4Icon,
  Partner5Icon,
  Partner6Icon,
  Partner7Icon,
  Partner8Icon,
  Partner9Icon,
} from "@/components/icons";

const PARTNER_ROWS = [
  [Partner1Icon, Partner2Icon, Partner3Icon, Partner4Icon, Partner5Icon, Partner6Icon, Partner7Icon],
  [Partner8Icon, Partner9Icon, Partner11Icon, Partner12Icon, Partner13Icon],
];

export const HomeFooter = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col gap-20 md:gap-28">
      <div className="flex flex-col items-center gap-10 md:gap-14 w-full px-4 md:px-6">
        <div className="max-w-3xl text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Partners</div>
          <h2 className="font-sans text-white text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1]">
            Backed by the best
            <br />
            <span className="text-white/40">of Solana.</span>
          </h2>
        </div>

        <div className="w-full max-w-5xl flex flex-col items-center gap-4">
          {PARTNER_ROWS.map((row, i) => (
            <div key={i} className="flex flex-wrap justify-center gap-4">
              {row.map((P, j) => (
                <div
                  key={j}
                  className="flex items-center justify-center w-[88px] h-[88px] md:w-[98px] md:h-[98px] rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.15] hover:bg-white/[0.04] transition-colors">
                  <P />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <footer className="w-full px-4 md:px-6">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 flex flex-col gap-10">
          <div className="flex flex-col gap-10 md:flex-row justify-between w-full">
            <div className="flex-1">
              <h3 className="text-white text-lg font-medium mb-2">Stay connected</h3>
              <p className="text-white/50 text-sm max-w-sm">Follow along for product updates, new integrations, and releases.</p>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-12">
              <div className="flex flex-col gap-3">
                <h4 className="text-white/90 text-sm font-medium">Product</h4>
                <span className="text-white/40 text-sm cursor-not-allowed">Download (soon)</span>
                <Link className="text-white/60 hover:text-white text-sm" href="https://hubra.app" target="_blank">
                  Web app
                </Link>
                <Link className="text-white/60 hover:text-white text-sm" href="https://docs.hubra.app" target="_blank">
                  Learn
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-white/90 text-sm font-medium">Community</h4>
                <Link className="text-white/60 hover:text-white text-sm" href="https://discord.hubra.app" target="_blank">
                  Discord
                </Link>
                <Link className="text-white/60 hover:text-white text-sm" href="https://t.me/hubraapp" target="_blank">
                  Telegram
                </Link>
                <Link className="text-white/60 hover:text-white text-sm" href="https://x.com/hubraapp" target="_blank">
                  X
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-white/90 text-sm font-medium">Resources</h4>
                <Link className="text-white/60 hover:text-white text-sm" href="https://github.com/hubra-labs" target="_blank">
                  GitHub
                </Link>
                <Link className="text-white/60 hover:text-white text-sm" href="https://docs.hubra.app" target="_blank">
                  Docs
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image alt="Hubra" height={22} src="/logo.png" width={22} />
              <span className="text-white/80 font-medium">Hubra</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="https://x.com/HubraApp" target="_blank">
                <Icon className="w-5 h-5 text-white/40 hover:text-white" icon="prime:twitter" />
              </Link>
              <Link href="https://github.com/hubra-labs" target="_blank">
                <Icon className="w-5 h-5 text-white/40 hover:text-white" icon="ri:github-fill" />
              </Link>
              <Link href="https://discord.hubra.app" target="_blank">
                <Icon className="w-5 h-5 text-white/40 hover:text-white" icon="ri:discord-fill" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
