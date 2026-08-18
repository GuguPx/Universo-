import { READING_FOR } from "@/data/tracks";

export type OracleRarity = "comum" | "rara" | "impossível";

export interface OracleCard {
  id: string;
  title: string;
  symbol: string;
  body: string;
  rarity: OracleRarity;
  /** Peso relativo. Comum ≈ 12, rara ≈ 4, impossível ≈ 1. */
  weight: number;
  extra?: string;
  specimen?: string;
  personal?: string;
  rarityLabel?: string;
}

export const oracleCards: OracleCard[] = [
  {
    id: "estrela",
    title: "A Estrela",
    symbol: "✦",
    body: "Há 94% de chance de você merecer comer alguma coisa gostosa hoje. Os outros 6% parecem erro de cálculo.",
    rarity: "comum",
    weight: 12,
  },
  {
    id: "lua",
    title: "A Lua",
    symbol: "☾",
    body: "As cartas recomendam não tomar nenhuma decisão importante depois das 23h. Mandar mensagem para o Arbusto não conta como decisão importante.",
    rarity: "comum",
    weight: 12,
  },
  {
    id: "cochilo",
    title: "O Cochilo",
    symbol: "✧",
    body: "Seu destino aponta para 20 minutos de descanso que misteriosamente se transformarão em 2 horas.",
    rarity: "comum",
    weight: 12,
  },
  {
    id: "princesa",
    title: "A Princesa Rosa",
    symbol: "🎀",
    body: "Você está autorizada oficialmente a comprar ou admirar algo desnecessariamente bonitinho hoje.",
    rarity: "comum",
    weight: 11,
  },
  {
    id: "caos",
    title: "A Carta do Caos",
    symbol: "☽",
    body: `Não conseguimos prever seu dia. A ${READING_FOR} aparentemente alterou a linha temporal novamente.`,
    rarity: "rara",
    weight: 5,
  },
  {
    id: "sacerdotisa",
    title: "A Sacerdotisa",
    symbol: "✦",
    body: "Sua intuição provavelmente já sabe a resposta. O problema é que ela gosta de fazer suspense.",
    rarity: "comum",
    weight: 11,
  },
  {
    id: "copas",
    title: "Dois de Copas",
    symbol: "♡",
    body: "Existe uma possibilidade estatisticamente suspeita de alguém querer passar um tempo com você.",
    rarity: "rara",
    weight: 5,
  },
  {
    id: "docinho",
    title: "A Carta do Docinho",
    symbol: "♡",
    body: "As energias estão muito claras: sobremesa.",
    rarity: "comum",
    weight: 12,
  },
  {
    id: "mercurio",
    title: "Mercúrio Culpado",
    symbol: "✧",
    body: "Se algo der errado hoje, culpe Mercúrio. O departamento jurídico autorizou.",
    rarity: "comum",
    weight: 10,
  },
  {
    id: "arbusto",
    title: "A Carta do Arbusto",
    symbol: "🌱",
    body: `Previsão rara encontrada: um certo Arbusto espera que você esteja tendo um dia bom.`,
    rarity: "rara",
    weight: 4,
  },
  {
    id: "invertido",
    title: "O Arbusto Invertido",
    symbol: "🌱",
    body: "Significado: Augusto tentando agir normalmente depois de receber uma mensagem sua.",
    rarity: "rara",
    weight: 4,
  },
  {
    id: "get-you",
    title: "Get You",
    symbol: "♡",
    body: "O oráculo parou de funcionar e começou a tocar Daniel Caesar. Estranhamente previsível.",
    rarity: "rara",
    weight: 4,
  },
  {
    id: "descanso",
    title: "A Carta do Descanso",
    symbol: "☾",
    body: "Sua produtividade não será auditada pelo universo hoje. Pode respirar.",
    rarity: "comum",
    weight: 11,
  },
  {
    id: "curiosidade",
    title: "A Carta da Curiosidade",
    symbol: "✦",
    body: "Você provavelmente vai clicar em algo neste site que claramente não deveria.",
    rarity: "comum",
    weight: 10,
  },
  {
    id: "rosa",
    title: "A Rosa",
    symbol: "✧",
    body: "Há algo bonito no seu dia que você ainda não percebeu.",
    rarity: "comum",
    weight: 11,
  },
  {
    id: "cientifica",
    title: "A Carta Extremamente Científica",
    symbol: "✦",
    body: "Probabilidade de você ser um amor de pessoa: 99,97%. Margem de erro: irrelevante.",
    rarity: "rara",
    weight: 5,
  },
];

export const lateNightCard: OracleCard = {
  id: "lua-tardia",
  title: "A Lua Tardia",
  symbol: "☾",
  body: "O oráculo detectou que já está tarde.",
  extra:
    "recomendação oficial: diminuir o brilho da tela, colocar uma música boa e parar de cobrar tanto de si mesma.",
  rarity: "rara",
  weight: 0,
};

export const insistenceCard: OracleCard = {
  id: "insistencia",
  title: "O Arbusto",
  symbol: "🌱",
  body: "eu sabia que você não ia parar até aparecer essa.",
  rarity: "impossível",
  weight: 0,
  rarityLabel: "???",
};

export const legendaryCard: OracleCard = {
  id: "lendario",
  title: "O Arbusto Lendário",
  symbol: "🌱",
  body: "Dizem que aparece apenas uma vez a cada 847 consultas.\n\nNa prática, o desenvolvedor provavelmente manipulou as probabilidades.",
  specimen: `oi, ${READING_FOR}.`,
  personal:
    "eu realmente espero que o seu dia esteja sendo gentil com você. e se não estiver, o Arbusto continua daqui, quietinho, torcendo mesmo assim.",
  rarity: "impossível",
  weight: 1,
  rarityLabel: "???",
};

export const COUNT_KEY = "oracleConsultations";
export const LEGENDARY_EVERY = 847;
