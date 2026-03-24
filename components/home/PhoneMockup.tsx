"use client";
import { motion, useReducedMotion } from "framer-motion";

interface PhoneMockupProps {
  className?: string;
  variant?: "dashboard" | "copilot";
}

/* ── Dashboard variant content ── */
function DashboardScreen() {
  return (
    <>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ fontSize: 10, color: "#F5F5F7" }}>
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 9 }}>&#9679;&#9679;&#9679;</span>
          <svg fill="none" height="10" viewBox="0 0 14 10" width="14">
            <rect fill="#F5F5F7" height="4" rx="0.5" width="2.5" x="0" y="6" />
            <rect fill="#F5F5F7" height="6" rx="0.5" width="2.5" x="3.5" y="4" />
            <rect fill="#F5F5F7" height="8" rx="0.5" width="2.5" x="7" y="2" />
            <rect fill="#F5F5F7" height="10" rx="0.5" width="2.5" x="10.5" y="0" />
          </svg>
          <svg fill="none" height="10" viewBox="0 0 18 10" width="18">
            <rect height="9" rx="2" stroke="#F5F5F7" strokeWidth="1" width="14" x="0.5" y="0.5" />
            <rect fill="#30D158" height="6" rx="1" width="10" x="2" y="2" />
            <rect fill="#F5F5F7" height="4" rx="1" width="2" x="15.5" y="3" />
          </svg>
        </div>
      </div>

      {/* Portfolio header */}
      <div className="px-4 pt-3 pb-2">
        <p className="font-sans" style={{ fontSize: 10, color: "#8E8E93" }}>
          Portfolio
        </p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="font-sans font-semibold" style={{ fontSize: 22, color: "#F5F5F7", letterSpacing: "-0.02em" }}>
            $12,847
          </span>
          <span
            className="font-sans font-medium rounded px-1.5 py-0.5"
            style={{
              fontSize: 10,
              color: "#30D158",
              background: "rgba(48, 209, 88, 0.12)",
            }}>
            +2.3%
          </span>
        </div>
      </div>

      {/* Mini portfolio bar chart */}
      <div className="mx-4 mt-2 mb-3">
        <div className="flex gap-0.5 rounded-md overflow-hidden" style={{ height: 6 }}>
          <div className="rounded-l-md" style={{ flex: 5, background: "#F5A623" }} />
          <div style={{ flex: 2, background: "#0A84FF" }} />
          <div className="rounded-r-md" style={{ flex: 3, background: "#30D158" }} />
        </div>
        <div className="flex justify-between mt-1.5 font-sans" style={{ fontSize: 9, color: "#8E8E93" }}>
          <span className="flex items-center gap-1">
            <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: "#F5A623" }} />
            SOL
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: "#0A84FF" }} />
            JUP
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block rounded-full" style={{ width: 5, height: 5, background: "#30D158" }} />
            USDC
          </span>
        </div>
      </div>

      {/* Asset list */}
      <div className="mx-4 flex flex-col gap-0">
        {[
          { name: "SOL", price: "$142.30", color: "#F5A623" },
          { name: "JUP", price: "$0.84", color: "#0A84FF" },
          { name: "USDC", price: "$3,200.00", color: "#30D158" },
        ].map((asset) => (
          <div
            key={asset.name}
            className="flex items-center justify-between py-2.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2.5">
              <div
                className="rounded-full flex items-center justify-center font-sans font-semibold"
                style={{
                  width: 26,
                  height: 26,
                  background: `${asset.color}18`,
                  color: asset.color,
                  fontSize: 9,
                }}>
                {asset.name.charAt(0)}
              </div>
              <span className="font-sans font-medium" style={{ fontSize: 12, color: "#F5F5F7" }}>
                {asset.name}
              </span>
            </div>
            <span className="font-sans" style={{ fontSize: 12, color: "#F5F5F7" }}>
              {asset.price}
            </span>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Copilot strip */}
      <div
        className="mx-4 mb-3 rounded-lg flex items-center justify-between px-3 py-2"
        style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full animate-pulse" style={{ width: 6, height: 6, background: "#30D158" }} />
          <span className="font-sans font-medium" style={{ fontSize: 11, color: "#F5F5F7" }}>
            Copilot
          </span>
        </div>
        <span className="font-sans" style={{ fontSize: 10, color: "#30D158" }}>
          Active
        </span>
      </div>
    </>
  );
}

/* ── Copilot variant content ── */
function CopilotScreen() {
  const activities = [
    { label: "Swapped 500 USDC → SOL", time: "2m ago", dotColor: "#30D158" },
    { label: "Rebalanced portfolio", time: "8m ago", dotColor: "#F5A623" },
    { label: "Auto-staked 200 SOL", time: "14m ago", dotColor: "#30D158" },
    { label: "Harvested 12.4 SOL rewards", time: "22m ago", dotColor: "#0A84FF" },
  ];

  return (
    <>
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ fontSize: 10, color: "#F5F5F7" }}>
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 9 }}>&#9679;&#9679;&#9679;</span>
          <svg fill="none" height="10" viewBox="0 0 14 10" width="14">
            <rect fill="#F5F5F7" height="4" rx="0.5" width="2.5" x="0" y="6" />
            <rect fill="#F5F5F7" height="6" rx="0.5" width="2.5" x="3.5" y="4" />
            <rect fill="#F5F5F7" height="8" rx="0.5" width="2.5" x="7" y="2" />
            <rect fill="#F5F5F7" height="10" rx="0.5" width="2.5" x="10.5" y="0" />
          </svg>
          <svg fill="none" height="10" viewBox="0 0 18 10" width="18">
            <rect height="9" rx="2" stroke="#F5F5F7" strokeWidth="1" width="14" x="0.5" y="0.5" />
            <rect fill="#30D158" height="6" rx="1" width="10" x="2" y="2" />
            <rect fill="#F5F5F7" height="4" rx="1" width="2" x="15.5" y="3" />
          </svg>
        </div>
      </div>

      {/* Copilot header */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between">
          <span className="font-sans font-semibold tracking-wide" style={{ fontSize: 11, color: "#8E8E93", letterSpacing: "0.08em" }}>
            COPILOT
          </span>
          <div className="flex items-center gap-1.5">
            <span className="inline-block rounded-full animate-pulse" style={{ width: 6, height: 6, background: "#30D158" }} />
            <span className="font-sans font-medium" style={{ fontSize: 10, color: "#30D158" }}>
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Active strategies */}
      <div className="mx-4 mt-3 rounded-lg px-3 py-2.5" style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans" style={{ fontSize: 10, color: "#8E8E93" }}>
            Active Strategies
          </span>
          <span className="font-sans font-semibold" style={{ fontSize: 12, color: "#F5F5F7" }}>
            3/5
          </span>
        </div>
        {/* Progress bar */}
        <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.06)" }}>
          <div className="rounded-full" style={{ width: "60%", height: "100%", background: "#0A84FF" }} />
        </div>
      </div>

      {/* Activity feed */}
      <div className="mx-4 mt-4">
        <span className="font-sans" style={{ fontSize: 10, color: "#8E8E93" }}>
          Activity
        </span>
        <div className="flex flex-col mt-2">
          {activities.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 py-2.5"
              style={{
                borderBottom: i < activities.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
              <span
                className="inline-block rounded-full mt-1 flex-shrink-0"
                style={{
                  width: 6,
                  height: 6,
                  background: item.dotColor,
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-sans font-medium" style={{ fontSize: 11, color: "#F5F5F7" }}>
                  {item.label}
                </p>
                <p className="font-sans mt-0.5" style={{ fontSize: 9, color: "#48484A" }}>
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom monitoring strip */}
      <div
        className="mx-4 mb-3 rounded-lg flex items-center gap-2 px-3 py-2"
        style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="inline-block rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: "#0A84FF" }} />
        <span className="font-sans" style={{ fontSize: 10, color: "#8E8E93" }}>
          Monitoring 47 protocols
        </span>
      </div>
    </>
  );
}

/* ── Main PhoneMockup component ── */
export const PhoneMockup = ({ className = "", variant = "dashboard" }: PhoneMockupProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative w-[280px] md:w-[320px] ${className}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      whileInView={{ opacity: 1, y: 0 }}>
      {/* Phone bezel / frame — gold-tinted gradient border */}
      <div
        className="rounded-[40px] p-[3px]"
        style={{
          background: "linear-gradient(160deg, rgba(245,166,35,0.2) 0%, #1C1C1E 30%, #1C1C1E 70%, rgba(245,166,35,0.15) 100%)",
        }}>
        {/* Inner screen area */}
        <div
          className="rounded-[32px] overflow-hidden flex flex-col relative"
          style={{
            background: "#08080C",
            aspectRatio: "9 / 19.5",
          }}>
          {/* Dynamic Island / Notch */}
          <div className="flex justify-center pt-2.5 pb-0">
            <div
              className="rounded-full"
              style={{
                width: 80,
                height: 22,
                background: "#1C1C1E",
              }}
            />
          </div>

          {/* Screen content */}
          <div className="flex flex-col flex-1 min-h-0">{variant === "dashboard" ? <DashboardScreen /> : <CopilotScreen />}</div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2 pt-1">
            <div
              className="rounded-full"
              style={{
                width: 100,
                height: 4,
                background: "rgba(245, 245, 247, 0.2)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
