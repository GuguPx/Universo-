"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { loadSpotifyEmbedApi } from "@/lib/spotifyEmbed";
import type { SpotifyEmbedController } from "@/lib/spotifyEmbed";
import type { Track } from "@/types/track";

interface Props {
  track: Track;
  className?: string;
  /** Tenta começar a tocar sozinho assim que a carta abre. */
  autoPlay?: boolean;
}

/**
 * O embed do Spotify nunca é obrigatório: se ele não carregar, travar num
 * navegador chato ou o autoplay for bloqueado, o link externo continua ali
 * e o capítulo segue funcionando igual.
 *
 * Com `autoPlay`, o player é montado pela IFrame API do Spotify para poder
 * receber um `play()` assim que fica pronto. Alguns navegadores — o Safari
 * do iPhone em especial — recusam som sem toque direto; nesses casos o
 * embed simplesmente fica esperando o play, como antes.
 */
export function SpotifyPlayer({
  track,
  className = "",
  autoPlay = false,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [fallback, setFallback] = useState(!autoPlay);

  useEffect(() => {
    if (fallback) return;

    let cancelled = false;
    let controller: SpotifyEmbedController | null = null;
    let playing = false;

    // Se a API demorar demais, o embed comum assume o lugar dela.
    const timeout = window.setTimeout(() => {
      if (!cancelled && !controller) setFallback(true);
    }, 4000);

    // Safari do iPhone costuma recusar som que ninguém pediu. Se o play
    // automático não pegar, o próximo toque na tela — qualquer um — resolve.
    const retryOnTouch = () => {
      if (cancelled || playing) return;
      controller?.play();
    };

    loadSpotifyEmbedApi()
      .then((api) => {
        if (cancelled || !hostRef.current) return;

        // A API troca o elemento recebido por um iframe. Por isso ela ganha
        // um nó criado na mão: o React não pode perder de vista um filho seu.
        const target = document.createElement("div");
        hostRef.current.appendChild(target);

        api.createController(
          target,
          { uri: `spotify:track:${track.spotifyId}`, width: "100%", height: 80 },
          (embedController) => {
            controller = embedController;
            window.clearTimeout(timeout);

            embedController.addListener("playback_update", (payload) => {
              const state = (payload as { data?: { isPaused?: boolean } })?.data;
              if (state?.isPaused === false) playing = true;
            });

            embedController.addListener("ready", () => {
              if (cancelled) return;
              setLoaded(true);
              embedController.play();
              document.addEventListener("pointerdown", retryOnTouch);
            });
          },
        );
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      document.removeEventListener("pointerdown", retryOnTouch);
      controller?.destroy?.();
      if (hostRef.current) hostRef.current.replaceChildren();
    };
  }, [fallback, track.spotifyId]);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-[80px] w-full overflow-hidden rounded-xl">
        {!loaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse rounded-xl border border-petal-light/15 bg-petal/[0.05]"
          />
        )}

        {fallback ? (
          <iframe
            src={track.spotifyEmbedUrl}
            title={`Player do Spotify — ${track.title}, de ${track.artist}`}
            width="100%"
            height="80"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="relative rounded-xl"
            style={{ border: 0, colorScheme: "normal" }}
          />
        ) : (
          <div
            ref={hostRef}
            className="relative h-full w-full overflow-hidden rounded-xl [&>iframe]:rounded-xl"
          />
        )}
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
