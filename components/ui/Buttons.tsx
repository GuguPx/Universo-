"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface AdvanceButtonProps {
  onClick: () => void;
  label?: string;
  /** Símbolo à direita. ✦ por padrão. */
  sigil?: string;
  /** true = rosa cheio; false = rosa translúcido. */
  primary?: boolean;
  className?: string;
}

/**
 * O caminho óbvio pra frente. No hover ganha glow rosa, um respiro de
 * largura à direita e o símbolo anda alguns pixels.
 */
export function AdvanceButton({
  onClick,
  label = "próxima carta",
  sigil = "✦",
  primary = false,
  className = "",
}: AdvanceButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={false}
      whileHover={reduce ? undefined : { paddingRight: 34, scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`group inline-flex min-h-[48px] items-center gap-3 rounded-full py-3 pl-6 pr-6 text-[0.95rem] backdrop-blur-sm transition-[background-color,border-color,box-shadow,color] duration-500 ${
        primary
          ? "border border-petal/60 bg-petal text-cream shadow-[0_0_30px_rgba(217,74,140,0.28)] hover:bg-rosepink hover:shadow-[0_0_46px_rgba(217,74,140,0.5)]"
          : "border border-petal-light/30 bg-petal/[0.08] text-cream/85 hover:border-petal-light/55 hover:bg-petal/[0.16] hover:text-cream hover:shadow-[0_0_30px_rgba(217,74,140,0.35)]"
      } ${className}`}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`text-[0.85em] transition-transform duration-500 ease-cinema group-hover:translate-x-1 ${
          primary ? "text-cream" : "text-petal-light"
        }`}
      >
        {sigil}
      </span>
    </motion.button>
  );
}

interface ChoiceButtonProps {
  onClick: () => void;
  children: ReactNode;
  /** Aura da carta, usada no glow do hover. */
  accent?: string;
  selected?: boolean;
  dimmed?: boolean;
  disabled?: boolean;
  /** O botão mais rosa da tela. Usado só na resposta final. */
  primary?: boolean;
}

/** Botão de resposta. Ganha um halo na cor da carta quando você chega perto. */
export function ChoiceButton({
  onClick,
  children,
  accent = "#D94A8C",
  selected = false,
  dimmed = false,
  disabled = false,
  primary = false,
}: ChoiceButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      animate={{ opacity: dimmed ? 0.28 : 1 }}
      whileHover={disabled || reduce ? undefined : { y: -2, scale: 1.02 }}
      whileTap={disabled || reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={
        selected
          ? { borderColor: accent, boxShadow: `0 0 40px -6px ${accent}` }
          : undefined
      }
      className={`group relative min-h-[52px] w-full rounded-full px-7 py-3.5 text-[0.95rem] backdrop-blur-sm transition-[background-color,border-color,box-shadow,color] duration-500 disabled:cursor-default sm:w-auto ${
        primary
          ? "border border-petal/70 bg-petal text-cream shadow-[0_0_34px_rgba(217,74,140,0.34)] hover:bg-rosepink hover:shadow-[0_0_54px_rgba(217,74,140,0.55)]"
          : "border border-petal-light/30 bg-petal/[0.08] text-cream/85 hover:border-petal-light/55 hover:bg-petal/[0.16] hover:text-cream hover:shadow-[0_0_30px_rgba(217,74,140,0.35)]"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-45"
        style={{ background: accent }}
      />
      <span className="relative">{children}</span>
    </motion.button>
  );
}

interface QuietButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

/** Para os convites pequenos: "hmm…", "por quê?". */
export function QuietButton({
  onClick,
  children,
  className = "",
}: QuietButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`min-h-[44px] rounded-full border border-petal-light/20 px-5 py-2.5 font-mono text-xs lowercase tracking-wider text-mauve/70 transition-colors duration-500 hover:border-petal-light/45 hover:text-cream ${className}`}
    >
      {children}
    </motion.button>
  );
}
