/**
 * Carregador da IFrame API do Spotify.
 *
 * O embed comum só toca depois de um clique no botão de play. A IFrame API
 * devolve um controle com `play()`, que é o que permite a música começar
 * sozinha quando a carta aparece.
 *
 * O script é global e avisa que está pronto por uma única função no window,
 * então ele é carregado uma vez só e todas as cartas esperam a mesma promise.
 */

export interface SpotifyEmbedController {
  play: () => void;
  pause?: () => void;
  togglePlay?: () => void;
  destroy?: () => void;
  addListener: (event: string, callback: (payload?: unknown) => void) => void;
}

interface SpotifyIframeApi {
  createController: (
    element: HTMLElement,
    options: {
      uri: string;
      width?: string | number;
      height?: string | number;
    },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

const SCRIPT_SRC = "https://open.spotify.com/embed/iframe-api/v1";

let pending: Promise<SpotifyIframeApi> | null = null;

export function loadSpotifyEmbedApi(): Promise<SpotifyIframeApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("sem window"));
  }

  if (!pending) {
    pending = new Promise((resolve, reject) => {
      window.onSpotifyIframeApiReady = resolve;

      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onerror = () =>
        reject(new Error("a iframe api do Spotify não carregou"));

      document.body.appendChild(script);
    });
  }

  return pending;
}
