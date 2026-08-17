"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Sprout } from "@/components/eggs/Glyphs";
import { TarotCorners } from "@/components/TarotOrnaments";
import type { FinalAnswer } from "@/types/track";

const content: Record<
  FinalAnswer,
  { status: string; rows: [string, string][]; closing: string }
> = {
  quero: {
    status: "registrando informação…",
    rows: [
      ["pedido enviado para", "ARBUSTO"],
      ["status", "muito feliz, provavelmente."],
    ],
    closing: "ele vai tentar agir normalmente depois disso.",
  },
  depende: {
    status: "consultando responsável pela organização…",
    rows: [["responsável encontrado", "Arbusto"]],
    closing: "acho que essa negociação vai precisar acontecer pessoalmente.",
  },
};

/**
 * Uma interfacezinha falsa de confirmação. É piada, e tem que parecer
 * piada — por isso a fonte mono e o status escrito como gente.
 */
export function RequestReceipt({ answer }: { answer: FinalAnswer }) {
  const reduce = useReducedMotion();
  const data = content[answer];

  return (
    <div className="flex w-full flex-col items-center">
      <Reveal delay={0}>
        <p className="font-mono text-[0.72rem] lowercase tracking-wide text-mauve/70">
          {data.status}
        </p>
      </Reveal>

      <Reveal delay={1600} className="mt-5 w-full">
        <motion.div
          className="relative mx-auto w-full max-w-[19rem] rounded-2xl border border-petal-light/30 px-5 py-5 text-left"
          style={{
            background:
              "linear-gradient(165deg, rgba(42,10,26,0.92), rgba(20,8,16,0.92))",
            boxShadow: "0 0 38px rgba(217,74,140,0.18)",
          }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0.2 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <TarotCorners inset="7px" size={13} />

          <dl className="space-y-3">
            {data.rows.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[0.58rem] uppercase tracking-widestx text-petal-light/55">
                  {label}
                </dt>
                <dd className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.8rem] text-cream">
                  {value}
                  {value.toLowerCase().includes("arbusto") && (
                    <Sprout size={13} className="shrink-0 text-petal-light" />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </Reveal>

      <Reveal delay={3400} className="mt-6">
        <p className="text-balance font-serif text-[1.15rem] leading-snug text-petal-light sm:text-[1.35rem]">
          {data.closing}
        </p>
      </Reveal>
    </div>
  );
}
