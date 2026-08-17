"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sprout } from "@/components/eggs/Glyphs";
import { useEggs } from "@/components/eggs/EasterEggProvider";

/** A conversinha. Uma fala por clique, e só acontece uma vez por sessão. */
const dialogue = [
  "hm?",
  "isso definitivamente não estava aqui antes.",
  "parece que um arbusto invadiu a leitura.",
  "Arbusto: oi.",
  "Arbusto: pode continuar, eu só tava vendo se você ia clicar nisso.",
];

const RAPID_WINDOW = 2000;
const RAPID_TAPS = 5;
const SESSION_KEY = "arbustoEasterEggShown";

/**
 * A plantinha do canto. Clicar revela a conversa; cinco toques rápidos
 * abrem a transmissão secreta (é o caminho do celular, onde não dá pra
 * digitar "arbusto").
 */
export function PlantCorner({ visible }: { visible: boolean }) {
  const { openTransmission, markArbustoFound } = useEggs();
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const taps = useRef<number[]>([]);

  useEffect(() => {
    try {
      setDone(window.sessionStorage.getItem(SESSION_KEY) === "true");
    } catch {
      // Sem sessionStorage, o estado em memória ainda garante a sessão atual.
    }
  }, []);

  // Depois da última fala, fecha sozinha.
  useEffect(() => {
    if (step < dialogue.length - 1) return;

    const timer = window.setTimeout(() => {
      setStep(-1);
      setDone(true);
      markArbustoFound();
      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // A conversa continua funcionando mesmo com storage bloqueado.
      }
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [step, markArbustoFound]);

  const onClick = useCallback(() => {
    // A plantinha do canto NÃO entra no código lua→estrela→coração→planta.
    // Esse símbolo fica só na carta secreta, senão a conversinha bagunça a sequência.
    const now = Date.now();
    taps.current = [...taps.current, now].filter(
      (time) => now - time < RAPID_WINDOW,
    );

    if (taps.current.length >= RAPID_TAPS) {
      taps.current = [];
      setStep(-1);
      setDone(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // A transmissão ainda pode abrir sem storage.
      }
      openTransmission();
      return;
    }

    if (done) return;
    setStep((current) => Math.min(current + 1, dialogue.length - 1));
  }, [done, openTransmission]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pb-safe pl-safe fixed bottom-4 left-4 z-40 flex items-end gap-3 sm:bottom-5 sm:left-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <button
            type="button"
            onClick={onClick}
            aria-label="uma plantinha"
            className="group -m-3 rounded-full p-3 text-petal-light/25 transition-colors duration-500 hover:text-petal-light/80 focus-visible:text-petal-light"
          >
            <Sprout
              size={19}
              className="transition-transform duration-500 ease-cinema group-hover:-translate-y-0.5 group-hover:rotate-3"
            />
          </button>

          <AnimatePresence mode="wait">
            {step >= 0 && (
              <motion.p
                key={step}
                role="status"
                initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mb-2 max-w-[15rem] text-left font-serif text-[0.8rem] italic leading-snug text-petal-light/85 sm:max-w-xs sm:text-sm"
                style={{ textShadow: "0 0 20px rgba(9,3,7,0.95)" }}
              >
                {dialogue[step]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
