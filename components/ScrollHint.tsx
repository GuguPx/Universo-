"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Em telas baixas o capítulo não cabe inteiro, e o botão de avançar fica
 * abaixo da dobra. Isso aqui aparece só nesse caso, e some assim que a
 * pessoa chega no fim da seção.
 */
export function ScrollHint({ visible }: { visible: boolean }) {
  const reduce = useReducedMotion();
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    if (!visible) {
      setNeedsScroll(false);
      return;
    }

    const check = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight > 40;
      const atBottom =
        window.scrollY + window.innerHeight >= doc.scrollHeight - 24;
      setNeedsScroll(scrollable && !atBottom);
    };

    // Um respiro antes de aparecer: o capítulo ainda está entrando.
    const initial = window.setTimeout(check, 1200);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && needsScroll && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="rounded-full border border-petal-light/15 bg-ink/60 p-1.5 backdrop-blur-sm"
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <ChevronDown className="h-4 w-4 text-petal-light/45" />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
