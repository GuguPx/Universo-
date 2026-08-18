"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, FileText, Sprout, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { FutureTimelines } from "@/components/FutureTimelines";

const risks = [
  ["Vitória perceber que estou flertando", "100%", "desejável"],
  ["Ela descobrir os easter eggs", "74%", "alto"],
  ["Arbusto ficar com vergonha depois", "98%", "inevitável"],
  ["Ela achar fofo", "aguardando dados", "crítico"],
  ["Get You começar a lembrar ela de mim", "👀", "estratégico"],
];

const timeline = [
  ["24/07", "Conhecer Vitória."],
  ["Fase 02", "Perceber que ela é interessante."],
  ["Fase 03", "Começar a flertar."],
  ["Fase 04", "Questionar se ela percebeu."],
  ["Fase 05", "Em vez de simplesmente perguntar, desenvolver um site inteiro."],
  ["Fase atual", "AGUARDANDO APROVAÇÃO DA VITÓRIA"],
];

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t-4 border-[#1f4b7a] bg-white p-5 shadow-[4px_4px_0_rgba(28,44,62,0.15)] sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1f4b7a] font-mono text-xs font-bold text-white">
          {number}
        </span>
        <h2 className="pt-1 text-xl font-black uppercase tracking-tight text-[#1f2937] sm:text-2xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Metric({
  label,
  value,
  percent,
  tone = "green",
}: {
  label: string;
  value: string;
  percent?: number;
  tone?: "green" | "red" | "blue";
}) {
  const colors = {
    green: "bg-[#18a66a]",
    red: "bg-[#d94b4b]",
    blue: "bg-[#2878bd]",
  };

  return (
    <div className="border border-[#ccd3da] bg-[#f5f6f4] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#4b5563]">
        {label}
      </p>
      <p className="mt-2 break-words font-mono text-sm font-bold text-[#202938]">
        {value}
      </p>
      {percent !== undefined && (
        <div className="mt-3 h-3 border border-[#aeb7c0] bg-white p-[2px]">
          <motion.div
            className={`h-full ${colors[tone]}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}
    </div>
  );
}

export function CorporateReport() {
  const reduce = useReducedMotion();
  const [legalOpen, setLegalOpen] = useState(false);
  const [decision, setDecision] = useState<"approved" | "info" | null>(null);
  const [approvalStep, setApprovalStep] = useState(0);
  const [meetingRequested, setMeetingRequested] = useState(false);

  useEffect(() => {
    if (decision !== "approved") {
      setApprovalStep(0);
      return;
    }

    setApprovalStep(1);
    const informed = window.setTimeout(() => setApprovalStep(2), 1300);
    const next = window.setTimeout(() => setApprovalStep(3), 2800);
    return () => {
      window.clearTimeout(informed);
      window.clearTimeout(next);
    };
  }, [decision]);

  useEffect(() => {
    if (!legalOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLegalOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [legalOpen]);

  return (
    <>
      <div className="space-y-6">
        <header className="border-b-8 border-[#1f4b7a] bg-white shadow-[6px_6px_0_rgba(28,44,62,0.18)]">
          <div className="flex items-center justify-between bg-[#1f2937] px-5 py-3 font-mono text-[0.62rem] uppercase tracking-widest text-white sm:px-8">
            <span>confidencial · uso interno</span>
            <span>versão 24.07</span>
          </div>
          <div className="px-5 py-8 sm:px-9 sm:py-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#d94b4b]">
              apresentação executiva
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#1f2937] sm:text-6xl">
              PROJETO Q-2407
            </h1>
            <div className="mt-7 grid gap-5 border-t border-[#cbd2d9] pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-wide text-[#697586]">
                  objetivo estratégico
                </p>
                <p className="mt-1.5 font-serif text-lg leading-snug text-[#202938]">
                  Conseguir um encontro com Vitória sem parecer desesperadamente
                  óbvio.
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-wide text-[#697586]">
                  responsável pelo projeto
                </p>
                <p className="mt-1.5 text-[#202938]">
                  <span className="mr-2 line-through decoration-[#d94b4b]">
                    Augusto
                  </span>
                  <strong className="inline-flex items-center gap-1 text-[#167a50]">
                    Arbusto <Sprout size={15} />
                  </strong>
                </p>
              </div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="border border-[#cbd2d9] p-3">
                <p className="text-[0.58rem] font-bold uppercase text-[#697586]">
                  início
                </p>
                <p className="mt-1 font-mono text-xs font-bold">24/07/2026</p>
              </div>
              <div className="border border-[#cbd2d9] p-3">
                <p className="text-[0.58rem] font-bold uppercase text-[#697586]">
                  status
                </p>
                <p className="mt-1 font-mono text-xs font-bold text-[#167a50]">
                  EM ANDAMENTO
                </p>
              </div>
              <div className="border border-[#cbd2d9] p-3">
                <p className="text-[0.58rem] font-bold uppercase text-[#697586]">
                  prioridade
                </p>
                <p className="mt-1 font-mono text-xs font-bold text-[#d13d3d]">
                  CRÍTICA
                </p>
              </div>
              <div className="border border-[#cbd2d9] p-3">
                <p className="text-[0.58rem] font-bold uppercase text-[#697586]">
                  proprietário
                </p>
                <p className="mt-1 font-mono text-xs font-bold">ARBUSTO S/A</p>
              </div>
            </div>
          </div>
        </header>

        <Section number="01" title="KPIs do projeto">
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric
              label="Chance de ela já ter percebido o flerte"
              value="██████████████████░░ 92%"
              percent={92}
            />
            <Metric
              label="Quantidade de pensamentos sobre Vitória"
              value="dados insuficientes para processamento"
              tone="blue"
            />
            <Metric label="Sites criados para uma única pessoa" value="3 (e contando)" />
            <Metric
              label="Nível de sutileza do Arbusto"
              value="██░░░░░░░░ 18%"
              percent={18}
              tone="red"
            />
            <Metric
              label="Probabilidade de Get You aparecer"
              value="████████████████████ 100%"
              percent={100}
            />
            <div className="border-2 border-[#1f4b7a] bg-[#eaf1f7] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#4b5563]">
                retorno esperado sobre investimento
              </p>
              <blockquote className="mt-3 border-l-4 border-[#1f4b7a] pl-3 font-serif text-xl italic text-[#1f2937]">
                um encontro já resolve.
              </blockquote>
            </div>
          </div>
        </Section>

        <Section number="02" title="Análise de risco">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#1f2937] text-white">
                  <th className="p-3 text-xs uppercase">Risco</th>
                  <th className="p-3 text-right text-xs uppercase">Probabilidade</th>
                  <th className="p-3 text-right text-xs uppercase">Impacto</th>
                </tr>
              </thead>
              <tbody>
                {risks.map(([risk, probability, impact], index) => (
                  <tr
                    key={risk}
                    className={index % 2 === 0 ? "bg-[#f2f4f2]" : "bg-white"}
                  >
                    <td className="border border-[#d6dbe0] p-3">{risk}</td>
                    <td className="border border-[#d6dbe0] p-3 text-right font-mono">
                      {probability}
                    </td>
                    <td className="border border-[#d6dbe0] p-3 text-right font-bold">
                      {impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="mt-5 border-l-8 border-[#d94b4b] bg-[#fff1f1] p-5 text-sm leading-relaxed">
            <strong>Risco adicional identificado:</strong> Vitória é um amor de
            pessoa. Isso compromete seriamente a imparcialidade do responsável
            pelo projeto.
          </aside>
        </Section>

        <Section number="03" title="Stakeholders">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Vitória", "pessoa que tornou esse projeto desnecessariamente elaborado."],
              ["Arbusto 🌱", "desenvolvedor, gerente, investidor e principal vítima do próprio projeto."],
              ["As cartas", "consultoria externa não certificada."],
              ["Daniel Caesar & Kali Uchis", "fornecedores estratégicos."],
            ].map(([name, role]) => (
              <div key={name} className="border border-[#ccd3da] bg-[#f5f6f4] p-4">
                <p className="font-black text-[#1f2937]">{name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#526071]">
                  <strong>Cargo:</strong> {role}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="04" title="Cronograma / roadmap">
          <ol className="relative ml-3 border-l-4 border-[#1f4b7a]">
            {timeline.map(([phase, event], index) => (
              <li key={phase} className="relative pb-7 pl-7 last:pb-0">
                <span className="absolute -left-[10px] top-0 h-4 w-4 border-4 border-white bg-[#1f4b7a]" />
                <p className="font-mono text-xs font-bold uppercase text-[#1f4b7a]">
                  {phase}
                </p>
                <p
                  className={`mt-1 text-sm leading-relaxed ${
                    index === timeline.length - 1
                      ? "inline-block bg-[#ffe27a] px-2 py-1 font-mono font-bold"
                      : "text-[#374151]"
                  }`}
                >
                  {event}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section number="05" title="Possíveis timelines detectadas pelas cartas">
          <FutureTimelines />
        </Section>

        <Section number="06" title="Orçamento">
          <dl className="grid gap-px overflow-hidden border border-[#ccd3da] bg-[#ccd3da] sm:grid-cols-2">
            {[
              ["Desenvolvimento", "R$ 0"],
              ["Domínio / Vercel", "provavelmente R$ 0"],
              ["Tempo gasto pensando nisso", "confidencial"],
              ["Dignidade do responsável", "severamente comprometida"],
              ["Valor potencial de um encontro com Vitória", "não mensurável"],
            ].map(([term, value], index) => (
              <div
                key={term}
                className={`bg-white p-4 ${
                  index === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <dt className="text-[0.66rem] font-bold uppercase text-[#697586]">
                  {term}
                </dt>
                <dd className="mt-1 font-mono text-sm font-bold text-[#202938]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <section className="border-[6px] border-[#1f2937] bg-white p-5 shadow-[8px_8px_0_#18a66a] sm:p-9">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#d94b4b]">
            aprovação executiva necessária
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#1f2937] sm:text-5xl">
            Solicitação de aprovação
          </h2>

          <div className="mt-7 grid gap-4 border-y border-[#ccd3da] py-6 text-sm sm:grid-cols-2">
            <p>
              <strong>Projeto:</strong>
              <br />
              Encontrar Vitória fora da internet
            </p>
            <p>
              <strong>Solicitante:</strong>
              <br />
              Arbusto 🌱
            </p>
          </div>

          <p className="mt-6 text-xs font-bold uppercase text-[#697586]">
            Justificativa
          </p>
          <blockquote className="mt-2 border-l-4 border-[#1f4b7a] bg-[#eef3f7] p-4 font-serif text-lg italic leading-relaxed">
            aparentemente conversar com você só pela tela não está atendendo às
            metas estratégicas.
          </blockquote>

          {!decision && (
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDecision("approved")}
                className="min-h-[52px] bg-[#168354] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide text-white shadow-[3px_3px_0_#0d5435] transition-transform hover:-translate-y-0.5"
              >
                aprovar projeto
              </button>
              <button
                type="button"
                onClick={() => setDecision("info")}
                className="min-h-[52px] border-2 border-[#1f4b7a] bg-white px-5 py-3 font-mono text-xs font-bold uppercase tracking-wide text-[#1f4b7a] transition-colors hover:bg-[#eaf1f7]"
              >
                solicitar mais informações 👀
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {decision === "approved" && (
              <motion.div
                key="approved"
                className="mt-7 border-2 border-[#168354] bg-[#e9f8f0] p-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="flex items-center gap-2 text-xl font-black text-[#10683f]">
                  <CheckCircle2 size={24} />
                  PROJETO APROVADO
                </p>
                {approvalStep >= 1 && (
                  <p className="mt-4 font-mono text-sm">Notificando responsável…</p>
                )}
                {approvalStep >= 2 && (
                  <motion.p
                    className="mt-3 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Arbusto foi informado e está tentando manter a compostura.
                  </motion.p>
                )}
                {approvalStep >= 3 && (
                  <motion.p
                    className="mt-3 font-bold text-[#10683f]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    próxima etapa: descobrir quando e onde.
                  </motion.p>
                )}
              </motion.div>
            )}

            {decision === "info" && (
              <motion.div
                key="info"
                className="mt-7 border-2 border-[#1f4b7a] bg-[#eaf1f7] p-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="flex items-center gap-2 text-lg font-black text-[#1f4b7a]">
                  <FileText size={22} />
                  Solicitação recebida.
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  O responsável pelo projeto recomenda uma reunião presencial
                  para esclarecimento dos requisitos.
                </p>
                {!meetingRequested ? (
                  <button
                    type="button"
                    onClick={() => setMeetingRequested(true)}
                    className="mt-5 min-h-[48px] bg-[#1f4b7a] px-5 py-3 font-mono text-xs font-bold uppercase text-white"
                  >
                    agendar reunião com Arbusto 🌱
                  </button>
                ) : (
                  <motion.p
                    className="mt-5 font-mono text-sm font-bold text-[#168354]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    reunião solicitada. o Arbusto está olhando a agenda e
                    fingindo naturalidade.
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setLegalOpen(true)}
            className="mt-8 min-h-[36px] font-mono text-[0.58rem] uppercase tracking-widest text-[#697586] underline decoration-dotted underline-offset-4 hover:text-[#1f2937]"
          >
            ver parecer jurídico
          </button>
        </section>

        <footer className="flex flex-col gap-2 border-t border-[#9ba6b2] py-6 font-mono text-[0.58rem] uppercase tracking-widest text-[#667282] sm:flex-row sm:justify-between">
          <span>Projeto Q-2407 · Documento confidencial</span>
          <span>Departamento de decisões questionáveis</span>
        </footer>
      </div>

      <AnimatePresence>
        {legalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/85 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="fechar parecer jurídico"
              onClick={() => setLegalOpen(false)}
              className="absolute inset-0"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-title"
              className="relative w-full max-w-lg border-4 border-[#1f2937] bg-[#fffdf5] p-6 text-[#202938] shadow-[10px_10px_0_#1f4b7a] sm:p-9"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
            >
              <button
                type="button"
                onClick={() => setLegalOpen(false)}
                aria-label="fechar"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-[#4b5563] hover:text-[#111827]"
              >
                <X size={20} />
              </button>
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-widest text-[#d94b4b]">
                documento oficial
              </p>
              <h2 id="legal-title" className="mt-3 text-2xl font-black">
                PARECER JURÍDICO Nº 2407
              </h2>
              <div className="mt-6 space-y-4 border-y-2 border-[#1f2937] py-6 font-serif text-lg leading-relaxed">
                <p>
                  Após análise técnica, concluiu-se que Augusto aparentemente
                  deixou de ser chamado de Augusto.
                </p>
                <p>Para todos os efeitos legais e afetivos, responde agora por:</p>
                <p className="inline-flex items-center gap-2 text-2xl font-bold text-[#168354]">
                  Arbusto. <Sprout size={22} />
                </p>
                <p>Sem mais.</p>
              </div>
              <p className="mt-6 font-mono text-xs font-bold">
                Departamento Jurídico das Cartas ✦
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
