import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // O preto existe só pra fazer o rosa brilhar.
        ink: {
          DEFAULT: "#090307",
          soft: "#140810",
          veil: "#1c0d16",
        },
        wine: {
          DEFAULT: "#711A46",
          deep: "#4A1632",
        },
        petal: {
          DEFAULT: "#D94A8C",
          light: "#F28BBC",
          soft: "#F7B6D2",
        },
        rosepink: "#E66A9F",
        magenta: "#B82D70",
        lilac: "#C69BF4",
        cream: "#FFF5F9",
        mauve: "#D7A9BD",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widestx: "0.32em",
        arcana: "0.45em",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        aura: "0 0 40px rgba(217, 74, 140, 0.12), 0 0 100px rgba(217, 74, 140, 0.05)",
        "aura-warm":
          "0 0 50px rgba(217, 74, 140, 0.2), 0 0 130px rgba(217, 74, 140, 0.09)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.015)" },
        },
        // As auras do fundo passeiam devagar, como luz de vela num quarto.
        auraDriftA: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.12)" },
        },
        auraDriftB: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1.06)" },
          "50%": { transform: "translate3d(-4%, 3%, 0) scale(1)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.18" },
          "50%": { opacity: "0.85" },
        },
        haloPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.78" },
        },
        cardFloat: {
          "0%, 100%": { transform: "translateY(0) rotate(-0.6deg)" },
          "50%": { transform: "translateY(-9px) rotate(0.6deg)" },
        },
      },
      animation: {
        breathe: "breathe 9s ease-in-out infinite",
        // A duração real de cada estrela vem inline; isso existe pra
        // o Tailwind emitir o @keyframes twinkle.
        twinkle: "twinkle 6s ease-in-out infinite",
        auraA: "auraDriftA 42s ease-in-out infinite",
        auraB: "auraDriftB 53s ease-in-out infinite",
        haloPulse: "haloPulse 7s ease-in-out infinite",
        cardFloat: "cardFloat 6.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
