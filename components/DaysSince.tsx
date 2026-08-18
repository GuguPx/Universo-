"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Sprout } from "@/components/eggs/Glyphs";
import { useDaysSince } from "@/hooks/useDaysSince";

export function DaysSince() {
  const reduce = useReducedMotion();
  const days = useDaysSince();
  const [answer, setAnswer] = useState<"percebi" | "serio" | null>(null);

  return (
    <div className="flex w-full flex-col items-center">
      <motion.article
        className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-petal-light/20 bg-ink-soft/55 px-6 py-9 backdrop-blur-xl sm:px-10 sm:py-11"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduce ? 0.2 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          boxShadow:
            "0 0 70px rgba(217,74,140,0.13), inset 0 0 60px rgba(198,155,244,0.025)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-petal/10 blur-3xl"
        />

        <p className="eyebrow">
          registro das cartas Nº{" "}
          <span suppressHydrationWarning>{String(days).padStart(3, "0")}</span>
        </p>

        <h1 className="mt-8 text-balance font-serif text-[2rem] leading-[1.12] text-cream sm:text-[2.65rem]">
          há{" "}
          <span suppressHydrationWarning className="text-aura">
            {days} {days === 1 ? "dia" : "dias"}
          </span>
          , duas pessoas se conheceram.
        </h1>

        <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-mauve/75 sm:text-base">
          <p>uma delas se chama Vitória.</p>
          <p>a outra aparentemente responde por Augusto…</p>
          <p className="font-serif text-lg">
            <span className="mr-2 text-mauve/35 line-through decoration-petal/60">
              Augusto
            </span>
            <span className="inline-flex items-center gap-1.5 text-petal-light">
              Arbusto
              <Sprout size={15} />
            </span>
          </p>
        </div>

        <div className="mt-9 rounded-2xl border border-petal-light/10 bg-ink/35 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[0.62rem] uppercase tracking-widest text-mauve/55">
              probabilidade de flerte detectada
            </span>
            <span className="font-serif text-xl text-petal-light">100%</span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-petal-light/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-wine via-petal to-petal-light"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduce ? 0.2 : 1.8, delay: reduce ? 0 : 0.7 }}
            />
          </div>
        </div>

        <p className="mt-5 font-serif text-xs italic text-mauve/40">
          as cartas alegam que estava óbvio.
        </p>
      </motion.article>

      <motion.p
        className="mt-7 font-mono text-[0.62rem] tracking-wider text-mauve/45 sm:text-[0.68rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduce ? 0 : 1 }}
      >
        desde 24.07.2026
        <span className="mx-2 text-petal/45">•</span>
        <span suppressHydrationWarning>{days} dias</span>
        <span className="mx-2 text-petal/45">•</span>
        <span suppressHydrationWarning>{days * 24} horas</span>
        <span className="mx-2 text-petal/45">•</span>
        decisões questionáveis
      </motion.p>

      <motion.p
        className="mt-10 max-w-[27ch] text-balance font-serif text-[1.55rem] leading-snug text-cream sm:text-[2rem]"
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: reduce ? 0 : 1.25 }}
      >
        e há aproximadamente{" "}
        <span suppressHydrationWarning className="text-petal-light">
          {days} dias
        </span>{" "}
        eu tento descobrir se ela percebeu que estou flertando com ela.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: reduce ? 0 : 2.25 }}
      >
        <p className="text-aura font-serif text-[1.65rem] italic sm:text-[2rem]">
          caso ainda exista alguma dúvida: sim.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 font-serif text-sm italic text-mauve/60">
          — Arbusto <Sprout size={14} />
        </p>
      </motion.div>

      <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setAnswer("percebi")}
          className="min-h-[50px] flex-1 rounded-full border border-petal-light/25 bg-petal/[0.08] px-5 py-3 text-sm text-cream/85 transition-colors hover:border-petal-light/50 hover:bg-petal/[0.15]"
        >
          eu já tinha percebido 👀
        </button>
        <button
          type="button"
          onClick={() => setAnswer("serio")}
          className="min-h-[50px] flex-1 rounded-full border border-lilac/20 bg-lilac/[0.06] px-5 py-3 text-sm text-cream/85 transition-colors hover:border-lilac/45 hover:bg-lilac/[0.12]"
        >
          sério? 😇
        </button>
      </div>

      <div className="mt-6 min-h-[4.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          {answer && (
            <motion.p
              key={answer}
              className="max-w-[34ch] text-balance font-serif text-lg italic leading-relaxed text-petal-light"
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {answer === "percebi" ? (
                "isso é um pouco constrangedor para o Arbusto."
              ) : (
                <>
                  Vitória. por favor.
                  <br />
                  eu fiz literalmente um site.
                </>
              )}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
