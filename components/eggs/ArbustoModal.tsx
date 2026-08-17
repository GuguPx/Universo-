"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { StarBurst } from "@/components/eggs/StarBurst";
import { Sprout } from "@/components/eggs/Glyphs";
import { TarotCorners } from "@/components/TarotOrnaments";
import { useEggs } from "@/components/eggs/EasterEggProvider";
import { READING_FOR } from "@/data/tracks";

/**
 * A transmissão secreta: digitar "arbusto" no desktop, ou cinco toques
 * rápidos na plantinha no celular.
 */
export function ArbustoModal() {
  const { transmissionOpen, closeTransmission } = useEggs();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!transmissionOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTransmission();
    };

    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 400);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [transmissionOpen, closeTransmission]);

  return (
    <AnimatePresence>
      {transmissionOpen && (
        <>
          <StarBurst />

          <motion.div
            className="pb-safe pt-safe fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              type="button"
              aria-label="fechar"
              onClick={closeTransmission}
              className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="transmissao-titulo"
              className="max-h-screen-ios relative w-full max-w-sm overflow-y-auto rounded-3xl border border-petal-light/30 px-7 py-9 text-center"
              style={{
                background:
                  "linear-gradient(165deg, #2A0A1A 0%, #140810 50%, #1E0713 100%)",
                boxShadow:
                  "0 0 50px rgba(217,74,140,0.24), 0 0 140px rgba(217,74,140,0.1), 0 30px 70px rgba(5,2,4,0.9)",
              }}
              initial={{ opacity: 0, y: 22, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TarotCorners inset="10px" size={16} />

              <p
                id="transmissao-titulo"
                className="sigil font-mono text-[0.7rem] uppercase tracking-widestx"
              >
                ✦ transmissão secreta encontrada ✦
              </p>

              <div className="mt-7 space-y-4" aria-live="polite">
                <Reveal delay={300}>
                  <p className="text-[0.95rem] leading-relaxed text-mauve">
                    aparentemente você descobriu o canal de comunicação do
                    Arbusto.
                  </p>
                </Reveal>

                <Reveal delay={1400}>
                  <p className="font-serif text-2xl text-cream">
                    oi, {READING_FOR}.
                  </p>
                </Reveal>

                <Reveal delay={2900}>
                  <p className="whisper">
                    não faço ideia de como você descobriu isso.
                  </p>
                </Reveal>

                <Reveal delay={4300}>
                  <p className="whisper">mas já que chegou até aqui…</p>
                </Reveal>

                <Reveal delay={5600}>
                  <p className="text-aura font-serif text-[1.45rem] leading-snug">
                    você é um amor de pessoa.
                  </p>
                </Reveal>

                <Reveal delay={7200}>
                  <p className="flex items-center justify-center gap-1.5 pt-2 font-serif text-sm italic text-petal-light">
                    — Arbusto
                    <Sprout size={14} className="text-petal-light" />
                  </p>
                </Reveal>
              </div>

              <Reveal delay={8300} className="mt-8">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeTransmission}
                  className="min-h-[46px] rounded-full border border-petal/60 bg-petal px-7 py-3 text-[0.9rem] text-cream shadow-[0_0_30px_rgba(217,74,140,0.3)] transition-colors duration-500 hover:bg-rosepink"
                >
                  guardar segredo ♡
                </button>
              </Reveal>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
