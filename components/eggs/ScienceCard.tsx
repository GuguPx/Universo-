"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TarotCorners } from "@/components/TarotOrnaments";
import { Sprout } from "@/components/eggs/Glyphs";
import type { TelepatiaAnswer } from "@/types/track";

const readings: Record<
  TelepatiaAnswer,
  { percent: number; filled: number; message: string; withSprout: boolean }
> = {
  talvez: {
    percent: 82,
    filled: 8,
    message: "as cartas acham que você sabe mais do que está admitindo.",
    withSprout: false,
  },
  definitivamente: {
    percent: 100,
    filled: 10,
    message: "Arbusto gostaria de registrar oficialmente essa informação.",
    withSprout: true,
  },
};

/**
 * O resultado da "análise". A barra é feita de blocos de texto mesmo —
 * fica com cara de terminal antigo, que é a piada.
 */
export function ScienceCard({ answer }: { answer: TelepatiaAnswer }) {
  const reduce = useReducedMotion();
  const reading = readings[answer];

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[19rem] rounded-2xl border border-petal-light/30 px-5 py-5 text-center md:mx-0"
      style={{
        background:
          "linear-gradient(165deg, rgba(42,10,26,0.9), rgba(20,8,16,0.9))",
        boxShadow: "0 0 36px rgba(217,74,140,0.16)",
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduce ? 0.25 : 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <TarotCorners inset="7px" size={13} />

      <p className="font-mono text-[0.6rem] uppercase tracking-widestx text-petal-light/60">
        leitura extremamente científica
      </p>

      <p className="mt-4 text-[0.68rem] uppercase tracking-widest text-mauve/70">
        nível de suspeita
      </p>

      <p
        className="mt-1.5 font-mono text-[0.95rem] tracking-tight text-petal"
        aria-label={`nível de suspeita: ${reading.percent} por cento`}
      >
        <span aria-hidden="true">
          {"█".repeat(reading.filled)}
          <span className="text-petal-light/20">
            {"░".repeat(10 - reading.filled)}
          </span>{" "}
          {reading.percent}%
        </span>
      </p>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-balance text-[0.78rem] leading-snug text-cream/85">
        {reading.message}
        {reading.withSprout && (
          <Sprout size={13} className="shrink-0 text-petal-light" />
        )}
      </p>
    </motion.div>
  );
}
