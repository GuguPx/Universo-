"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkle } from "@/components/eggs/Glyphs";
import { READING_FOR } from "@/data/tracks";

/**
 * O nome dela na abertura. Clicar solta uma estrelinha, depois um
 * coração, e no terceiro toque entrega o motivo — e some de novo.
 */
export function QuemillyName() {
  const reduce = useReducedMotion();
  const [clicks, setClicks] = useState(0);
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    if (clicks < 3) return;
    setShowLine(true);
    const timer = window.setTimeout(() => setShowLine(false), 5200);
    return () => window.clearTimeout(timer);
  }, [clicks]);

  const marks = ["✦", "♡"];

  return (
    <span className="relative inline-flex flex-col items-center">
      <span className="inline-flex items-baseline">
        <span>para&nbsp;</span>
        <button
          type="button"
          onClick={() => setClicks((current) => current + 1)}
          aria-label={`${READING_FOR} — toque para uma surpresa`}
          className="relative rounded-md px-0.5 underline decoration-petal/40 decoration-1 underline-offset-[6px] transition-colors duration-500 hover:decoration-petal"
        >
          {READING_FOR}
        </button>
        <span>.</span>

        {/* Cada clique deixa uma marquinha subindo. */}
        <AnimatePresence>
          {clicks > 0 && clicks <= marks.length && (
            <motion.span
              key={clicks}
              aria-hidden="true"
              className="pointer-events-none absolute -top-1 right-0 text-petal-light"
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], y: -34, scale: 1.1 }}
              transition={{ duration: reduce ? 0.3 : 1.8, ease: "easeOut" }}
            >
              {marks[clicks - 1]}
            </motion.span>
          )}
        </AnimatePresence>

        {clicks >= 3 && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -right-5 -top-2 text-petal"
            animate={{ rotate: [0, 180, 360], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkle size={13} />
          </motion.span>
        )}
      </span>

      <AnimatePresence>
        {showLine && (
          <motion.span
            role="status"
            className="absolute top-full mt-3 w-[22rem] max-w-[80vw] text-[0.78rem] not-italic leading-snug text-petal-light/85"
            initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            sim, essa parte foi feita especialmente pra você.
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
