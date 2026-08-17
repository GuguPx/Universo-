"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { AdvanceButton } from "@/components/ui/Buttons";
import { SecretCardBack } from "@/components/SecretCard";
import { Sprout } from "@/components/eggs/Glyphs";
import { useTimedReveal } from "@/hooks/useTimedReveal";

interface Props {
  onReveal: () => void;
  /** Avisa a experiência de que a luz rosa já pode baixar. */
  onDim: () => void;
}

/**
 * O final que não é o final. A luz baixa, o site finge que deu erro,
 * e a origem do problema se identifica sozinha.
 */
export function FakeEnding({ onReveal, onDim }: Props) {
  const reduce = useReducedMotion();

  const thanks = useTimedReveal(1600);
  const dim = useTimedReveal(3400);
  const error = useTimedReveal(4600);
  const uncounted = useTimedReveal(6000);
  const origin = useTimedReveal(7400);
  const renamed = useTimedReveal(9400);
  const card = useTimedReveal(11000);
  const button = useTimedReveal(12600);

  // Quando a luz baixa aqui, o fundo inteiro baixa junto.
  useEffect(() => {
    if (dim) onDim();
  }, [dim, onDim]);

  return (
    <section
      aria-label="Fim da leitura"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center"
    >
      <motion.h2
        className="font-serif text-[2rem] leading-tight text-cream sm:text-5xl"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(10px)" }}
        animate={{ opacity: dim ? 0.3 : 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduce ? 0.25 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        fim da leitura.
      </motion.h2>

      <motion.div
        animate={{ opacity: dim ? 0.25 : 1 }}
        transition={{ duration: reduce ? 0.2 : 1.8 }}
      >
        <Reveal when={thanks} className="mt-5">
          <p className="whisper">obrigada por participar.</p>
        </Reveal>
      </motion.div>

      {/* O "defeito". Fonte mono, sem drama. */}
      <Reveal when={error} className="mt-16">
        <p
          className="font-mono text-[0.72rem] uppercase tracking-arcana text-petal"
          style={{ textShadow: "0 0 22px rgba(217,74,140,0.55)" }}
        >
          erro
        </p>
      </Reveal>

      <Reveal when={uncounted} className="mt-5">
        <p className="font-mono text-[0.78rem] lowercase tracking-wide text-mauve">
          uma carta não foi contabilizada.
        </p>
      </Reveal>

      <Reveal when={origin} className="mt-7">
        <div className="font-mono text-[0.78rem] lowercase tracking-wide">
          <p className="text-mauve/60">origem:</p>

          <span className="relative mt-1 inline-flex items-center justify-center">
            <motion.span
              className="text-mauve/60"
              animate={{ opacity: renamed ? 0 : 1 }}
              transition={{ duration: reduce ? 0.15 : 1.1 }}
            >
              desconhecida
            </motion.span>

            <motion.span
              className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap text-petal-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: renamed ? 1 : 0 }}
              transition={{
                duration: reduce ? 0.15 : 1.2,
                delay: renamed ? 0.7 : 0,
              }}
            >
              arbusto
              <Sprout size={13} className="text-petal-light" />
            </motion.span>
          </span>

          <span className="sr-only">
            origem: desconhecida, depois identificada como arbusto
          </span>
        </div>
      </Reveal>

      <Reveal when={card} className="mt-12 flex flex-col items-center">
        <p className="sigil mb-5 text-lg">✦</p>
        <SecretCardBack />
        <p className="mt-6 font-serif text-lg italic text-petal-light sm:text-xl">
          uma última carta
        </p>
      </Reveal>

      <Reveal when={button} className="mt-9">
        <AdvanceButton
          onClick={onReveal}
          label="revelar"
          sigil="♡"
          primary
        />
      </Reveal>
    </section>
  );
}
