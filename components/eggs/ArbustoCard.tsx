"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sprout } from "@/components/eggs/Glyphs";
import { TarotCorners } from "@/components/TarotOrnaments";

const stats = [
  ["elemento", "provavelmente terra"],
  ["especialidade", "criar sites desnecessariamente elaborados"],
  ["fraqueza", "aparentemente uma certa Quemilly"],
  ["raridade", "questionável"],
];

/**
 * Uma carta que não existe em tarot nenhum. Fica escondida atrás de uma
 * plantinha minúscula numa das cartas; clicando, ela vira e se apresenta,
 * e depois de alguns segundos volta ao normal como se nada tivesse
 * acontecido.
 */
export function ArbustoCard() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!flipped) return;
    const timer = window.setTimeout(() => setFlipped(false), 9000);
    return () => window.clearTimeout(timer);
  }, [flipped]);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setFlipped(true)}
        aria-label="uma plantinha escondida nesta carta"
        aria-expanded={flipped}
        className="-m-2.5 rounded-full p-2.5 text-petal-light/20 transition-colors duration-500 hover:text-petal-light/80 focus-visible:text-petal-light"
      >
        <Sprout size={15} />
      </button>

      <AnimatePresence>
        {flipped && (
          <motion.div
            className="absolute bottom-full left-1/2 z-40 mb-3 w-[236px] max-w-[calc(100vw-2.5rem)] -translate-x-1/2"
            initial={{ opacity: 0, rotateY: reduce ? 0 : -90, scale: 0.92 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: reduce ? 0 : 90, scale: 0.94 }}
            transition={{ duration: reduce ? 0.25 : 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 900 }}
          >
            <div
              className="relative rounded-2xl border border-petal-light/40 px-5 py-5 text-center"
              style={{
                background:
                  "linear-gradient(165deg, #330C1F 0%, #170812 55%, #240A18 100%)",
                boxShadow:
                  "0 0 44px rgba(217,74,140,0.26), 0 20px 50px rgba(5,2,4,0.9)",
              }}
            >
              <TarotCorners inset="7px" size={13} />

              <Sprout size={26} className="mx-auto text-petal-light" />

              <p className="mt-2.5 font-serif text-xl text-cream">O Arbusto</p>

              <dl className="mt-4 space-y-2 text-left">
                {stats.map(([label, value]) => (
                  <div key={label}>
                    <dt className="font-mono text-[0.58rem] uppercase tracking-widestx text-petal-light/55">
                      {label}
                    </dt>
                    <dd className="text-[0.72rem] leading-snug text-mauve">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-petal">♡</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
