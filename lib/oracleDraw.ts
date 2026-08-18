import {
  COUNT_KEY,
  LEGENDARY_EVERY,
  insistenceCard,
  lateNightCard,
  legendaryCard,
  oracleCards,
  type OracleCard,
} from "@/data/oracle";

export function readConsultationCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(COUNT_KEY);
    const count = Number(raw);
    return Number.isFinite(count) && count > 0 ? count : 0;
  } catch {
    return 0;
  }
}

export function bumpConsultationCount(): number {
  const next = readConsultationCount() + 1;
  try {
    window.localStorage.setItem(COUNT_KEY, String(next));
  } catch {
    // Safari privado, quota, etc.
  }
  return next;
}

function pickWeighted(cards: OracleCard[], avoidId?: string): OracleCard {
  const pool = cards.filter((card) => card.id !== avoidId);
  const usable = pool.length > 0 ? pool : cards;
  const total = usable.reduce((sum, card) => sum + card.weight, 0);
  let roll = Math.random() * total;

  for (const card of usable) {
    roll -= card.weight;
    if (roll <= 0) return card;
  }

  return usable[usable.length - 1];
}

export function isLateNight(date = new Date()) {
  const hour = date.getHours();
  return hour >= 23 || hour < 6;
}

export function drawOracleCard(options: {
  sessionAsks: number;
  avoidId?: string;
}): { card: OracleCard; nag?: string } {
  const total = bumpConsultationCount();
  const asks = options.sessionAsks;

  if (asks >= 13) {
    return {
      card: insistenceCard,
      nag: asks === 13 ? "tá bom. última." : "você realmente não cansa, né.",
    };
  }

  if (asks === 12) {
    return {
      card: pickWeighted(oracleCards, options.avoidId),
      nag: "as cartas também precisam descansar.",
    };
  }

  if (asks === 10) {
    return {
      card: pickWeighted(oracleCards, options.avoidId),
      nag: "Vitória.",
    };
  }

  if (asks === 7) {
    return {
      card: pickWeighted(oracleCards, options.avoidId),
      nag: "você está tentando manipular o destino?",
    };
  }

  if (total > 0 && total % LEGENDARY_EVERY === 0) {
    return { card: legendaryCard };
  }

  // Uma em cada ~90 consultas. Raro o bastante pra parecer acidente.
  if (Math.random() < 1 / 90) {
    return { card: legendaryCard };
  }

  if (isLateNight() && Math.random() < 0.42) {
    return { card: lateNightCard };
  }

  const pool = [...oracleCards, { ...legendaryCard, weight: 1 }];
  return { card: pickWeighted(pool, options.avoidId) };
}
