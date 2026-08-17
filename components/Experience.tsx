"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { EasterEgg } from "@/components/EasterEgg";
import { FakeEnding } from "@/components/FakeEnding";
import { FinalQuestion } from "@/components/FinalQuestion";
import { Intro } from "@/components/Intro";
import { PointerGlow } from "@/components/PointerGlow";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ScrollHint } from "@/components/ScrollHint";
import { Starfield } from "@/components/Starfield";
import { TrackNarrative } from "@/components/TrackNarrative";
import { TrackSection } from "@/components/TrackSection";
import { Achievement } from "@/components/eggs/Achievement";
import { ArbustoModal } from "@/components/eggs/ArbustoModal";
import { AuthorFooter } from "@/components/eggs/AuthorFooter";
import {
  EasterEggProvider,
  useEggs,
  type Mood,
} from "@/components/eggs/EasterEggProvider";
import { FinalNote } from "@/components/eggs/FinalNote";
import { PlantCorner } from "@/components/eggs/PlantCorner";
import { useTypedWord } from "@/hooks/useTypedWord";
import { patchState } from "@/lib/storage";
import { READING_FOR, secretTrack, tracks } from "@/data/tracks";
import type { FinalAnswer, TelepatiaAnswer } from "@/types/track";

type Stage = "intro" | "track" | "fake-ending" | "secret" | "final-note";

const LAST_INDEX = tracks.length - 1;

export function Experience() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("intro");

  // Começa fofo, vai ficando dark-cute a partir da carta IV.
  const mood: Mood = index >= 3 || stage === "secret" ? "mischievous" : "cute";

  return (
    <EasterEggProvider mood={mood}>
      <div data-mood={mood} className="contents">
        <ExperienceInner
          stage={stage}
          setStage={setStage}
          index={index}
          setIndex={setIndex}
          mood={mood}
        />
      </div>
    </EasterEggProvider>
  );
}

interface InnerProps {
  stage: Stage;
  setStage: (stage: Stage) => void;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  mood: Mood;
}

function ExperienceInner({
  stage,
  setStage,
  index,
  setIndex,
  mood,
}: InnerProps) {
  const reduce = useReducedMotion();
  const { openTransmission } = useEggs();

  const [dimmed, setDimmed] = useState(false);

  const [telepatiaAnswer, setTelepatiaAnswer] = useState<TelepatiaAnswer | null>(
    null,
  );
  const [finalAnswer, setFinalAnswer] = useState<FinalAnswer | null>(null);

  // As respostas ficam gravadas no localStorage, mas a tela sempre começa
  // limpa: se ela voltar no site, tem que poder responder de novo. Uma
  // pergunta já respondida e travada tira a graça da leitura inteira.

  useEffect(() => {
    console.log(`${READING_FOR}, você realmente abriu o console? 👀`);
    console.log("isso aqui era pra ser segredo.");
    console.log("%c— Arbusto 🌱", "color:#F28BBC; font-size:13px;");
  }, []);

  // Digitar "arbusto" em qualquer lugar abre a transmissão secreta.
  useTypedWord("arbusto", openTransmission);

  // Cada carta começa do topo. A troca só acontece no botão, então rolar
  // a página aqui é só leitura: nenhuma mensagem se perde no caminho.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage, index]);

  const track = tracks[index];
  const isFinalTrack = index === LAST_INDEX;

  const goToTracks = useCallback(() => {
    setStage("track");
    setIndex(0);
  }, [setStage, setIndex]);

  const nextTrack = useCallback(() => {
    if (index >= LAST_INDEX) {
      patchState({ completedExperience: true });
      setStage("fake-ending");
      return;
    }
    setIndex((current) => current + 1);
  }, [index, setStage, setIndex]);

  const markDimmed = useCallback(() => setDimmed(true), []);

  const handleTelepatia = useCallback((answer: TelepatiaAnswer) => {
    setTelepatiaAnswer(answer);
    patchState({ telepatiaAnswer: answer });
  }, []);

  const handleFinal = useCallback((answer: FinalAnswer) => {
    setFinalAnswer(answer);
    patchState({ finalAnswer: answer });
  }, []);

  const revealSecret = useCallback(() => {
    patchState({ completedExperience: true });
    setStage("secret");
  }, [setStage]);

  const openFinalNote = useCallback(() => setStage("final-note"), [setStage]);

  /**
   * A luz do quarto. Começa em rosa quase apagado, esquenta carta a carta,
   * quase some no falso final e explode em Get You. No recado final ela
   * baixa de novo — ali não é mais a leitura falando.
   */
  const palette = useMemo(() => {
    if (stage === "intro") {
      return {
        accent: mood === "cute" ? "#C86A96" : "#8E2C57",
        accentSecondary: mood === "cute" ? "#3A1428" : "#2A0A1A",
        intensity: 0.8,
      };
    }
    if (stage === "final-note") {
      return { accent: "#D94A8C", accentSecondary: "#3D0F26", intensity: 0.7 };
    }
    if (stage === "secret") {
      return {
        accent: secretTrack.accent,
        accentSecondary: secretTrack.accentSecondary,
        intensity: 1.75,
      };
    }
    if (stage === "fake-ending") {
      return {
        accent: tracks[LAST_INDEX].accent,
        accentSecondary: "#1A0610",
        intensity: dimmed ? 0.12 : 0.5,
      };
    }

    const cuteBias = mood === "cute";
    return {
      accent: track.accent,
      // Cute: mais pastel/rosa claro. Mischievous: vinho + lilás.
      accentSecondary: cuteBias
        ? "#5A2740"
        : track.accentSecondary === track.accent
          ? "#8B4FC4"
          : track.accentSecondary,
      // Carta I ≈ 0.85, carta VII ≈ 1.45.
      intensity: (cuteBias ? 0.78 : 0.9) + index * (cuteBias ? 0.08 : 0.11),
    };
  }, [stage, dimmed, track, index, mood]);

  // O halo das capas acompanha o mesmo aquecimento.
  const coverGlow = 0.85 + index * 0.09;

  // Saída curta, entrada mais longa: no total a troca de carta fica
  // em ~800ms, que é onde a transição ainda parece intencional.
  const transition = {
    duration: reduce ? 0.2 : 0.5,
    ease: [0.16, 1, 0.3, 1] as const,
  };
  const exitTransition = { ...transition, duration: reduce ? 0.15 : 0.3 };

  return (
    <>
      <BackgroundGradient {...palette} />
      <Starfield />
      <PointerGlow accent={palette.accent} />

      <ProgressIndicator current={index + 1} visible={stage === "track"} />
      <ScrollHint visible={stage !== "intro" && stage !== "final-note"} />

      {/* A plantinha acompanha a leitura, mas sai de cena no recado final. */}
      <PlantCorner visible={stage === "track" || stage === "fake-ending"} />
      <AuthorFooter
        visible={
          (stage === "track" && index >= 3) ||
          stage === "fake-ending" ||
          stage === "secret"
        }
      />

      <Achievement />
      <ArbustoModal />

      <main className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage === "track" ? `track-${index}` : stage}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduce
                ? { opacity: 0, transition: exitTransition }
                : { opacity: 0, y: -14, transition: exitTransition }
            }
            transition={transition}
          >
            {stage === "intro" && <Intro onStart={goToTracks} />}

            {stage === "track" && !isFinalTrack && (
              <TrackSection
                track={track}
                index={index + 1}
                glow={coverGlow}
                narrative={
                  <TrackNarrative
                    track={track}
                    telepatiaAnswer={telepatiaAnswer}
                    onTelepatiaAnswer={handleTelepatia}
                    onAdvance={nextTrack}
                  />
                }
              />
            )}

            {stage === "track" && isFinalTrack && (
              <FinalQuestion
                track={track}
                answer={finalAnswer}
                onAnswer={handleFinal}
                onAdvance={nextTrack}
              />
            )}

            {stage === "fake-ending" && (
              <FakeEnding onReveal={revealSecret} onDim={markDimmed} />
            )}

            {stage === "secret" && <EasterEgg onFinalNote={openFinalNote} />}

            {stage === "final-note" && <FinalNote />}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
