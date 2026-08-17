"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "@/components/eggs/Glyphs";
import { useEggs } from "@/components/eggs/EasterEggProvider";

const steps = [
  "você continua clicando em coisas que não deveria.",
  "perigoso.",
  "tá bom.",
];

/**
 * O coração da carta V. Quem só passa reto vê um enfeite; quem insiste
 * três vezes recebe a frase que não aparece pra mais ninguém.
 */
export function SecretHeart() {
  const { pushSymbol } = useEggs();
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const line =
    clicks > 0 && clicks <= steps.length ? steps[clicks - 1] : null;

  // Depois de "tá bom.", a frase final chega sozinha.
  useEffect(() => {
    if (clicks < steps.length) return;
    const timer = window.setTimeout(() => setRevealed(true), 900);
    return () => window.clearTimeout(timer);
  }, [clicks]);

  return (
    <div className="flex flex-col items-center md:items-start">
      <button
        type="button"
        onClick={() => {
          pushSymbol("heart");
          setClicks((current) => Math.min(current + 1, steps.length));
        }}
        aria-label="um coração"
        className="-m-2 rounded-full p-2 text-petal/45 transition-colors duration-500 hover:text-petal focus-visible:text-petal"
        style={{ filter: "drop-shadow(0 0 12px rgba(217,74,140,0.5))" }}
      >
        <Heart size={22} />
      </button>

      <AnimatePresence mode="wait">
        {line && !revealed && (
          <motion.p
            key={line}
            role="status"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-3 font-serif text-[0.8rem] italic text-petal-light/75"
          >
            {line}
          </motion.p>
        )}
      </AnimatePresence>

      {revealed && (
        <motion.p
          role="status"
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-[26ch] text-balance font-serif text-[1.15rem] leading-snug text-petal-light sm:text-[1.3rem]"
        >
          talvez você seja uma das minhas partes favoritas dessa história.
        </motion.p>
      )}
    </div>
  );
}
