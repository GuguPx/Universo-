"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useTimedReveal } from "@/hooks/useTimedReveal";

interface RevealProps {
  children: ReactNode;
  /** Espera antes de aparecer, em ms. */
  delay?: number;
  /** Enquanto false, nada é montado e o cronômetro fica zerado. */
  when?: boolean;
  className?: string;
  /** Deslocamento vertical inicial, em px. */
  offset?: number;
  as?: "div" | "p" | "span" | "li";
}

/**
 * Texto que chega em foco em vez de simplesmente ligar.
 * Com prefers-reduced-motion o atraso continua (é ritmo, não enfeite),
 * mas o blur e o deslocamento somem.
 */
export function Reveal({
  children,
  delay = 0,
  when = true,
  className,
  offset = 10,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const visible = useTimedReveal(delay, when);
  const MotionTag = motion[as];

  return (
    <AnimatePresence>
      {visible ? (
        <MotionTag
          className={className}
          initial={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: offset, filter: "blur(8px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: reduce ? 0.2 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </MotionTag>
      ) : null}
    </AnimatePresence>
  );
}
