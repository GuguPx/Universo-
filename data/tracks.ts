import type { Track } from "@/types/track";

export const PLAYLIST_URL =
  "https://open.spotify.com/playlist/4DQlYwD6WkDf3KK7vLp2Dp?si=f41bd7963fab4e02";

/** Para quem a leitura foi feita. */
export const READING_FOR = "Quemilly";

const COVER_640 = "https://i.scdn.co/image/ab67616d0000b273";
const COVER_300 = "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02";

function embed(id: string) {
  return `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
}

interface TrackSeed extends Omit<
  Track,
  "spotifyUrl" | "spotifyEmbedUrl" | "cover" | "coverFallback"
> {
  /** Hash da imagem no CDN do Spotify, sem o prefixo de tamanho. */
  coverHash: string;
}

const seeds: TrackSeed[] = [
  {
    id: 1,
    numeral: "I",
    symbol: "✦",
    title: "Shut up My Moms Calling",
    artist: "Hotel Ugly",
    spotifyId: "3hxIUxnT27p5WcmjGUXNwx",
    coverHash: "350ab7a839c04bfd5225a9f5",
    // Começo: rosa muito escuro, quase só mistério.
    accent: "#8E2C57",
    accentSecondary: "#3A1024",
    layout: "left",
    message: "Essa é pra começar sem parecer que eu pensei demais nisso.",
    secondaryMessage: "Eu pensei.",
    secondaryDelay: 1000,
    secondaryEmphasis: true,
  },
  {
    id: 2,
    numeral: "II",
    symbol: "✧",
    title: "Pink + White",
    artist: "Frank Ocean",
    spotifyId: "3xKsf9qdS1CyvXSMEid6g8",
    coverHash: "c5649add07ed3720be9d5526",
    accent: "#C0407A",
    accentSecondary: "#4A1632",
    layout: "right",
    message: "Tem algumas músicas que simplesmente deixam tudo mais bonito.",
    secondaryMessage: "Essa é uma delas.",
    secondaryDelay: 1400,
    secondaryEmphasis: true,
  },
  {
    id: 3,
    numeral: "III",
    symbol: "☽",
    title: "double take",
    artist: "Dhruv",
    spotifyId: "0QzuaeCEEOV40Pn7IvKEny",
    coverHash: "6f04e53cb5309f8e88286842",
    accent: "#D0538E",
    accentSecondary: "#56173A",
    layout: "left",
    message:
      "Essa entrou porque em algum momento eu comecei a te olhar um pouquinho diferente.",
    // Aqui a leitura fica pessoal pela primeira vez.
    secondaryMessage:
      "Quemilly, essa talvez tenha sido escolhida com segundas intenções.",
    secondaryDelay: 6000,
  },
  {
    id: 4,
    numeral: "IV",
    symbol: "☾",
    title: "telepatía",
    artist: "Kali Uchis",
    spotifyId: "6tDDoYIxWvMLTdKpjFkc1B",
    coverHash: "044a5466dac00f7b3c570b99",
    // A carta da lua: rosa + lilás.
    accent: "#D94A8C",
    accentSecondary: "#8B4FC4",
    layout: "right",
    message:
      "Às vezes a gente conversa e eu fico com a impressão de que existe uma sintonia meio suspeita aqui.",
    secondaryMessage: "Você também acha?",
    secondaryDelay: 1200,
  },
  {
    id: 5,
    numeral: "V",
    symbol: "♡",
    title: "Best Part",
    artist: "Daniel Caesar feat. H.E.R.",
    spotifyId: "1RMJOxR6GRPsBHL8qeC2ux",
    coverHash: "3138f891f3075c9c5d944037",
    // Rosa queimado + vinho.
    accent: "#C2426B",
    accentSecondary: "#5C1526",
    layout: "left",
    message:
      "Essa provavelmente é uma das músicas mais perigosas de colocar aqui.",
    secondaryMessage: "Porque se eu explicar, vou acabar entregando demais.",
  },
  {
    id: 6,
    numeral: "VI",
    symbol: "✧",
    title: "Fall In Love Alone",
    artist: "Stacey Ryan",
    spotifyId: "5xwBIieMMFUmLDgvG4DjFe",
    coverHash: "c0e833f8baa95fdcbcc4f65a",
    // A luz do quarto esquenta.
    accent: "#E8639C",
    accentSecondary: "#7A1E4C",
    layout: "right",
    message: "O nome dessa já começa a representar um problema…",
    secondaryMessage: "…porque fazer isso sozinho seria meio sem graça.",
    secondaryDelay: 1500,
    secondaryEmphasis: true,
    aside: "as cartas estão começando a ficar inconvenientemente específicas.",
    nextLabel: "Continuar",
  },
  {
    id: 7,
    numeral: "VII",
    symbol: "✦",
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    spotifyId: "5XeFesFbtLpXzIVDNQP22n",
    coverHash: "4ae1c4c5c45aabe565499163",
    // Rosa escuro, vinho, preto.
    accent: "#A22A5C",
    accentSecondary: "#3D0F26",
    layout: "cinematic",
    message: "Eu poderia escrever um textão explicando por que essa foi a última.",
  },
  {
    id: 8,
    numeral: "",
    symbol: "♡",
    title: "Get You",
    artist: "Daniel Caesar feat. Kali Uchis",
    spotifyId: "2uP6t2J5MEwhr9rDkAAzwh",
    coverHash: "7aa8783ad8def37cc548a9cf",
    // O ponto mais bonito da experiência inteira.
    accent: "#F06AA6",
    accentSecondary: "#8A1F52",
    layout: "secret",
    message: "Eu tinha mais uma.",
    secondaryMessage: "Mas essa não precisava de carta nenhuma.",
  },
];

function hydrate(seed: TrackSeed): Track {
  const { coverHash, ...rest } = seed;
  return {
    ...rest,
    spotifyUrl: `https://open.spotify.com/track/${seed.spotifyId}`,
    spotifyEmbedUrl: embed(seed.spotifyId),
    cover: `${COVER_640}${coverHash}`,
    coverFallback: `${COVER_300}${coverHash}`,
  };
}

/** As 7 cartas da leitura. */
export const tracks: Track[] = seeds
  .filter((seed) => seed.id <= 7)
  .map(hydrate);

/** A oitava. A que existe fora da leitura. */
export const secretTrack: Track = hydrate(
  seeds.find((seed) => seed.id === 8)!,
);

export const TOTAL_TRACKS = tracks.length;
export const TOTAL_NUMERAL = "VII";

/**
 * O resto da playlist. Aparece só como sussurro no final —
 * quase ilegível, de propósito.
 */
export const otherTracks = [
  "Sure Thing",
  "Snooze",
  "Hrs & Hrs",
  "See You Again",
  "My Love Mine All Mine",
  "Heartbreak Anniversary",
  "Love Songs",
  "Feel It",
  "Tip Toe",
  "I Love You So",
  "Poison",
  "Over",
];

/** As falas do encerramento verdadeiro, na ordem em que chegam. */
export const secretLines = [
  "Eu já sabia que tinha que estar aqui.",
  "até porque seria meio impossível fazer algo pra você e esquecer justo essa.",
  "você ama essa música.",
  "e agora eu provavelmente vou lembrar de você quando ela tocar também.",
];
