export type TelepatiaAnswer = "talvez" | "definitivamente";
export type FinalAnswer = "quero" | "depende";

/** Como a carta se organiza na tela. */
export type TrackLayout = "left" | "right" | "cinematic" | "secret";

/**
 * Cada faixa é uma carta: dados do Spotify, símbolo, numeral e o texto
 * do capítulo. Nada de mensagem hardcoded dentro de componente.
 */
export interface Track {
  /** Posição na leitura. 8 é a carta que não está na leitura. */
  id: number;
  /** Numeral romano exibido no lugar do número árabe. */
  numeral: string;
  /** ✦ ☾ ♡ ✧ ☽ — o símbolo daquele capítulo. */
  symbol: string;
  title: string;
  artist: string;
  /** ID de 22 caracteres da faixa no Spotify. */
  spotifyId: string;
  spotifyUrl: string;
  spotifyEmbedUrl: string;
  /** Capa em 640px. */
  cover: string;
  /** Mesma capa em 300px, usada se a de 640 falhar. */
  coverFallback: string;
  /** Aura da carta. Sempre dentro da família rosa / vinho / lilás / magenta. */
  accent: string;
  accentSecondary: string;
  layout: TrackLayout;
  /** Frase principal do capítulo. */
  message: string;
  /** Frase que aparece depois — o "twist" de cada carta. */
  secondaryMessage?: string;
  /** Atraso, em ms, até revelar a segunda frase. */
  secondaryDelay?: number;
  /** Se a segunda frase ganha destaque grande em vez de virar nota pequena. */
  secondaryEmphasis?: boolean;
  /** Comentário da leitura, em voz de tarot. Aparece bem pequeno. */
  aside?: string;
  /** Rótulo do botão de avanço. */
  nextLabel?: string;
}

export interface ExperienceState {
  telepatiaAnswer: TelepatiaAnswer | null;
  finalAnswer: FinalAnswer | null;
  completedExperience: boolean;
  /** Se ela já achou o arbusto escondido na interface. */
  arbustoEasterEggFound: boolean;
  /** Quantos lacinhos ela já encontrou. Máximo 3. */
  bowsFound: number;
}
