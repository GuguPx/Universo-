"use client";

import { useEffect, useRef } from "react";

/**
 * Escuta a palavra sendo digitada em qualquer lugar da página, sem campo
 * de texto nenhum. Só letras contam; o buffer deslizante guarda apenas
 * os últimos caracteres necessários para reconhecer a palavra.
 */
export function useTypedWord(word: string, onComplete: () => void) {
  const buffer = useRef("");

  useEffect(() => {
    const target = word.toLowerCase();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const tag = (event.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      // Só letras — ignora espaço, setas, Enter e afins.
      if (event.key.length !== 1 || !/\p{L}/u.test(event.key)) return;

      buffer.current = (buffer.current + event.key.toLowerCase()).slice(
        -target.length,
      );

      if (buffer.current === target) {
        buffer.current = "";
        onComplete();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [word, onComplete]);
}
