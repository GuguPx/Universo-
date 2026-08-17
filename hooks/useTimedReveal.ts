"use client";

import { useEffect, useState } from "react";

/**
 * Vira `true` depois de `delay` ms — mas só enquanto `active`.
 * Reseta quando `active` volta a ser falso, então trocar de capítulo
 * recomeça a contagem naturalmente.
 */
export function useTimedReveal(delay: number, active = true): boolean {
  const [revealed, setRevealed] = useState(delay <= 0 && active);

  useEffect(() => {
    if (!active) {
      setRevealed(false);
      return;
    }

    if (delay <= 0) {
      setRevealed(true);
      return;
    }

    const timer = window.setTimeout(() => setRevealed(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay, active]);

  return revealed;
}

/**
 * Versão em cascata: recebe uma lista de atrasos e devolve quantos
 * já venceram. Usado nas correntes de frases da faixa 07.
 */
export function useSequence(delays: number[], active = true): number {
  const [step, setStep] = useState(0);
  const key = delays.join(",");

  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }

    const timers = delays.map((delay, index) =>
      window.setTimeout(() => setStep((current) => Math.max(current, index + 1)), delay),
    );

    return () => timers.forEach(window.clearTimeout);
    // `key` representa a lista de atrasos de forma estável entre renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, active]);

  return step;
}
