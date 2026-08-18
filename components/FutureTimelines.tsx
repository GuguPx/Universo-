"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const timelines = [
  {
    icon: "☕",
    number: "01",
    title: "Café",
    lines: [
      "Duração estimada: 40 minutos.",
      "Probabilidade de virar 3 horas de conversa: 87%.",
    ],
    footer: "status: altamente viável",
    tone: "green",
  },
  {
    icon: "🎬",
    number: "02",
    title: "Cinema",
    lines: [
      "Assistimos ao filme.",
      "Depois passamos mais tempo falando sobre o filme do que assistindo.",
    ],
    footer:
      "risco identificado: escolher um filme ruim e fingir que foi pela companhia.",
    tone: "blue",
  },
  {
    icon: "🍝",
    number: "03",
    title: "Restaurante",
    lines: [
      "Objetivo: descobrir o que a Vitória gosta de comer.",
      "Objetivo secundário: não derrubar nada na mesa por nervosismo.",
    ],
    footer: "responsável pelo risco: Arbusto.",
    tone: "red",
  },
  {
    icon: "🔮",
    number: "04",
    title: "Loja mística / tarot",
    lines: [
      "Vitória analisa cartas.",
      "Arbusto finge entender.",
      "As cartas misteriosamente recomendam um segundo encontro.",
    ],
    footer: "nota legal: resultados claramente manipulados pela administração.",
    tone: "purple",
  },
  {
    icon: "🎧",
    number: "05",
    title: "Ouvir Get You juntos",
    lines: ["Nenhuma piada estratégica aqui.", "Essa eu realmente gostaria."],
    footer: "classificação: interesse genuíno",
    tone: "pink",
  },
  {
    icon: "🎀",
    number: "06",
    title: "Rolê completamente aleatório",
    lines: [
      "Entrar em alguma loja porque tem algo rosa na vitrine.",
      "Vitória: “olha que bonitinho”.",
      "Arbusto, cinco minutos depois: carregando alguma coisa desnecessária.",
    ],
    footer: "impacto orçamentário: imprevisível",
    tone: "pink",
  },
] as const;

const accents = {
  green: "border-t-[#168354]",
  blue: "border-t-[#2878bd]",
  red: "border-t-[#d94b4b]",
  purple: "border-t-[#7651a8]",
  pink: "border-t-[#d94a8c]",
};

export function FutureTimelines() {
  const [choice, setChoice] = useState<"start" | "risks" | "accepted" | null>(
    null,
  );
  const [futureTaps, setFutureTaps] = useState(0);

  const futureMessage =
    futureTaps >= 5
      ? "vamos começar com um café. 😂"
      : futureTaps >= 3
        ? "calma, Vitória. o departamento de planejamento claramente se empolgou."
        : null;

  return (
    <div>
      <div className="border-l-8 border-[#d8a900] bg-[#fff8d9] p-5">
        <p className="text-xl font-black text-[#1f2937]">O futuro é incerto.</p>
        <p className="mt-1 text-sm text-[#4b5563]">
          Mas aparentemente o Arbusto fez algumas simulações. 🌱
        </p>
        <p className="mt-3 font-mono text-[0.58rem] font-bold uppercase tracking-widest text-[#967500]">
          previsões extremamente não confiáveis
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {timelines.map((timeline) => (
          <article
            key={timeline.number}
            className={`border border-[#ccd3da] border-t-4 bg-[#f7f8f6] p-5 ${accents[timeline.tone]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-wider text-[#697586]">
                  timeline {timeline.number}
                </p>
                <h3 className="mt-1 text-lg font-black text-[#1f2937]">
                  {timeline.title}
                </h3>
              </div>
              <span className="text-2xl" aria-hidden="true">
                {timeline.icon}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#445161]">
              {timeline.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-5 border-t border-dashed border-[#bdc5cd] pt-3 font-mono text-[0.62rem] font-bold uppercase leading-relaxed text-[#586576]">
              {timeline.footer}
            </p>
          </article>
        ))}

        <article className="relative overflow-hidden border border-[#ccd3da] border-t-4 border-t-[#d8a900] bg-[#fffdf2] p-5 sm:col-span-2">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-12 text-[7rem] opacity-[0.07]"
          >
            ✈
          </div>
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.58rem] font-bold uppercase tracking-wider text-[#697586]">
                  timeline 07
                </p>
                <h3 className="mt-1 text-lg font-black text-[#1f2937]">
                  Viagem daqui a 38 anos
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFutureTaps((current) => current + 1)}
                aria-label="data prevista 2064"
                className="min-h-[44px] border-2 border-[#d8a900] bg-[#fff3b3] px-3 font-mono text-sm font-black text-[#725b00] transition-transform active:scale-95"
              >
                2064
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#445161]">
              <p>Destino: ainda em análise.</p>
              <p>
                Motivo de estar neste roadmap antes do primeiro encontro: falha
                grave de planejamento.
              </p>
            </div>
            <AnimatePresence mode="wait">
              {futureMessage && (
                <motion.p
                  key={futureMessage}
                  role="status"
                  className="mt-5 border-l-4 border-[#d8a900] bg-white p-3 font-serif text-lg italic text-[#1f2937]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {futureMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </article>
      </div>

      <div className="mt-5 border-2 border-[#d94b4b] bg-[#fff0f0] p-5">
        <p className="font-black text-[#9f2929]">
          A equipe identificou um pequeno problema.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#5c3535]">
          Estamos analisando a Timeline 07 sem nem ter concluído a Timeline 01.
        </p>
      </div>

      <div className="mt-6 border-[5px] border-[#1f2937] bg-white p-5 sm:p-7">
        <p className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-[#697586]">
          próxima etapa recomendada
        </p>
        <p className="mt-2 text-2xl font-black text-[#1f2937]">
          marcar o primeiro encontro.
        </p>

        {!choice && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setChoice("start")}
              className="min-h-[50px] bg-[#168354] px-4 py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0_#0d5435]"
            >
              iniciar timeline ☕
            </button>
            <button
              type="button"
              onClick={() => setChoice("risks")}
              className="min-h-[50px] border-2 border-[#1f4b7a] bg-white px-4 py-3 font-mono text-xs font-bold uppercase text-[#1f4b7a]"
            >
              preciso analisar os riscos 👀
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {choice === "start" && (
            <motion.div
              key="start"
              className="mt-6 border-2 border-[#168354] bg-[#e9f8f0] p-5"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-black text-[#10683f]">✅ timeline iniciada</p>
              <p className="mt-2 text-sm leading-relaxed text-[#315c48]">
                só falta alinhar data, horário e localização com a principal
                stakeholder.
              </p>
              <p className="mt-3 font-serif text-sm italic text-[#60746a]">
                tradução: fala comigo, Vitória.
              </p>
            </motion.div>
          )}

          {(choice === "risks" || choice === "accepted") && (
            <motion.div
              key="risks"
              className="mt-6 border-2 border-[#1f4b7a] bg-[#eaf1f7] p-5"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-lg font-black text-[#1f4b7a]">
                Relatório de riscos
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4 border-b border-[#b9c9d7] pb-2">
                  <dt>risco de se divertir</dt>
                  <dd className="font-bold">alto</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#b9c9d7] pb-2">
                  <dt>risco do Arbusto ficar nervoso</dt>
                  <dd className="font-bold">muito alto</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>risco de ter que marcar outro</dt>
                  <dd className="text-right font-bold">dados promissores</dd>
                </div>
              </dl>
              {choice === "risks" ? (
                <button
                  type="button"
                  onClick={() => setChoice("accepted")}
                  className="mt-5 min-h-[46px] bg-[#1f4b7a] px-5 py-3 font-mono text-xs font-bold uppercase text-white"
                >
                  assumir os riscos
                </button>
              ) : (
                <motion.p
                  className="mt-5 font-mono text-sm font-bold text-[#168354]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  riscos assumidos. Timeline 01 liberada para execução. ☕
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
