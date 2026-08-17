"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { withAlpha } from "@/lib/color";

/**
 * Não é um cursor customizado — é uma luz fraca que segue o mouse.
 * Some completamente no toque e com prefers-reduced-motion, onde
 * um cursor falso só atrapalharia.
 */
export function PointerGlow({ accent }: { accent: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setActive(true);
    };

    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[420px] w-[420px] rounded-full blur-3xl"
      style={{
        x: smoothX,
        y: smoothY,
        // Centraliza sem usar translate: o transform pertence ao Framer aqui.
        marginLeft: -210,
        marginTop: -210,
        background: `radial-gradient(closest-side, ${withAlpha(accent, 0.13)}, transparent 72%)`,
      }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    />
  );
}
