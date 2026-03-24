# Hubra Landing Page — Refactored Prompt

Create a dark, premium landing page for **Hubra** — an AI-powered DeFi super-app that gives everyone financial superpowers. The design uses a "liquid glass" aesthetic with ultra-dark backgrounds, translucent glassmorphic elements, and green accent color. Built with React, Vite, TypeScript, Tailwind CSS, shadcn/ui, and hls.js for video streaming.

> All design system specs (colors, fonts, liquid-glass utility, button variants, marquee animation, video URLs, gradients, layout classes) remain identical to the original APEX prompt. Only content/copy is replaced below.

---

## SECTION 1: HERO

**Navbar:**
- Logo: Hubra icon + "HUBRA" text (text-xl font-semibold)
- Nav items: "Earn" (dropdown chevron), "Horus", "Security", "Learn" (dropdown chevron)
- CTA: `<Button variant="hero" size="sm">Get Started</Button>`

**Announcement Badge:**
- "Horus Agent is Live!" + nested "Explore" badge with ChevronRight

**Heading:**
```
Financial Superpowers
For Everyone
```

**Subheading:**
"Your assets, optimized 24/7. Earn DeFi yields, swap instantly, and let Horus handle the complexity."

**CTA Buttons:**
- "Start Earning Now" (hero variant)
- "See How It Works" (heroSecondary variant)

**Social Proof Bar:**
- Left text: "Trusted by thousands earning smarter" (2-line, text-foreground/50 text-sm)
- Right: infinite marquee scrolling 6 partner/integration names (e.g. Jupiter, Marinade, Sanctum, Jito, Drift, Kamino) — each with a liquid-glass icon showing the first letter.

---

## SECTION 2: FEATURES (3-Column Cards)

**Badge:** "Three Layers" + "Overview" with ChevronRight

**Heading:**
```
Built So You Don't Have
To Be an Expert
```

**Sub:** "Three layers working together — so your assets grow while you focus on life."

**3 Feature Cards:**

1. **Seamless Onboarding**
   "Sign in with Google, Apple, or email. No wallet downloads, no extensions, no seed phrases. You're on-chain before you realize it."
   - Stat: "30 seconds" / "to your first earn"

2. **One-Tap Yields**
   "Access 5–10%+ APY on stablecoins and SOL through managed vaults. Auto-compounding, no gas fees, full self-custody."
   - Stat: "8%+" / "avg. stablecoin yield"

3. **Horus — Your DeFi Agent**
   "Your personal financial agent. It monitors yields, suggests optimizations, and moves your funds to better opportunities — with your permission."
   - Stat: "24/7" / "autonomous optimization"

---

## SECTION 3: CHESS SECTION (Video Left, Content Right)

**Badge:** "Smart Routing" + "New"

**Heading:**
```
Your Assets Find
Its Best Path
```

**Body:**
"Intelligent yield scoring meets adaptive routing. Your funds are automatically matched to the vaults, protocols, and strategies most likely to maximize returns — in real time."

**Bullet list (3 items):**
- "AI-scored yield opportunities"
- "Dynamic vault allocation"
- "Cross-protocol optimization"

**Buttons:**
- "See It in Action" (hero)
- "Read the Docs" (heroSecondary)

---

## SECTION 4: REVERSE CHESS SECTION 

**Badge:** "Auto-Earn" + "Beta"

**Heading:**
```
No Idle Funds.
Ever.
```

**Body:**
"The moment you deposit, your assets go to work. Auto-Earn continuously routes your assets to the highest-yielding opportunities — no manual management, no missed returns."

**4 stat cards:**
- "8.2%" / "avg. stablecoin APY"
- "Zero" / "gas fees for users"
- "100%" / "self-custody"
- "$12M+" / "total value earning"

**Button:** "Try Auto-Earn" (hero)

---


## SECTION 6: CTA + FOOTER

### CTA Section

**Heading:**
```
Ready to Give Your
Asset Superpowers?
```

**Sub:** "Join 10,000+ people already earning smarter with Hubra. No crypto knowledge required."

**Buttons:**
- "Start Earning Free" (hero)
- "Talk to Us" (heroSecondary)

### Footer

**5-column grid:**
- **Brand** (2-col span): Hubra logo + "Financial superpowers for everyone."
- **Product:** Earn, Swap, Horus, Vaults, Roadmap
- **Company:** About, Blog, Careers, Press
- **Resources:** Documentation, Community, Support, Status

**Bottom bar:** "© 2026 Hubra." + Privacy / Terms / Cookies links

---

## KEY NARRATIVE PRINCIPLES (for reference)

- **Hero = the user.** They're not dumb or lazy — they're busy. Hubra empowers them.
- **Villain = complexity.** Not scams, not volatility. The gap between what's possible and what's accessible.
- **Guide = Hubra + Horus.** Removes the need to understand everything.
- **Transformation:** Confused → confident. Missing opportunities → capturing yield 24/7. Passive saver → active earner.
- **Tone:** Confident, warm, zero jargon in user-facing copy. Technical credibility through results, not terminology.