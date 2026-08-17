"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TOTAL_NUMERAL, TOTAL_TRACKS, tracks } from "@/data/tracks";

interface Props {
  /** 1-indexado. */
  current: number;
  visible: boolean;
}

export function ProgressIndicator({ current, visible }: Props) {
  const [taps, setTaps] = useState(0);
  const onLastTrack = current >= TOTAL_TRACKS;
  const secretUnlocked = onLastTrack && taps >= 3;

  // Sair da última carta zera a contagem — o segredo é daquele momento.
  useEffect(() => {
    if (!onLastTrack) setTaps(0);
  }, [onLastTrack]);

  const track = tracks[Math.min(current, TOTAL_TRACKS) - 1];
  const progress = Math.min(current / TOTAL_TRACKS, 1);

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      aria-hidden={!visible}
    >
      {/* Fio de progresso. Fino a ponto de quase não estar lá. */}
      <div className="h-px w-full bg-petal-light/10">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-wine via-petal to-petal-light"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ boxShadow: "0 0 12px rgba(217,74,140,0.6)" }}
        />
      </div>

      <div className="flex items-start justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <button
          type="button"
          onClick={() => setTaps((count) => count + 1)}
          disabled={!visible}
          aria-label={`Carta ${current} de ${TOTAL_TRACKS}`}
          className="pointer-events-auto -m-3 flex items-center gap-2 p-3 font-mono text-[11px] tracking-widestx text-mauve/70 transition-colors duration-500 hover:text-petal-light sm:text-xs"
        >
          <span aria-hidden="true" className="sigil text-[0.85em]">
            {track?.symbol ?? "✦"}
          </span>
          <span aria-hidden="true">
            {track?.numeral ?? "I"}{" "}
            <span className="text-mauve/35">/</span> {TOTAL_NUMERAL}
          </span>
        </button>

        <AnimatePresence>
          {secretUnlocked && (
            <motion.p
              initial={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[55%] text-right font-serif text-[0.72rem] italic leading-snug text-petal-light/55 sm:text-sm"
            >
              eu sabia que essa carta ia entregar tudo.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
