"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bow, Sparkle } from "@/components/eggs/Glyphs";
import { useEggs } from "@/components/eggs/EasterEggProvider";

/** Uma fala por laço encontrado. */
const lines = [
  "você encontrou um lacinho.",
  "dois.",
  "você realmente vai procurar todos, né?",
];

/**
 * Um laço escondido perto das mensagens. São três no site inteiro —
 * brincadeira secundária, nunca no caminho da narrativa.
 */
export function BowSpot({ id, className = "" }: { id: string; className?: string }) {
  const { collectBow, hasBow, bowsFound } = useEggs();
  const [line, setLine] = useState<string | null>(null);
  const found = hasBow(id);

  const onClick = () => {
    if (found) return;
    const index = Math.min(bowsFound, lines.length - 1);
    setLine(lines[index]);
    collectBow(id);
  };

  const complete = bowsFound >= 3;

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={onClick}
        aria-label={found ? "lacinho encontrado" : "um lacinho"}
        className={`-m-2.5 rounded-full p-2.5 transition-colors duration-500 ${
          found ? "text-petal/70" : "glyph-secret"
        }`}
      >
        <Bow size={16} />
      </button>

      <AnimatePresence>
        {line && !complete && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="ml-2 whitespace-nowrap font-serif text-[0.72rem] italic text-petal-light/75"
          >
            {line}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {line && complete && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ml-2 inline-flex flex-col items-start gap-0.5 text-left"
          >
            <span className="font-serif text-[0.8rem] text-petal-light">
              coleção concluída ♡
            </span>
            <span className="whisper text-[0.68rem]">
              prêmio absolutamente oficial: uma estrelinha do Arbusto.
            </span>
            <motion.span
              className="mt-0.5 text-petal"
              animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 180] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkle size={15} />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
