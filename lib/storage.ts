import type {
  ExperienceState,
  FinalAnswer,
  TelepatiaAnswer,
} from "@/types/track";

const STORAGE_KEY = "playlist-experience";
const ARBUSTO_KEY = "arbustoEasterEggFound";
const BOWS_KEY = "bowsFound";

export const emptyState: ExperienceState = {
  telepatiaAnswer: null,
  finalAnswer: null,
  completedExperience: false,
  arbustoEasterEggFound: false,
  bowsFound: 0,
};

function isTelepatia(value: unknown): value is TelepatiaAnswer {
  return value === "talvez" || value === "definitivamente";
}

function isFinal(value: unknown): value is FinalAnswer {
  return value === "quero" || value === "depende";
}

/** Lê o estado salvo. Nunca lança — se algo estiver corrompido, começa do zero. */
export function readState(): ExperienceState {
  if (typeof window === "undefined") return emptyState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const directArbusto = window.localStorage.getItem(ARBUSTO_KEY) === "true";
    const directBows = Number(window.localStorage.getItem(BOWS_KEY));

    if (!raw) {
      return {
        ...emptyState,
        arbustoEasterEggFound: directArbusto,
        bowsFound: Number.isFinite(directBows)
          ? Math.min(Math.max(directBows, 0), 3)
          : 0,
      };
    }

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return emptyState;

    const record = parsed as Record<string, unknown>;
    const bows = Number(record.bowsFound);

    return {
      telepatiaAnswer: isTelepatia(record.telepatiaAnswer)
        ? record.telepatiaAnswer
        : null,
      finalAnswer: isFinal(record.finalAnswer) ? record.finalAnswer : null,
      completedExperience: record.completedExperience === true,
      arbustoEasterEggFound:
        record.arbustoEasterEggFound === true || directArbusto,
      bowsFound: Math.max(
        Number.isFinite(bows) ? Math.min(Math.max(bows, 0), 3) : 0,
        Number.isFinite(directBows)
          ? Math.min(Math.max(directBows, 0), 3)
          : 0,
      ),
    };
  } catch {
    return emptyState;
  }
}

/** Salva um pedaço do estado, preservando o resto. */
export function patchState(patch: Partial<ExperienceState>): ExperienceState {
  const next = { ...readState(), ...patch };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      // Mantém também as chaves literais dos easter eggs. Além de deixar o
      // estado fácil de inspecionar, isso preserva o contrato da experiência.
      window.localStorage.setItem(
        ARBUSTO_KEY,
        String(next.arbustoEasterEggFound),
      );
      window.localStorage.setItem(BOWS_KEY, String(next.bowsFound));
    } catch {
      // Modo privado do Safari, quota estourada, etc. A experiência segue igual.
    }
  }

  return next;
}
