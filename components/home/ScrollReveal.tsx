"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
};

const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

export const ScrollReveal = ({ children, className, delay = 0, direction = "up", duration = 0.7, once = true }: ScrollRevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once, amount: 0.15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}>
      {children}
    </motion.div>
  );
};
