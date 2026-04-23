"use client";

import type { ComponentProps, Ref } from "react";
import type { Transition, motion as motionNamespace } from "framer-motion";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./RotatingText.css";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

type StaggerFrom = "first" | "last" | "center" | "random" | number;

export type RotatingTextHandle = {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
};

export type RotatingTextProps = {
  texts: string[];
  transition?: Transition;
  initial?: ComponentProps<typeof motionNamespace.span>["initial"];
  animate?: ComponentProps<typeof motionNamespace.span>["animate"];
  exit?: ComponentProps<typeof motionNamespace.span>["exit"];
  animatePresenceMode?: "wait" | "sync" | "popLayout";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
};

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }

  return Array.from(text);
};

const RotatingTextInner = (props: RotatingTextProps, ref: Ref<RotatingTextHandle>) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex] ?? "";

    if (splitBy === "characters") {
      const words = currentText.split(" ");

      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }

    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }

    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2);

        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalChars);

        return Math.abs(randomIndex - index) * staggerDuration;
      }

      return Math.abs((staggerFrom as number) - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;

    if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;

    if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));

      if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) handleIndexChange(0);
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);

    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span layout className={cn("text-rotate", mainClassName)} transition={transition}>
      <span className="text-rotate-sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence initial={animatePresenceInitial} mode={animatePresenceMode}>
        <motion.span
          key={currentTextIndex}
          layout
          aria-hidden="true"
          className={cn(splitBy === "lines" ? "text-rotate-lines" : "text-rotate")}>
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
            const totalChars = array.reduce((sum, word) => sum + word.characters.length, 0);

            return (
              <span key={wordIndex} className={cn("text-rotate-word", splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    animate={animate}
                    className={cn("text-rotate-element", elementLevelClassName)}
                    exit={exit}
                    initial={initial}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(previousCharsCount + charIndex, totalChars),
                    }}>
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace ? <span className="text-rotate-space"> </span> : null}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

const RotatingText = forwardRef<RotatingTextHandle, RotatingTextProps>(RotatingTextInner);

RotatingText.displayName = "RotatingText";

export default RotatingText;
