"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { patchState, readState } from "@/lib/storage";

/** Os quatro símbolos do código secreto, na ordem certa. */
export type SequenceSymbol = "moon" | "star" | "heart" | "plant";
const SEQUENCE: SequenceSymbol[] = ["moon", "star", "heart", "plant"];

/**
 * Duas caras que combinam com ela. O site começa fofo e vai ficando
 * dark-cute conforme o flerte fica menos disfarçado.
 */
export type Mood = "cute" | "mischievous";

interface Achievement {
  title: string;
  body?: string;
}

interface EggContextValue {
  mood: Mood;
  bowsFound: number;
  /** Cada laço tem id próprio pra não contar duas vezes. */
  collectBow: (id: string) => void;
  hasBow: (id: string) => boolean;
  arbustoFound: boolean;
  markArbustoFound: () => void;
  transmissionOpen: boolean;
  openTransmission: () => void;
  closeTransmission: () => void;
  pushSymbol: (symbol: SequenceSymbol) => void;
  achievement: Achievement | null;
  announce: (achievement: Achievement) => void;
  dismissAchievement: () => void;
}

const EggContext = createContext<EggContextValue | null>(null);

export function useEggs(): EggContextValue {
  const context = useContext(EggContext);
  if (!context) {
    throw new Error("useEggs precisa estar dentro de <EasterEggProvider>.");
  }
  return context;
}

export function EasterEggProvider({
  mood,
  children,
}: {
  mood: Mood;
  children: ReactNode;
}) {
  const [bows, setBows] = useState<string[]>([]);
  const [arbustoFound, setArbustoFound] = useState(false);
  const [transmissionOpen, setTransmissionOpen] = useState(false);
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [progress, setProgress] = useState(0);

  // O que já foi encontrado antes fica registrado. Os laços conhecidos
  // voltam marcados para a contagem não mentir depois de um refresh.
  useEffect(() => {
    const saved = readState();
    setArbustoFound(saved.arbustoEasterEggFound);

    const knownBows = ["carta-2", "carta-4", "carta-6"];
    if (saved.bowsFound > 0) {
      setBows(knownBows.slice(0, Math.min(saved.bowsFound, knownBows.length)));
    }
  }, []);

  const announce = useCallback((next: Achievement) => {
    setAchievement(next);
  }, []);

  const dismissAchievement = useCallback(() => setAchievement(null), []);

  const collectBow = useCallback((id: string) => {
    setBows((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      patchState({ bowsFound: Math.min(next.length, 3) });
      return next;
    });
  }, []);

  const hasBow = useCallback((id: string) => bows.includes(id), [bows]);

  const markArbustoFound = useCallback(() => {
    setArbustoFound(true);
    patchState({ arbustoEasterEggFound: true });
  }, []);

  const openTransmission = useCallback(() => {
    setTransmissionOpen(true);
    setArbustoFound(true);
    patchState({ arbustoEasterEggFound: true });
  }, []);

  const closeTransmission = useCallback(() => setTransmissionOpen(false), []);

  const pushSymbol = useCallback(
    (symbol: SequenceSymbol) => {
      setProgress((current) => {
        // Certo continua a sequência; errado recomeça (e talvez já valha 1).
        if (SEQUENCE[current] === symbol) {
          const next = current + 1;
          if (next === SEQUENCE.length) {
            announce({
              title: "achievement desbloqueado: curiosa demais ✦",
              body: "o Arbusto previu que você faria isso.",
            });
            return 0;
          }
          return next;
        }
        return symbol === SEQUENCE[0] ? 1 : 0;
      });
    },
    [announce],
  );

  const value = useMemo(
    () => ({
      mood,
      bowsFound: bows.length,
      collectBow,
      hasBow,
      arbustoFound,
      markArbustoFound,
      transmissionOpen,
      openTransmission,
      closeTransmission,
      pushSymbol,
      achievement,
      announce,
      dismissAchievement,
    }),
    [
      mood,
      bows,
      collectBow,
      hasBow,
      arbustoFound,
      markArbustoFound,
      transmissionOpen,
      openTransmission,
      closeTransmission,
      pushSymbol,
      achievement,
      announce,
      dismissAchievement,
    ],
  );

  return <EggContext.Provider value={value}>{children}</EggContext.Provider>;
}
