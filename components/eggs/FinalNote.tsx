"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Sprout } from "@/components/eggs/Glyphs";
import { useTimedReveal } from "@/hooks/useTimedReveal";
import { READING_FOR } from "@/data/tracks";

/**
 * O último easter egg do site inteiro. A tela limpa: sem carta, sem
 * player, sem efeito. Aqui não é mais a leitura falando.
 */
export function FinalNote() {
  const reduce = useReducedMotion();
  // Depois de um segundo, "Augusto" vira "Arbusto".
  const renamed = useTimedReveal(11900);
  const heart = useTimedReveal(13600);

  return (
    <section
      aria-label="um recado do Arbusto"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center"
    >
      <div className="flex w-full max-w-[34ch] flex-col items-center" aria-live="polite">
        <Reveal delay={900}>
          <p className="font-serif text-[1.9rem] leading-tight text-cream sm:text-4xl">
            oi, {READING_FOR}.
          </p>
        </Reveal>

        <Reveal delay={2800} className="mt-7">
          <p className="text-[0.95rem] leading-relaxed text-mauve">
            dessa vez não é nenhuma carta falando.
          </p>
        </Reveal>

        <Reveal delay={4300} className="mt-2">
          <p className="font-serif text-xl italic text-petal-light sm:text-2xl">
            sou eu mesmo.
          </p>
        </Reveal>

        <Reveal delay={6200} className="mt-9">
          <p className="text-balance font-serif text-[1.3rem] leading-snug text-cream sm:text-[1.55rem]">
            só queria deixar escondido aqui que eu acho você um amor de pessoa.
          </p>
        </Reveal>

        <Reveal delay={8600} className="mt-6">
          <p className="text-balance text-[0.88rem] leading-relaxed text-mauve">
            e aparentemente achei razoável fazer um site inteiro em vez de
            simplesmente falar isso normalmente.
          </p>
        </Reveal>

        <Reveal delay={10300} className="mt-9">
          <p className="whisper">enfim…</p>
        </Reveal>

        {/* A assinatura se corrige sozinha. */}
        <Reveal delay={10900} className="mt-5">
          <p className="relative inline-flex items-center gap-1.5 font-serif text-xl text-cream sm:text-2xl">
            <span aria-hidden="true">—</span>
            <span className="relative inline-flex items-center">
              <motion.span
                className="relative"
                animate={{ opacity: renamed ? 0 : 1 }}
                transition={{ duration: reduce ? 0.15 : 0.7 }}
              >
                Augusto
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-px bg-petal"
                  initial={{ width: 0 }}
                  animate={{ width: renamed ? "100%" : 0 }}
                  transition={{ duration: reduce ? 0.1 : 0.45 }}
                />
              </motion.span>

              <motion.span
                className="absolute left-0 inline-flex items-center gap-1.5 whitespace-nowrap text-petal-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: renamed ? 1 : 0 }}
                transition={{ duration: reduce ? 0.15 : 0.8, delay: renamed ? 0.4 : 0 }}
              >
                Arbusto
                <Sprout size={17} className="text-petal-light" />
              </motion.span>
            </span>
            <span className="sr-only">— Augusto, ou melhor, Arbusto</span>
          </p>
        </Reveal>

        <Reveal when={heart} className="mt-14">
          <p
            className="text-3xl text-petal"
            aria-label="um coração"
            style={{ textShadow: "0 0 30px rgba(217,74,140,0.75)" }}
          >
            ♡
          </p>
        </Reveal>
      </div>
    </section>
  );
}
