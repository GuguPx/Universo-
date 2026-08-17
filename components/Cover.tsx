"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { TarotCorners } from "@/components/TarotOrnaments";
import type { Track } from "@/types/track";
import { withAlpha } from "@/lib/color";

interface Props {
  track: Track;
  priority?: boolean;
  /** Tamanho máximo. Número em px, ou qualquer valor CSS de largura. */
  maxWidth?: number | string;
  /** Multiplica o halo. Sobe nos momentos mais românticos. */
  glow?: number;
}

/**
 * A capa é a carta. Entra com um leve zoom-out, ganha um halo rosa atrás
 * e depois só respira — algo entre 0% e 1,5% de escala, lento o suficiente
 * pra você não ter certeza se está se mexendo.
 */
export function Cover({
  track,
  priority = false,
  maxWidth = 420,
  glow = 1,
}: Props) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      className="relative w-full"
      style={{ maxWidth }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduce ? 0.25 : 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Halo: a carta parece estar acendendo o quarto, não colada nele. */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 animate-haloPulse rounded-[2.5rem] blur-3xl sm:-inset-12"
        style={{
          background: `radial-gradient(closest-side, ${withAlpha(
            track.accent,
            Math.min(0.62 * glow, 0.92),
          )}, transparent 76%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[2rem] blur-2xl"
        style={{
          background: `radial-gradient(closest-side, ${withAlpha(
            track.accentSecondary,
            Math.min(0.5 * glow, 0.85),
          )}, transparent 72%)`,
        }}
      />

      <motion.div
        className="relative aspect-square w-full overflow-hidden rounded-[18px] border border-petal-light/25 sm:rounded-[22px]"
        style={{
          boxShadow: `0 0 40px ${withAlpha(track.accent, 0.14 * glow)}, 0 0 100px ${withAlpha(
            track.accent,
            0.06 * glow,
          )}, 0 24px 60px rgba(5,2,4,0.85)`,
        }}
        animate={reduce ? undefined : { scale: [1, 1.015, 1] }}
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Image
          src={failed ? track.coverFallback : track.cover}
          onError={() => setFailed(true)}
          alt={`Capa de ${track.title}, de ${track.artist}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 420px"
          className="object-cover"
        />

        {/* Um véu rosa levíssimo, pra capa pertencer à leitura. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${withAlpha(
              track.accent,
              0.1,
            )}, transparent 45%, rgba(9,3,7,0.42))`,
          }}
        />

        <TarotCorners inset="9px" size={15} />
      </motion.div>
    </motion.div>
  );
}
