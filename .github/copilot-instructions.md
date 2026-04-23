## Design Context

### Users

**Primary**: Mixed audience, biased toward normies — crypto-curious users coming from CEXes (Coinbase, Binance, Kraken) who want Solana exposure without learning the protocol-by-protocol landscape. They're evaluating Hubra against their existing CEX and against competitors like Phantom. They read the homepage with skepticism: "why should I trust this over my current app?"

**Secondary**: Solana-native power users (degens). They already recognize Kamino, Jupiter, Sanctum, raSOL, Horus. They tolerate normie-friendly copy if sophistication shows in the product itself. They are not the homepage's primary conversion target but they ARE the credibility audience — if the homepage feels amateur, they'll call it out and poison social.

**Context of use**: Landing page. Single scroll. Usually first-touch, often from Twitter/X, Discord, or referrals. Decision window: seconds. Expected next action: "Launch app" or follow a rabbit hole into docs. Mobile is a real surface; many crypto discovery journeys happen there.

**Job-to-be-done**: "Convince me that Hubra is the one app I need for Solana — simpler than stitching together Phantom + Jupiter + Kamino, safer than a random aggregator, and actually works."

### Brand Personality

**Three words**: Confident. Calm. Premium.

- **Confident** — states facts, doesn't hedge. No "try Hubra today!" energy. Hubra is the finished product, not a pitch.
- **Calm** — quiet authority rather than hype. Restraint is the signal. The product is serious, the chain is volatile; the interface shouldn't add to the noise.
- **Premium** — feels like software someone designed, not assembled. The reader should think "these people care about craft" within 2 seconds.

**Voice**: Declarative, short sentences. Concrete nouns over adjectives. No em-dashes as cadence tool, no "your X, always" poetry, no "power of X, freedom of Y" marketing duals. Name things by their real names (Horus, raSOL) but always define them inline on first mention.

**Emotional target**: The reader should feel relief ("finally, one app") and trust ("this isn't a rug"), not excitement ("to the moon"). If the page triggers dopamine, it failed.

### Aesthetic Direction

**Synthesis** — the collision of two reference worlds:
- **Phantom / Jupiter / Hyperliquid** — for category awareness. We speak the language of Solana DeFi: tickers, APYs, wallet chrome, the visual vocabulary of on-chain tools.
- **Apple / Arc Browser / Rauno Freiberg** — for execution quality. Marketing as craft. Every interaction considered. Cinematic use of motion at *key* moments, silence everywhere else.

The gap between those two worlds is the opportunity: most Solana product sites look like each other (dark + neon + gradient text + bento). Hubra should look like it was designed by people who happen to know DeFi, not by DeFi people who happen to have a design tool.

**Theme**: Dark. Night-use, trader-context, category convention, better for the gold accent. Not negotiable.

**Color**:
- Gold `#DAA520` is locked as the primary. Use it SPARINGLY — 10% rule. Gold on the primary CTA, on active tab indicators, on key accent moments. Not on every card. Not as a background wash. Not as gradient text. Ever.
- Background: near-black tinted cool-warm balance (the existing `#0d0e21` is a good starting point). Tint neutrals subtly toward the gold hue to create cohesion — warm grays, not pure grays.
- Supporting colors exist but are EARNED: success green for positive values, rose for loss, but no other hues unless they carry data meaning. The 5-color radial-glow Masonry palette (gold/mint/rose/ice/violet) should go — it's decorative randomness.
- No gradient text. No purple-to-blue gradients. No cyan accents.

**Typography**:
- Geist is not locked. It's the current default and it's fine for UI, but the homepage marketing copy deserves a distinctive pairing. For the hero H1 and section H2s, seek a display face with character — not Fraunces, not Instrument Serif, not the usual suspects. Something with physical personality (a financial broadsheet workhorse, a Swiss-grotesque with attitude, an opinionated geometric sans). Geist can stay for body + UI.
- Modular scale, at least 1.25 ratio between steps. Few sizes with big contrast beats many sizes with small contrast.
- Light text on dark bg → add 0.05–0.1 to line-height.

**Motion**:
- Motion is a privilege, not a default. Reserve it for: section entrances on first scroll (once), primary CTA hover, product-preview state transitions in the hero. That's it.
- No magnetism, no parallax-everywhere, no mouse-tracking spotlights on every section, no particle fields, no tilt-on-hover, no click-ripples. The current MagicBento config is a catalog of what to avoid.
- Easing: ease-out-quart / quint / expo. Never bounce, never elastic.
- Respect `prefers-reduced-motion` everywhere.

**Surfaces**:
- Glassmorphism is fine in small doses (product-preview cards, footer chrome) but not as a default card treatment. Most cards should be flat with a 1px border at low alpha, not blurred translucent stacks.
- No stacked effects. Pick one: border-glow on hover OR spotlight OR shadow lift. Not three.
- Aurora background is tempting but expensive. If kept, it should be dramatically dialed down or replaced with a static, intentional gradient field.

**Composition**:
- Asymmetry over grid symmetry. Left-align most sections, use centered rhythm only at key moments (hero, metrics).
- Break the "tiny uppercase eyebrow → 2-line headline with faded second line" pattern currently repeated in every section. It's the most distinctive AI-template tell on the current page.
- Vary the negative space. Hero gets the most breathing room. Product grid tightens. Metrics opens up again. Rhythm, not uniform padding.

**Anti-references** (what Hubra should NOT look like):
- Any AI-generated SaaS landing page from 2024-2025.
- Bento-grid + masonry-grid + glassmorphism + gradient text combinations.
- "We built the future of X" hero with gradient headline and floating UI mockup.
- Sparkle-emoji copy, particle-trail cursors, "magical" anywhere in the copy.

### Design Principles

1. **Restraint signals premium.** Every removed element raises the perceived quality of what remains. If unsure whether to keep an effect, remove it. Gold fights harder when it's rare.

2. **Name the real thing.** Don't hide Horus, raSOL, Kamino behind euphemisms — but always define them inline on first mention ("Horus — our AI copilot"). Normies learn; degens feel respected.

3. **Show product, not marketing.** The feature-preview cards in the current hero (the PnL chart, the swap flow, the stake flow) are the highest-value pixels on the page. Marketing copy supports them, not the other way around.

4. **One hierarchy, not three.** Each scroll should have one unambiguous center of gravity — never two competing heroes, two bento grids, two product tours. Pick one; cut the rest.

5. **Calm motion, loud typography.** The homepage's energy should come from typographic scale and negative space, not from animation. Motion marks transitions; it doesn't decorate surfaces.

6. **Accessibility is non-negotiable.** Meet WCAG AA contrast on all text. Respect `prefers-reduced-motion`. Provide keyboard navigation for interactive elements (hero tabs currently fail this). Never trap users in motion they can't opt out of.
