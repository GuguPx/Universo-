"use client";

import { AnimatePresence, motion } from "framer-motion";
import { withAlpha } from "@/lib/color";

interface Props {
  accent: string;
  accentSecondary: string;
  /** Sobe conforme a leitura esquenta. 1 = normal, ~1.6 no final. */
  intensity?: number;
}

/**
 * Luz ambiente rosa num quarto escuro. Duas auras grandes que passeiam
 * muito devagar, mais um brilho lilás no alto. O preto do fundo existe
 * só pra deixar o rosa acender.
 */
export function BackgroundGradient({
  accent,
  accentSecondary,
  intensity = 1,
}: Props) {
  const clamp = (value: number) => Math.min(value, 0.42);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
      style={
        {
          "--accent": accent,
          "--accent-2": accentSecondary,
        } as React.CSSProperties
      }
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={`${accent}-${accentSecondary}-${intensity}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <div
            className="absolute -inset-[25%] animate-auraA"
            style={{
              background: `radial-gradient(circle at 24% 22%, ${withAlpha(
                accent,
                clamp(0.2 * intensity),
              )}, transparent 42%)`,
            }}
          />
          <div
            className="absolute -inset-[25%] animate-auraB"
            style={{
              background: `radial-gradient(circle at 78% 72%, ${withAlpha(
                accentSecondary,
                clamp(0.24 * intensity),
              )}, transparent 46%)`,
            }}
          />
          {/* Um respiro de luz bem no alto, como se viesse de fora do quadro. */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 55% at 50% -12%, ${withAlpha(
                accent,
                clamp(0.14 * intensity),
              )}, transparent 60%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Vinheta: puxa o olho pro centro e protege a legibilidade. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_32%,rgba(5,2,4,0.82)_100%)]" />

      <div className="grain absolute inset-0 opacity-[0.14] mix-blend-soft-light" />
    </div>
  );
}
