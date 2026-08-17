"use client";

/**
 * Ornamentos de canto inspirados em cartas de tarot — cantoneiras finas
 * em rosa, sem copiar nenhuma carta real. Ficam sempre por cima, em
 * opacidade baixa, só sugerindo a moldura.
 */
export function TarotCorners({
  className = "",
  inset = "6px",
  size = 16,
}: {
  className?: string;
  inset?: string;
  size?: number;
}) {
  const corners = [
    { key: "tl", style: { top: inset, left: inset }, borders: "border-l border-t" },
    { key: "tr", style: { top: inset, right: inset }, borders: "border-r border-t" },
    { key: "bl", style: { bottom: inset, left: inset }, borders: "border-l border-b" },
    { key: "br", style: { bottom: inset, right: inset }, borders: "border-r border-b" },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {corners.map((corner) => (
        <span
          key={corner.key}
          className={`absolute border-petal-light/30 ${corner.borders}`}
          style={{ ...corner.style, width: size, height: size }}
        />
      ))}
    </div>
  );
}

/** Lua fina desenhada em traço — nada de lua gigante de banco de imagem. */
export function MoonMark({
  className = "",
  size = 26,
}: {
  className?: string;
  size?: number;
}) {
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
        d="M16.6 3.4a9 9 0 1 0 4 12.5A10 10 0 0 1 16.6 3.4Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Filete horizontal com um símbolo no meio. Serve de respiro entre blocos. */
export function SigilDivider({
  symbol = "✦",
  className = "",
}: {
  symbol?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex w-full max-w-[220px] items-center gap-3 ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-petal-light/25" />
      <span className="sigil text-[0.7rem]">{symbol}</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-petal-light/25" />
    </div>
  );
}
