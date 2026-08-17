"use client";

/**
 * Céu noturno rosa. Pontinhos discretos, alguns piscando muito devagar,
 * e duas constelações quase invisíveis ligando alguns deles.
 *
 * As posições vêm de um gerador com semente fixa: o servidor e o cliente
 * produzem exatamente a mesma coisa, então não existe erro de hidratação
 * (que é o que aconteceria usando Math.random direto no render).
 */

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: string;
  twinkles: boolean;
}

const COLORS = ["#F28BBC", "#C69BF4", "#F7B6D2", "#D94A8C"];

const stars: Star[] = (() => {
  const random = seeded(20250816);
  return Array.from({ length: 64 }, () => {
    const roll = random();
    return {
      x: random() * 100,
      y: random() * 100,
      size: roll > 0.9 ? 2.4 : roll > 0.6 ? 1.6 : 1.1,
      opacity: 0.18 + random() * 0.42,
      delay: random() * 9,
      duration: 5 + random() * 7,
      color: COLORS[Math.floor(random() * COLORS.length)],
      twinkles: random() > 0.45,
    };
  });
})();

/** Duas constelações desenhadas à mão, em % da tela. */
const constellations = [
  [
    [12, 18],
    [21, 12],
    [29, 24],
    [38, 19],
    [44, 31],
  ],
  [
    [66, 72],
    [74, 63],
    [83, 70],
    [88, 58],
  ],
];

export function Starfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {constellations.map((points, index) => (
          <polyline
            key={index}
            points={points.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="none"
            stroke="#F28BBC"
            strokeWidth="0.08"
            strokeOpacity="0.16"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {stars.map((star, index) => (
        <span
          key={index}
          className={`absolute rounded-full ${star.twinkles ? "animate-twinkle" : ""}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            background: star.color,
            boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
