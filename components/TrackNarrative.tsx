"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { InteractiveQuestion } from "@/components/InteractiveQuestion";
import { AdvanceButton, QuietButton } from "@/components/ui/Buttons";
import { BowSpot } from "@/components/eggs/BowSpot";
import { SecretHeart } from "@/components/eggs/SecretHeart";
import { useTimedReveal } from "@/hooks/useTimedReveal";
import type { TelepatiaAnswer, Track } from "@/types/track";

interface Props {
  track: Track;
  telepatiaAnswer: TelepatiaAnswer | null;
  onTelepatiaAnswer: (answer: TelepatiaAnswer) => void;
  onAdvance: () => void;
  /** Avisa a experiência de que já dá pra seguir (teclado, swipe, roda). */
  onReady: () => void;
}

const EMPHASIS =
  "font-serif text-[1.5rem] leading-tight text-cream sm:text-3xl md:text-[2rem]";

/** A carta VI é onde a leitura para de fingir. Essa frase é a maior de todas. */
const EMPHASIS_STRONG =
  "text-aura font-serif text-[1.7rem] leading-[1.18] sm:text-[2.3rem] md:text-[2.7rem]";

function Advance({
  show,
  label,
  onAdvance,
  onReady,
}: {
  show: boolean;
  label?: string;
  onAdvance: () => void;
  onReady: () => void;
}) {
  useEffect(() => {
    if (show) onReady();
  }, [show, onReady]);

  return (
    <Reveal when={show} className="mt-9">
      <AdvanceButton onClick={onAdvance} label={label ?? "próxima carta"} />
    </Reveal>
  );
}

/**
 * Todo o texto de cada capítulo vem de `data/tracks.ts`.
 * O que muda aqui é só o *ritmo* — quando cada frase chega e o que
 * a pessoa precisa fazer antes de poder seguir.
 */
export function TrackNarrative({
  track,
  telepatiaAnswer,
  onTelepatiaAnswer,
  onAdvance,
  onReady,
}: Props) {
  const [nudged, setNudged] = useState(false);
  const [asked, setAsked] = useState(false);

  const secondaryDelay = track.secondaryDelay ?? 0;
  const timedChapter = track.id === 1 || track.id === 2 || track.id === 6;
  const answered = telepatiaAnswer !== null;

  // Todos os cronômetros vivem aqui em cima: a ordem dos hooks nunca muda,
  // só o capítulo que decide olhar pra cada um.
  const timedAdvance = useTimedReveal(
    secondaryDelay + (track.id === 6 ? 2600 : 900),
    timedChapter,
  );

  // III — a segunda frase vem no clique, ou sozinha se você demorar.
  const autoNudge = useTimedReveal(secondaryDelay || 6000, track.id === 3);
  const nudgeShown = track.id === 3 && (nudged || autoNudge);
  const nudgeAdvance = useTimedReveal(1100, nudgeShown);

  // IV — só libera depois que você responde.
  const answerAdvance = useTimedReveal(2600, track.id === 4 && answered);

  // V — a explicação existe, mas você tem que pedir.
  const askedHere = track.id === 5 && asked;
  const heartShown = useTimedReveal(1600, askedHere);
  const pauseOver = useTimedReveal(3000, askedHere);

  const advanceProps = { label: track.nextLabel, onAdvance, onReady };

  return (
    <>
      <Reveal delay={200}>
        <p className="thought text-balance">{track.message}</p>
      </Reveal>

      {/* I, II e VI — a frase que corrige a anterior. */}
      {timedChapter && (
        <>
          <Reveal delay={secondaryDelay} className={track.id === 6 ? "mt-6" : "mt-5"}>
            <p
              className={
                track.id === 6 ? `${EMPHASIS_STRONG} text-balance` : EMPHASIS
              }
            >
              {track.secondaryMessage}
            </p>
          </Reveal>

          {track.aside && (
            <Reveal delay={secondaryDelay + 1500} className="mt-6">
              <p className="whisper italic text-petal-light/45">
                {track.aside}
              </p>
            </Reveal>
          )}

          {/* Um laço na II e outro na VI. O terceiro está na IV. */}
          {(track.id === 2 || track.id === 6) && (
            <Reveal delay={secondaryDelay + 2200} className="mt-5">
              <BowSpot id={`carta-${track.id}`} />
            </Reveal>
          )}

          <Advance show={timedAdvance} {...advanceProps} />
        </>
      )}

      {/* III — o tom começa a virar. */}
      {track.id === 3 && (
        <>
          <Reveal when={!nudgeShown} delay={2000} className="mt-6">
            <QuietButton onClick={() => setNudged(true)}>hmm…</QuietButton>
          </Reveal>

          <Reveal when={nudgeShown} delay={200} className="mt-5">
            <p className="font-serif text-[1.25rem] leading-snug text-petal-light sm:text-2xl">
              {track.secondaryMessage}
            </p>
          </Reveal>

          <Advance show={nudgeAdvance} {...advanceProps} />
        </>
      )}

      {/* IV — a primeira vez que a resposta é sua. */}
      {track.id === 4 && (
        <>
          <Reveal delay={secondaryDelay} className="mt-5">
            <p className={EMPHASIS}>{track.secondaryMessage}</p>
          </Reveal>

          <Reveal delay={secondaryDelay + 800} className="mt-7 w-full">
            <InteractiveQuestion
              accent={track.accent}
              answer={telepatiaAnswer}
              onAnswer={onTelepatiaAnswer}
            />
          </Reveal>

          {/* O terceiro laço, escondido na carta da lua. */}
          <Reveal delay={secondaryDelay + 3200} className="mt-5">
            <BowSpot id="carta-4" />
          </Reveal>

          <Advance show={answerAdvance} {...advanceProps} />
        </>
      )}

      {/* V — a explicação existe, mas você tem que perguntar. */}
      {track.id === 5 && (
        <>
          <Reveal when={!asked} delay={1500} className="mt-6">
            <QuietButton onClick={() => setAsked(true)}>por quê?</QuietButton>
          </Reveal>

          <Reveal when={asked} delay={300} className="mt-5">
            <p className={EMPHASIS}>{track.secondaryMessage}</p>
          </Reveal>

          {/* O coração que guarda a frase que ninguém vê sem procurar. */}
          <Reveal when={heartShown} className="mt-7 w-full">
            <SecretHeart />
          </Reveal>

          <Advance show={pauseOver} {...advanceProps} />
        </>
      )}
    </>
  );
}
