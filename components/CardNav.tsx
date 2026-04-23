"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

import MetallicPaint from "@/components/ui/MetallicPaint";

import "./CardNav.css";

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

type CardNavProps = {
  logo: string;
  logoAlt?: string;
  wordmark?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  menuColor?: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  rightContent?: ReactNode;
};

const ArrowIcon = () => (
  <svg
    aria-hidden="true"
    className="nav-card-link-icon"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const CardNav = ({
  logo,
  logoAlt = "Logo",
  wordmark,
  items,
  className = "",
  ease = "power3.out",
  menuColor = "#ffffff",
  cta,
  rightContent,
}: CardNavProps): JSX.Element => {
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = (): number => {
    const navEl = navRef.current;

    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const contentEl = navEl.querySelector<HTMLElement>(".card-nav-content");

      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        // force reflow
        void contentEl.offsetHeight;

        const topBar = 58;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }

    return 260;
  };

  const createTimeline = (): gsap.core.Timeline | null => {
    const navEl = navRef.current;

    if (!navEl) return null;

    const collapsedHeight = window.matchMedia("(max-width: 768px)").matches ? 58 : 64;

    gsap.set(navEl, { height: collapsedHeight, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, "-=0.1");

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();

    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();

        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();

        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();

        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;

    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const closeMenu = () => {
    const tl = tlRef.current;

    if (!tl || !isExpanded) return;
    setIsHamburgerOpen(false);
    tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
    tl.reverse();
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el;
  };

  const isActive = (href: string): boolean => {
    if (!href.startsWith("/")) return false;
    if (href === "/") return pathname === "/";

    return pathname.startsWith(href);
  };

  const trackNav = (label: string, href: string) => {
    track("nav_click", { label, href, location: "card_nav" });
  };

  const renderCta = () => {
    if (!cta) return null;
    const extraProps = cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
      <a className="card-nav-cta-button" href={cta.href} onClick={() => trackNav(cta.label, cta.href)} {...extraProps}>
        {cta.label}
        <svg
          aria-hidden="true"
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          width="14">
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </svg>
      </a>
    );
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef as React.RefObject<HTMLElement>} className={`card-nav ${isExpanded ? "open" : ""}`}>
        <div className="card-nav-top">
          <button
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            style={{ color: menuColor }}
            type="button"
            onClick={toggleMenu}>
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

          <NextLink className="logo-container" href="/" onClick={closeMenu}>
            <span aria-label={logoAlt} className="logo" role="img">
              <MetallicPaint
                angle={0}
                blur={0.015}
                brightness={2.3}
                chromaticSpread={2}
                contour={0.25}
                contrast={0.75}
                darkColor="#FFFFFF"
                distortion={1}
                fresnel={1}
                imageSrc={logo}
                lightColor="#FFFFFF"
                liquid={0.75}
                mouseAnimation={false}
                noiseScale={0.5}
                patternSharpness={1}
                refraction={0.01}
                scale={3}
                seed={42}
                speed={0.3}
                tintColor="#FFD700"
                waveAmplitude={1}
              />
            </span>
            {wordmark ? <span className="logo-wordmark">{wordmark}</span> : null}
          </NextLink>

          <div className="card-nav-right">
            {rightContent ? <div className="card-nav-right-desktop-only">{rightContent}</div> : null}
            {renderCta()}
          </div>
        </div>

        <div aria-hidden={!isExpanded} className="card-nav-content">
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="nav-card"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}>
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((lnk, i) => {
                  const active = isActive(lnk.href);
                  const content = (
                    <>
                      <ArrowIcon />
                      {lnk.label}
                    </>
                  );
                  const onClick = () => {
                    trackNav(lnk.label, lnk.href);
                    closeMenu();
                  };

                  if (lnk.external || !lnk.href.startsWith("/")) {
                    return (
                      <a
                        key={`${lnk.label}-${i}`}
                        aria-label={lnk.ariaLabel ?? lnk.label}
                        className={`nav-card-link ${active ? "active" : ""}`}
                        href={lnk.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        onClick={onClick}>
                        {content}
                      </a>
                    );
                  }

                  return (
                    <NextLink
                      key={`${lnk.label}-${i}`}
                      aria-label={lnk.ariaLabel ?? lnk.label}
                      className={`nav-card-link ${active ? "active" : ""}`}
                      href={lnk.href}
                      onClick={onClick}>
                      {content}
                    </NextLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
