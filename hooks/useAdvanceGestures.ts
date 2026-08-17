"use client";

import { useEffect, useRef } from "react";

interface Options {
  /** Se false, todos os gestos são ignorados (capítulo ainda travado). */
  enabled: boolean;
  onAdvance: () => void;
}

const WHEEL_THRESHOLD = 90;
const SWIPE_THRESHOLD = 60;
const COOLDOWN = 900;

function atBottom() {
  const doc = document.documentElement;
  // Quando o capítulo cabe na tela, isso já é verdade de saída.
  return window.scrollY + window.innerHeight >= doc.scrollHeight - 8;
}

/**
 * Avançar pela experiência sem inventar uma navegação estranha:
 * teclado (setas / page down), roda do mouse no fim da seção,
 * e swipe pra cima ou pra esquerda no toque.
 *
 * O botão "próxima" continua sendo o caminho óbvio — isso aqui é atalho.
 */
export function useAdvanceGestures({ enabled, onAdvance }: Options) {
  const lastFired = useRef(0);
  const wheelAccum = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fire = () => {
      const now = Date.now();
      if (now - lastFired.current < COOLDOWN) return;
      lastFired.current = now;
      wheelAccum.current = 0;
      onAdvance();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName.toLowerCase();
      // Não sequestrar Enter/espaço de quem está num botão ou link.
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === "PageDown"
      ) {
        event.preventDefault();
        fire();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) {
        wheelAccum.current = 0;
        return;
      }
      if (!atBottom()) return;

      wheelAccum.current += event.deltaY;
      if (wheelAccum.current >= WHEEL_THRESHOLD) fire();
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStart.current;
      const touch = event.changedTouches[0];
      touchStart.current = null;
      if (!start || !touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;

      const swipedUp = dy < -SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx);
      const swipedLeft = dx < -SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy);

      // Swipe pra cima só conta se a seção já está no fim — senão é só scroll.
      if ((swipedUp && atBottom()) || swipedLeft) fire();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [enabled, onAdvance]);
}
