"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Cover } from "@/components/Cover";
import { SpotifyPlayer } from "@/components/SpotifyPlayer";
import { MoonMark } from "@/components/TarotOrnaments";
import { ArbustoCard } from "@/components/eggs/ArbustoCard";
import { KittenMark } from "@/components/eggs/Glyphs";
import { useEggs } from "@/components/eggs/EasterEggProvider";
import { TOTAL_NUMERAL, TOTAL_TRACKS } from "@/data/tracks";
import type { Track } from "@/types/track";

interface Props {
  track: Track;
  /** 1-indexado. */
  index: number;
  /** Frases, interações e o botão de avanço do capítulo. */
  narrative: ReactNode;
  /** Multiplica o halo da capa. Sobe conforme a leitura esquenta. */
  glow?: number;
}

/**
 * O molde de uma carta: capa de um lado, leitura do outro.
 * O lado alterna a cada faixa pra a leitura não virar uma coluna só.
 */
export function TrackSection({ track, index, narrative, glow = 1 }: Props) {
  const reduce = useReducedMotion();
  const { mood, pushSymbol } = useEggs();
  const coverFirst = track.layout === "left";
  const isMoonCard = track.id === 4;
  // A carta III é a que tem algo a mais no cabeçalho.
  const hasArbusto = track.id === 3;

  const enter = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reduce ? 0.25 : 0.9, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section
      aria-label={`Carta ${index} de ${TOTAL_TRACKS}: ${track.title}, de ${track.artist}`}
      className="flex min-h-svh items-center justify-center px-6 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-11 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-16 lg:gap-24">
        <div
          className={`flex justify-center ${
            coverFirst ? "md:order-1" : "md:order-2 md:justify-end"
          }`}
        >
          <Cover track={track} priority={index <= 2} glow={glow} />
        </div>

        <div
          className={`flex flex-col items-center text-center md:items-start md:text-left ${
            coverFirst ? "md:order-2" : "md:order-1"
          }`}
        >
          <motion.div className="flex items-center gap-2.5" {...enter}>
            <span aria-hidden="true" className="sigil text-base">
              {track.symbol}
            </span>
            <p className="eyebrow">
              carta {track.numeral} <span className="text-mauve/30">/</span>{" "}
              {TOTAL_NUMERAL}
            </p>

            {/* A lua só aparece na carta de telepatía — e é clicável. */}
            {isMoonCard && (
              <button
                type="button"
                onClick={() => pushSymbol("moon")}
                aria-label="uma lua"
                className="-m-1.5 ml-0 rounded-full p-1.5 text-lilac/60 transition-colors duration-500 hover:text-lilac"
              >
                <MoonMark size={17} />
              </button>
            )}

            {/* Do meio da leitura em diante entra o lado dark-cute. */}
            {mood === "mischievous" && !isMoonCard && (
              <KittenMark
                className="ml-0.5 text-lilac/40"
                size={17}
              />
            )}
            {mood === "cute" && !isMoonCard && !hasArbusto && (
              <span
                aria-hidden="true"
                className="ml-0.5 text-[0.7rem] text-petal-soft/35"
              >
                ♡
              </span>
            )}

            {hasArbusto && <ArbustoCard />}
          </motion.div>

          <motion.h2
            className="mt-3 text-balance text-[1.75rem] font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-[2.6rem]"
            {...enter}
            transition={{ ...enter.transition, delay: reduce ? 0 : 0.08 }}
          >
            {track.title}
          </motion.h2>

          <motion.p
            className="mt-1.5 text-sm text-mauve sm:text-base"
            {...enter}
            transition={{ ...enter.transition, delay: reduce ? 0 : 0.14 }}
          >
            {track.artist}
          </motion.p>

          <motion.div
            className="mt-7 w-full max-w-[420px]"
            {...enter}
            transition={{ ...enter.transition, delay: reduce ? 0 : 0.22 }}
          >
            <SpotifyPlayer track={track} />
          </motion.div>

          <div
            className="mt-9 flex w-full max-w-[46ch] flex-col items-center md:items-start"
            aria-live="polite"
          >
            {narrative}
          </div>
        </div>
      </div>
    </section>
  );
}
