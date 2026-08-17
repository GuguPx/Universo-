"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cover } from "@/components/Cover";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { Reveal } from "@/components/Reveal";
import { CardFlip, SecretCardBack } from "@/components/SecretCard";
import { SigilDivider } from "@/components/TarotOrnaments";
import { Sprout } from "@/components/eggs/Glyphs";
import { useTimedReveal } from "@/hooks/useTimedReveal";
import {
  PLAYLIST_URL,
  otherTracks,
  secretLines,
  secretTrack,
} from "@/data/tracks";

/**
 * A carta que estava fora da leitura. Sem contador, sem próxima, sem nada.
 * É aqui que o rosa chega no ponto mais alto — e depois o texto sai de
 * cena e sobra só Get You tocando.
 */
export function EasterEgg({ onFinalNote }: { onFinalNote: () => void }) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  // Verso → Get You. A virada é o momento em que a carta deixa de ser mistério.
  useEffect(() => {
    const timer = window.setTimeout(() => setFlipped(true), reduce ? 0 : 520);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  const first = useTimedReveal(2200);
  const second = useTimedReveal(4600);
  const third = useTimedReveal(7200);
  const fourth = useTimedReveal(10000);
  const fifth = useTimedReveal(12800);
  const sixth = useTimedReveal(15800);
  // A partir daqui o texto recua e fica só a música.
  const settle = useTimedReveal(20200);
  const heart = useTimedReveal(21800);
  const maybe = useTimedReveal(23400);
  const another = useTimedReveal(25800);
  const end = useTimedReveal(27800);
  const footer = useTimedReveal(29800);

  return (
    <section
      aria-label={`Carta escondida: ${secretTrack.title}, de ${secretTrack.artist}`}
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center"
    >
      {/* A aura mais forte da experiência inteira, crescendo devagar. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(240,106,166,0.32), rgba(138,31,82,0.2) 52%, transparent 76%)",
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0.4 : 5, ease: "easeOut" }}
      />

      <CardFlip
        flipped={flipped}
        back={<SecretCardBack interactive={false} />}
        front={
          <Cover track={secretTrack} maxWidth={204} priority glow={1.8} />
        }
      />

      <motion.div
        className="mt-8 flex flex-col items-center"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 12 }}
        transition={{
          duration: reduce ? 0.25 : 1.2,
          delay: flipped ? 0.35 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <h2
          className="font-serif text-[2rem] leading-tight text-cream sm:text-[2.6rem]"
          style={{ textShadow: "0 0 34px rgba(240,106,166,0.5)" }}
        >
          {secretTrack.title}
        </h2>
        <p className="mt-1.5 text-sm text-mauve sm:text-base">
          {secretTrack.artist}
        </p>

        <div className="mt-7 w-full max-w-[420px]">
          <SpotifyPlayer track={secretTrack} />
        </div>
      </motion.div>

      {/* Bloco de texto que recua quando termina de falar. */}
      <div
        className="grid w-full max-w-[42ch] transition-[grid-template-rows,opacity,filter] duration-1000 ease-cinema"
        style={{
          gridTemplateRows: settle ? "0fr" : "1fr",
          opacity: settle ? 0 : 1,
          filter: settle && !reduce ? "blur(8px)" : "blur(0px)",
        }}
        aria-hidden={settle}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-center pt-11" aria-live="polite">
            <Reveal when={first}>
              <p className="font-serif text-xl text-cream/90 sm:text-2xl">
                {secretTrack.message}
              </p>
            </Reveal>

            <Reveal when={second} className="mt-6">
              <p className="text-balance font-serif text-[1.45rem] leading-snug text-cream sm:text-[1.8rem]">
                {secretTrack.secondaryMessage}
              </p>
            </Reveal>

            <Reveal when={third} className="mt-7">
              <p className="text-aura text-balance font-serif text-[1.55rem] leading-[1.2] sm:text-[2rem]">
                {secretLines[0]}
              </p>
            </Reveal>

            <Reveal when={fourth} className="mt-6">
              <p className="text-balance text-[0.92rem] leading-relaxed text-mauve">
                {secretLines[1]}
              </p>
            </Reveal>

            <Reveal when={fifth} className="mt-8">
              <p className="font-serif text-[1.5rem] italic leading-snug text-petal-light sm:text-[1.85rem]">
                {secretLines[2]}
              </p>
            </Reveal>

            <Reveal when={sixth} className="mt-6">
              <p className="text-balance font-serif text-[1.2rem] leading-relaxed text-cream/90 sm:text-[1.4rem]">
                {secretLines[3]}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal when={heart} className="mt-14">
        <p
          className="text-3xl text-petal"
          aria-label="um coração"
          style={{ textShadow: "0 0 30px rgba(217,74,140,0.75)" }}
        >
          ♡
        </p>
      </Reveal>

      <Reveal when={maybe} className="mt-9">
        <p className="font-serif text-[1.15rem] italic text-mauve sm:text-[1.3rem]">
          talvez esse fosse o verdadeiro easter egg.
        </p>
      </Reveal>

      <Reveal when={another} className="mt-3">
        <p className="whisper text-petal-light/60">
          ou talvez ainda tenha outro.
        </p>
      </Reveal>

      <Reveal when={end} className="mt-12">
        <p className="font-serif text-3xl italic text-cream sm:text-4xl">
          fim ♡
        </p>
      </Reveal>

      <Reveal when={end} delay={1400} className="mt-6">
        <p className="text-[0.7rem] leading-relaxed text-mauve/25">
          agora você pode fingir que isso tudo foi coincidência.
        </p>
      </Reveal>

      <Reveal when={footer} className="mt-11 flex flex-col items-center">
        <SigilDivider symbol="✦" />
        <a
          href={PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[44px] items-center px-3 text-[0.75rem] text-mauve/60 underline-offset-4 transition-colors duration-500 hover:text-petal-light hover:underline"
        >
          ver playlist completa ↗
        </a>
      </Reveal>

      {/* O resto da playlist, sussurrado. */}
      <Reveal when={footer} delay={1800} className="mt-11 w-full max-w-2xl">
        <p
          className="select-none text-[0.65rem] leading-loose text-petal-light/[0.07] transition-colors duration-1000 hover:text-petal-light/25"
          aria-hidden="true"
        >
          {otherTracks.join(" · ")}
        </p>
      </Reveal>

      {/* A última plantinha do site. Ninguém é obrigado a achar. */}
      <Reveal when={footer} delay={3200} className="mt-10">
        <button
          type="button"
          onClick={onFinalNote}
          aria-label="uma plantinha"
          className="-m-3 rounded-full p-3 text-petal-light/[0.13] transition-colors duration-700 hover:text-petal-light/80 focus-visible:text-petal-light"
        >
          <Sprout size={17} />
        </button>
      </Reveal>
    </section>
  );
}
