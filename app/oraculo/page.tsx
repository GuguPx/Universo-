import Link from "next/link";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Oracle } from "@/components/Oracle";
import { Starfield } from "@/components/Starfield";

export default function OraclePage() {
  return (
    <main className="min-h-screen-ios relative flex items-center justify-center overflow-hidden px-5 py-20 text-center">
      <BackgroundGradient
        accent="#D94A8C"
        accentSecondary="#8B4FC4"
        intensity={1.05}
      />
      <Starfield />

      <Link
        href="/"
        className="pt-safe fixed left-5 top-5 z-20 inline-flex min-h-[44px] items-center rounded-full px-3 font-mono text-[0.65rem] uppercase tracking-widest text-mauve/50 transition-colors hover:text-petal-light sm:left-8 sm:top-7"
      >
        ← universo
      </Link>

      <section className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center">
        <p className="sigil text-xl" aria-hidden="true">
          ✦
        </p>
        <h1 className="mt-4 font-serif text-[2rem] leading-tight text-cream sm:text-[2.6rem]">
          Oráculo do Arbusto
        </h1>
        <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-widestx text-mauve/40">
          previsões sem nenhum rigor
        </p>

        <div className="mt-10">
          <Oracle />
        </div>
      </section>
    </main>
  );
}
