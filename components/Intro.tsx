"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Headphones } from "lucide-react";
import { AdvanceButton } from "@/components/ui/Buttons";
import { QuemillyName } from "@/components/eggs/QuemillyName";

interface Props {
  onStart: () => void;
}

const lines = [
  "7 músicas.",
  "algumas cartas.",
  "uma quantidade suspeita de coincidências.",
];

export function Intro({ onStart }: Props) {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: reduce ? 0.25 : 1.1,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section
      aria-label="Início da leitura"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center"
    >
      {/* A aura grande que fica atrás de tudo nesta primeira tela. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-haloPulse rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(217,74,140,0.28), rgba(113,26,70,0.16) 55%, transparent 78%)",
        }}
      />

      <motion.p
        className="sigil mb-9 text-3xl sm:mb-12 sm:text-4xl"
        {...fadeUp(0.1)}
      >
        ✦
      </motion.p>

      <motion.h1
        className="max-w-[17ch] text-balance font-serif text-[2rem] leading-[1.15] text-cream sm:max-w-[20ch] sm:text-5xl md:text-[3.3rem]"
        {...fadeUp(0.3)}
      >
        uma leitura que eu provavelmente não deveria estar fazendo
      </motion.h1>

      <motion.p
        className="mt-6 font-serif text-lg italic text-petal-light sm:text-xl"
        style={{ textShadow: "0 0 26px rgba(217,74,140,0.45)" }}
        {...fadeUp(0.85)}
      >
        <QuemillyName />
      </motion.p>

      <div className="mt-9 space-y-1.5 sm:mt-11">
        {lines.map((line, index) => (
          <motion.p
            key={line}
            className="whisper"
            {...fadeUp(1.35 + index * 0.22)}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div className="mt-11 sm:mt-13" {...fadeUp(2.15)}>
        <AdvanceButton onClick={onStart} label="tirar a primeira carta" primary />
      </motion.div>

      <motion.p
        className="mt-7 flex items-center gap-2 text-[0.72rem] text-mauve/45"
        {...fadeUp(2.5)}
      >
        <Headphones aria-hidden="true" className="h-3.5 w-3.5" />
        use fones. fica melhor assim.
      </motion.p>
    </section>
  );
}
