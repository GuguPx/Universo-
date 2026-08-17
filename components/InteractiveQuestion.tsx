"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ChoiceButton } from "@/components/ui/Buttons";
import { ScienceCard } from "@/components/eggs/ScienceCard";
import type { TelepatiaAnswer } from "@/types/track";

interface Props {
  accent: string;
  answer: TelepatiaAnswer | null;
  onAnswer: (answer: TelepatiaAnswer) => void;
}

const options: { value: TelepatiaAnswer; label: string }[] = [
  { value: "talvez", label: "talvez 👀" },
  { value: "definitivamente", label: "definitivamente ✦" },
];

/** Não existe resposta errada — só reações diferentes. */
const reactions: Record<TelepatiaAnswer, string[]> = {
  talvez: ["as cartas odeiam respostas vagas."],
  definitivamente: ["interessante.", "a sacerdotisa gostaria de registrar isso."],
};

export function InteractiveQuestion({ accent, answer, onAnswer }: Props) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
        {options.map((option) => (
          <ChoiceButton
            key={option.value}
            accent={accent}
            onClick={() => onAnswer(option.value)}
            selected={answer === option.value}
            dimmed={answer !== null && answer !== option.value}
            disabled={answer !== null}
          >
            {option.label}
          </ChoiceButton>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {answer && (
          <motion.p
            key={answer}
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-serif text-lg italic text-petal-light sm:text-xl"
          >
            {reactions[answer][0]}
          </motion.p>
        )}
      </AnimatePresence>

      {answer && reactions[answer][1] && (
        <Reveal when delay={1500} className="mt-2">
          <p className="font-serif text-[1.15rem] leading-snug text-cream sm:text-xl">
            {reactions[answer][1]}
          </p>
        </Reveal>
      )}

      {/* A "análise" da resposta. Aparece só depois de ela escolher. */}
      {answer && (
        <Reveal when delay={2600} className="mt-7 w-full">
          <ScienceCard answer={answer} />
        </Reveal>
      )}
    </div>
  );
}
