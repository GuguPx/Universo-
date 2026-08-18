import Link from "next/link";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { EncounterTeaser } from "@/components/EncounterTeaser";
import { Starfield } from "@/components/Starfield";

export default function Page() {
  return (
    <main className="min-h-screen-ios relative flex items-center justify-center overflow-hidden px-5 py-16 sm:px-8">
      <BackgroundGradient
        accent="#D94A8C"
        accentSecondary="#6D3DA6"
        intensity={0.82}
      />
      <Starfield />

      <section className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="text-center">
          <p className="sigil text-2xl" aria-hidden="true">
            ✦
          </p>
          <p className="eyebrow mt-5">arquivo particular</p>
          <h1 className="text-aura mt-4 text-balance font-serif text-[2.7rem] leading-[0.98] sm:text-6xl md:text-7xl">
            um pequeno universo
            <br />
            para Vitória
          </h1>
          <p className="mx-auto mt-6 max-w-[42ch] text-sm leading-relaxed text-mauve/70 sm:text-base">
            eu aparentemente não sabia escolher uma forma normal de dizer
            certas coisas, então fiz várias.
          </p>

          <EncounterTeaser />
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
          <Link
            href="/playlist"
            className="group relative min-h-[230px] overflow-hidden rounded-[1.75rem] border border-petal-light/20 bg-ink-soft/70 p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-petal-light/45 hover:shadow-[0_20px_80px_rgba(217,74,140,0.18)] sm:min-h-[270px] sm:p-9"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-petal/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="eyebrow">experiência 01</span>
            <span className="mt-8 block text-4xl text-petal-light/80">VII</span>
            <h2 className="mt-4 font-serif text-3xl text-cream">
              uma leitura em músicas
            </h2>
            <p className="mt-3 max-w-[31ch] text-sm leading-relaxed text-mauve/65">
              sete cartas, sete músicas e uma oitava que definitivamente não
              deveria estar ali.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm text-petal-light">
              abrir leitura
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                ✦
              </span>
            </span>
          </Link>

          <Link
            href="/dias"
            className="group relative min-h-[230px] overflow-hidden rounded-[1.75rem] border border-lilac/20 bg-ink-soft/70 p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-lilac/45 hover:shadow-[0_20px_80px_rgba(139,79,196,0.18)] sm:min-h-[270px] sm:p-9"
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-lilac/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="eyebrow">experiência 02</span>
            <span className="mt-8 block text-4xl text-lilac/75">24·07</span>
            <h2 className="mt-4 font-serif text-3xl text-cream">
              faz alguns dias
            </h2>
            <p className="mt-3 max-w-[31ch] text-sm leading-relaxed text-mauve/65">
              um contador bastante objetivo sobre uma situação nem um pouco
              discreta.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm text-lilac">
              conferir há quanto tempo
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                ♡
              </span>
            </span>
          </Link>

          <Link
            href="/oraculo"
            className="group relative min-h-[230px] overflow-hidden rounded-[1.75rem] border border-petal-light/20 bg-ink-soft/70 p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-petal-light/45 hover:shadow-[0_20px_80px_rgba(217,74,140,0.18)] sm:col-span-2 sm:min-h-[220px] sm:p-9 lg:col-span-1"
          >
            <div
              aria-hidden="true"
              className="absolute -right-10 bottom-[-4rem] h-48 w-48 rounded-full bg-petal/12 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="eyebrow">experiência 03</span>
            <span className="mt-8 block text-4xl text-petal-light/80">✦</span>
            <h2 className="mt-4 font-serif text-3xl text-cream">
              oráculo do Arbusto
            </h2>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-mauve/65">
              previsões extremamente duvidosas. pode consultar de novo. e de
              novo. as cartas vão perceber.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm text-petal-light">
              consultar destino
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                ☾
              </span>
            </span>
          </Link>
        </div>

        <p className="mt-10 text-center font-serif text-xs italic text-mauve/35">
          novos arquivos podem aparecer sem aviso prévio.
        </p>
      </section>
    </main>
  );
}
