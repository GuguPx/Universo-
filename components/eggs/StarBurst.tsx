"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkle } from "@/components/eggs/Glyphs";

/**
 * Chuvinha de estrelas rosa. Some sozinha — é só um "achou!" visual,
 * não uma tela de comemoração.
 */
export function StarBurst({ count = 18 }: { count?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const distance = 120 + (index % 5) * 46;

        return (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 text-petal-light"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0.4, 1, 0.6],
              rotate: index % 2 ? 90 : -90,
            }}
            transition={{
              duration: 1.6 + (index % 4) * 0.25,
              ease: [0.16, 1, 0.3, 1],
              delay: (index % 6) * 0.05,
            }}
          >
            <Sparkle size={index % 3 === 0 ? 16 : 11} />
          </motion.span>
        );
      })}
    </div>
  );
}
