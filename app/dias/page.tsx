import Link from "next/link";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { DaysSince } from "@/components/DaysSince";
import { Starfield } from "@/components/Starfield";

export default function DaysPage() {
  return (
    <main className="min-h-screen-ios relative flex items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-6">
      <BackgroundGradient
        accent="#E66A9F"
        accentSecondary="#6D3DA6"
        intensity={0.9}
      />
      <Starfield />

      <Link
        href="/"
        className="pt-safe fixed left-5 top-5 z-20 inline-flex min-h-[44px] items-center rounded-full px-3 font-mono text-[0.65rem] uppercase tracking-widest text-mauve/50 transition-colors hover:text-petal-light sm:left-8 sm:top-7"
      >
        ← universo
      </Link>

      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="sigil mb-8 text-xl" aria-hidden="true">
          ☾ ✦ ♡
        </p>

        <DaysSince />

        <Link
          href="/relatorio"
          className="mt-12 inline-flex min-h-[44px] items-center rounded-md border border-mauve/10 px-4 font-mono text-[0.58rem] uppercase tracking-widest text-mauve/20 transition-colors duration-700 hover:border-mauve/25 hover:text-mauve/55 focus-visible:text-mauve/70"
        >
          ver relatório confidencial do projeto
        </Link>
      </section>
    </main>
  );
}
