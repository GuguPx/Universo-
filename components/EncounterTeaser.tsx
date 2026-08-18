"use client";

import Link from "next/link";
import { useDaysSince } from "@/hooks/useDaysSince";

export function EncounterTeaser() {
  const days = useDaysSince();

  return (
    <Link
      href="/dias"
      className="group mx-auto mt-10 flex w-full max-w-2xl items-center justify-between gap-5 rounded-2xl border border-petal-light/15 bg-ink-soft/55 px-5 py-4 text-left backdrop-blur-xl transition duration-500 hover:border-petal-light/35 hover:bg-ink-soft/75 sm:mt-12 sm:px-6"
    >
      <div>
        <p className="font-mono text-[0.58rem] uppercase tracking-widestx text-mauve/45">
          registro mais recente
        </p>
        <p className="mt-1.5 font-serif text-lg leading-snug text-cream sm:text-xl">
          <span suppressHydrationWarning className="text-petal-light">
            {days} {days === 1 ? "dia" : "dias"}
          </span>{" "}
          desde que o universo fez uma escolha suspeita.
        </p>
      </div>

      <span className="shrink-0 text-xl text-petal-light/55 transition-transform duration-500 group-hover:translate-x-1">
        ♡
      </span>
    </Link>
  );
}
