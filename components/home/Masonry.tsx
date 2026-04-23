"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";

import "./Masonry.css";

export type MasonryItem = {
  id: string;
  label: string;
  icon: string;
  title: string;
  body?: string;
  height: number;
  accent?: string;
};

type AnimateFrom = "top" | "bottom" | "left" | "right" | "center" | "random";

type MasonryProps = {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: AnimateFrom;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
};

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    setValue(get());
    const handler = () => setValue(get());

    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));

    return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler));
  }, [queries]);

  return value;
};

const useMeasure = (dep: unknown = null): [React.RefObject<HTMLDivElement>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      setSize({ width, height });
    });

    ro.observe(ref.current);

    return () => ro.disconnect();
  }, [dep]);

  return [ref, size];
};

const MasonryCardContent = ({ item, index }: { item: MasonryItem; index: number }): JSX.Element => (
  <div className="masonry-card">
    <div
      aria-hidden
      className="masonry-glow"
      style={{
        background: item.accent ?? "radial-gradient(circle, rgba(218,165,32,0.35) 0%, transparent 70%)",
      }}
    />
    <div className="relative flex items-start justify-between">
      <div className="masonry-icon">
        <Icon icon={item.icon} />
      </div>
      <span className="masonry-index">{String(index + 1).padStart(2, "0")}</span>
    </div>

    <div className="mt-6">
      <h3 className="masonry-title">{item.title}</h3>
      {item.body ? <p className="masonry-body">{item.body}</p> : null}
    </div>
  </div>
);

export const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
}: MasonryProps): JSX.Element => {
  const columns = useMedia(["(min-width:1280px)", "(min-width:1024px)", "(min-width:720px)", "(min-width:480px)"], [4, 3, 3, 2], 1);
  const isMobileScroll = columns === 1;

  const [containerRef, { width }] = useMeasure(isMobileScroll);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitialPosition = (item: { x: number; y: number; w: number; h: number }) => {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions: AnimateFrom[] = ["top", "bottom", "left", "right"];

      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: (typeof window !== "undefined" ? window.innerHeight : 800) + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: (typeof window !== "undefined" ? window.innerWidth : 1200) + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  const grid = useMemo(() => {
    if (!width) return [] as Array<MasonryItem & { x: number; y: number; w: number; h: number }>;

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const totalHeight = useMemo(() => {
    if (!grid.length) return 0;

    return Math.max(...grid.map((g) => g.y + g.h));
  }, [grid]);

  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (!mounted || !width || isMobileScroll) return;

    grid.forEach((item, index) => {
      const selector = `[data-masonry-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasAnimated.current) {
        const initial = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initial.x,
          y: initial.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: 0.8,
          ease: "power3.out",
          delay: index * stagger,
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasAnimated.current = true;
  }, [grid, mounted, width, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (item: MasonryItem) => {
    if (!scaleOnHover) return;
    gsap.to(`[data-masonry-key="${item.id}"]`, {
      scale: hoverScale,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (item: MasonryItem) => {
    if (!scaleOnHover) return;
    gsap.to(`[data-masonry-key="${item.id}"]`, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    const el = scrollRef.current;
    const track = indicatorRef.current;
    const thumb = thumbRef.current;

    if (!el || !track || !thumb) return;

    if (el.scrollWidth <= el.clientWidth + 1) {
      track.style.opacity = "0";

      return;
    }

    track.style.opacity = "1";

    const visibleFraction = el.clientWidth / el.scrollWidth;
    const thumbWidth = Math.max(visibleFraction, 0.18);
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    const thumbLeft = progress * (1 - thumbWidth);

    thumb.style.width = `${thumbWidth * 100}%`;
    thumb.style.left = `${thumbLeft * 100}%`;
  }, []);

  useEffect(() => {
    if (!isMobileScroll) return;
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [isMobileScroll, items.length, updateIndicator]);

  if (isMobileScroll) {
    return (
      <div className="masonry-netflix-wrap">
        <div
          ref={scrollRef}
          aria-label="Product features"
          className="masonry-list masonry-list--netflix"
          role="region"
          onScroll={updateIndicator}>
          {items.map((item, i) => (
            <div key={item.id} className="masonry-item-wrapper masonry-item-wrapper--netflix">
              <MasonryCardContent index={i} item={item} />
            </div>
          ))}
        </div>
        <div ref={indicatorRef} aria-hidden="true" className="masonry-scroll-indicator">
          <div ref={thumbRef} className="masonry-scroll-indicator__thumb" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="masonry-list" style={{ height: totalHeight }}>
      {grid.map((item, i) => (
        <div
          key={item.id}
          className="masonry-item-wrapper"
          data-masonry-key={item.id}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={() => handleMouseLeave(item)}>
          <MasonryCardContent index={i} item={item} />
        </div>
      ))}
    </div>
  );
};

export default Masonry;
