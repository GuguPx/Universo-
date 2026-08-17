"use client";

/**
 * Desenhos originais, feitos aqui mesmo. Nada de personagem licenciado —
 * só a atmosfera: lacinho, plantinha, coração, estrela, gatinho abstrato.
 */

interface GlyphProps {
  className?: string;
  size?: number;
}

/** O arbusto. Discreto o suficiente pra passar por enfeite. */
export function Sprout({ className = "", size = 18 }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 21v-7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M12 14c0-3-2.2-5.2-5-5.2 0 3 2.2 5.2 5 5.2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.2c0-3.4 2.4-5.9 5.6-5.9 0 3.4-2.4 5.9-5.6 5.9Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="5.6" r="1.15" fill="currentColor" opacity=".75" />
    </svg>
  );
}

/** Lacinho. Duas alças e um nó — nada mais que isso. */
export function Bow({ className = "", size = 20 }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M11 12 4.6 8.1c-.9-.6-2.1.1-2.1 1.2v5.4c0 1.1 1.2 1.8 2.1 1.2L11 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="m13 12 6.4-3.9c.9-.6 2.1.1 2.1 1.2v5.4c0 1.1-1.2 1.8-2.1 1.2L13 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="1.7"
        ry="1.9"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Estrela de quatro pontas, o brilho padrão da casa. */
export function Sparkle({ className = "", size = 14 }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2c1.1 7.2 2.8 8.9 10 10-7.2 1.1-8.9 2.8-10 10-1.1-7.2-2.8-8.9-10-10 7.2-1.1 8.9-2.8 10-10Z" />
    </svg>
  );
}

export function Heart({ className = "", size = 18 }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8.3a4.1 4.1 0 0 1 7.5 2.3c0 5-7.5 9.4-7.5 9.4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Gatinho abstrato: só o contorno das orelhas e três riscos de bigode.
 * Serve de enfeite dark-cute sem parecer nenhum personagem específico.
 */
export function KittenMark({ className = "", size = 22 }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M5 15.5c0-3.9 3.1-6.6 7-6.6s7 2.7 7 6.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M5.4 12.4 4.2 7.2l4 2.6M18.6 12.4l1.2-5.2-4 2.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M2.8 14.6h2.6M18.6 14.6h2.6M3.4 17h2.2M18.4 17h2.2"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity=".65"
      />
    </svg>
  );
}
