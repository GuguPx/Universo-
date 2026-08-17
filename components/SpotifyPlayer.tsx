"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Track } from "@/types/track";

interface Props {
  track: Track;
  className?: string;
}

/**
 * O embed do Spotify nunca é obrigatório: se ele não carregar, travar num
 * navegador chato ou o autoplay for bloqueado, o link externo continua ali
 * e o capítulo segue funcionando igual.
 */
export function SpotifyPlayer({ track, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-[80px] w-full overflow-hidden rounded-xl">
        {!loaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse rounded-xl border border-petal-light/15 bg-petal/[0.05]"
          />
        )}
        <iframe
          src={track.spotifyEmbedUrl}
          title={`Player do Spotify — ${track.title}, de ${track.artist}`}
          width="100%"
          height="80"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="relative rounded-xl"
          style={{ border: 0, colorScheme: "normal" }}
        />
      </div>

      <a
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ouvir ${track.title} no Spotify — abre em nova aba`}
        className="group mt-3 inline-flex min-h-[40px] items-center gap-2 text-[0.78rem] text-mauve/60 transition-colors duration-500 hover:text-petal-light"
      >
        <span>Ouvir no Spotify</span>
        <ExternalLink
          aria-hidden="true"
          className="h-3 w-3 transition-transform duration-500 ease-cinema group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </div>
  );
}
