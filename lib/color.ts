/** Converte "#rrggbb" em "rgba(r, g, b, alpha)". */
export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return `rgba(255, 255, 255, ${alpha})`;

  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
