"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cover } from "@/components/Cover";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { Reveal } from "@/components/Reveal";
import { AdvanceButton, ChoiceButton } from "@/components/ui/Buttons";
import { RequestReceipt } from "@/components/eggs/RequestReceipt";
import { useSequence, useTimedReveal } from "@/hooks/useTimedReveal";
import { READING_FOR } from "@/data/tracks";
import type { FinalAnswer, Track } from "@/types/track";

interface Props {
  track: Track;
  answer: FinalAnswer | null;
  onAnswer: (answer: FinalAnswer) => void;
  onAdvance: () => void;
}

/** As três frases antes da pergunta. Cada uma com sua pausa. */
const buildUp = [
  "Eu poderia escrever um textão explicando por que essa foi a última.",
  "Mas acho que a escolha já fala o suficiente.",
  "Então vou fazer uma pergunta mais simples.",
];

const BEATS = [500, 3200, 5800, 8000, 10200];

const options: { value: FinalAnswer; label: string; primary: boolean }[] = [
  { value: "quero", label: "quero ♡", primary: true },
  { value: "depende", label: "depende… onde? 👀", primary: false },
];

/** A primeira reação. O resto vem no recibo. */
const responses: Record<FinalAnswer, string> = {
  quero: "essa foi surpreendentemente fácil.",
  depende: "pergunta justa.",
};

/**
 * Carta VII. Aqui a leitura perde a grade e perde a vontade de disfarçar.
 * Só o numeral, a capa, a música e uma pergunta.
 */
export function FinalQuestion({
  track,
  answer,
  onAnswer,
  onAdvance,
}: Props) {
  const reduce = useReducedMotion();
  const beat = useSequence(BEATS);
  const answered = answer !== null;

  const afterFirst = useTimedReveal(1200, answered);
  const afterSecond = useTimedReveal(3000, answered);
  const canLeave = useTimedReveal(9000, answered);

  const questionLanded = beat >= 4;

  return (
    <section
      aria-label={`Carta 7 de 7: ${track.title}, de ${track.artist}`}
      className="min-h-screen-ios flex flex-col items-center justify-center px-6 py-20 text-center sm:py-14"
    >
      <motion.p
        className="mb-7 font-serif text-2xl tracking-arcana text-petal-light/75 sm:text-3xl"
        style={{ textShadow: "0 0 28px rgba(217,74,140,0.5)" }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.25 : 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {track.numeral}
      </motion.p>

      <Cover track={track} maxWidth={280} glow={1.25} />

      <motion.div
        className="mt-8 flex flex-col items-center"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.25 : 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-serif text-3xl leading-tight text-cream sm:text-[2.6rem]">
          {track.title}
        </h2>
        <p className="mt-1.5 text-sm text-mauve sm:text-base">{track.artist}</p>

        <div className="mt-7 w-full max-w-[420px]">
          <SpotifyPlayer track={track} autoPlay />
        </div>
      </motion.div>

      <div
        className="mt-9 flex w-full max-w-[44ch] flex-col items-center"
        aria-live="polite"
      >
        {/* As frases de apoio saem de cena quando a pergunta chega — a tela
            vai ficando mais vazia à medida que a coisa fica mais séria.
            O colapso é feito em CSS (1fr → 0fr) de propósito: não depende
            de nenhuma animação terminar pra liberar o espaço. */}
        <div
          className="grid w-full transition-[grid-template-rows,opacity,filter] duration-700 ease-cinema"
          style={{
            gridTemplateRows: questionLanded ? "0fr" : "1fr",
            opacity: questionLanded ? 0 : 1,
            filter: questionLanded && !reduce ? "blur(6px)" : "blur(0px)",
          }}
          aria-hidden={questionLanded}
        >
          <div className="flex flex-col items-center gap-4 overflow-hidden">
            {buildUp.map((line, index) => (
              <Reveal key={line} when={beat > index} offset={8}>
                <p className="text-balance font-serif text-lg leading-snug text-cream/85 sm:text-xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal when={questionLanded} delay={700}>
          <p className="text-balance font-serif text-[1.8rem] leading-[1.2] text-cream sm:text-[2.4rem] md:text-[2.8rem]">
            {READING_FOR}, quer ouvir essa playlist comigo algum dia?
          </p>
        </Reveal>

        <Reveal when={beat >= 5} className="mt-9 w-full">
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {options.map((option) => (
              <ChoiceButton
                key={option.value}
                accent={track.accent}
                primary={option.primary}
                onClick={() => onAnswer(option.value)}
                selected={answer === option.value}
                dimmed={answered && answer !== option.value}
                disabled={answered}
              >
                {option.label}
              </ChoiceButton>
            ))}
          </div>
        </Reveal>

        {answer && (
          <>
            <Reveal when={afterFirst} className="mt-9">
              <p className="font-serif text-xl italic text-petal-light sm:text-2xl">
                {responses[answer]}
              </p>
            </Reveal>

            <Reveal when={afterSecond} className="mt-7 w-full">
              <RequestReceipt answer={answer} />
            </Reveal>
          </>
        )}

        <Reveal when={canLeave} className="mt-10">
          <AdvanceButton onClick={onAdvance} label="encerrar a leitura" />
        </Reveal>
      </div>
    </section>
  );
}
