"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

/** No celular ninguém digita "arbusto", então a dica vem da própria planta. */
const touchHint = "Arbusto: (psiu. tenta segurar aqui.)";

const RAPID_WINDOW = 2800;
const RAPID_TAPS = 5;
const LONG_PRESS = 650;
const SESSION_KEY = "arbustoEasterEggShown";

/**
 * A plantinha do canto. Clicar revela a conversa; segurar — ou cinco
 * toques rápidos — abre a transmissão secreta. Esses dois caminhos são o
 * equivalente de celular a digitar "arbusto" no teclado.
 */
export function PlantCorner({ visible }: { visible: boolean }) {
  const { openTransmission, markArbustoFound } = useEggs();
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [touch, setTouch] = useState(false);
  const taps = useRef<number[]>([]);
  const pressTimer = useRef<number | null>(null);
  const heldDown = useRef(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);

    try {
      setDone(window.sessionStorage.getItem(SESSION_KEY) === "true");
    } catch {
      // Sem sessionStorage, o estado em memória ainda garante a sessão atual.
    }
  }, []);

  const script = useMemo(
    () => (touch ? [...dialogue, touchHint] : dialogue),
    [touch],
  );

  // Depois da última fala, fecha sozinha.
  useEffect(() => {
    if (step < script.length - 1) return;

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
  }, [step, script.length, markArbustoFound]);

  const reveal = useCallback(() => {
    taps.current = [];
    setStep(-1);
    setDone(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // A transmissão ainda pode abrir sem storage.
    }
    openTransmission();
  }, [openTransmission]);

  const startPress = useCallback(() => {
    heldDown.current = false;
    pressTimer.current = window.setTimeout(() => {
      heldDown.current = true;
      reveal();
    }, LONG_PRESS);
  }, [reveal]);

  const endPress = useCallback(() => {
    if (pressTimer.current !== null) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  }, []);

  useEffect(() => endPress, [endPress]);

  const onClick = useCallback(() => {
    // Segurar já abriu a transmissão; o clique que vem junto não conta.
    if (heldDown.current) {
      heldDown.current = false;
      return;
    }

    // A plantinha do canto NÃO entra no código lua→estrela→coração→planta.
    // Esse símbolo fica só na carta secreta, senão a conversinha bagunça a sequência.
    const now = Date.now();
    taps.current = [...taps.current, now].filter(
      (time) => now - time < RAPID_WINDOW,
    );

    if (taps.current.length >= RAPID_TAPS) {
      reveal();
      return;
    }

    if (done) return;
    setStep((current) => Math.min(current + 1, script.length - 1));
  }, [done, reveal, script.length]);

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
            onPointerDown={startPress}
            onPointerUp={endPress}
            onPointerLeave={endPress}
            onPointerCancel={endPress}
            onContextMenu={(event) => event.preventDefault()}
            aria-label="uma plantinha"
            className="glyph-secret group -m-3 select-none rounded-full p-3 [-webkit-touch-callout:none]"
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
                {script[step]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
