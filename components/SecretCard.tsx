"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bow, Heart, Sparkle, Sprout } from "@/components/eggs/Glyphs";
import { MoonMark, TarotCorners } from "@/components/TarotOrnaments";
import { useEggs } from "@/components/eggs/EasterEggProvider";

/**
 * O verso da última carta. Diferente de todas as outras: rosa mais vivo,
 * laço no canto, corações, e uma plantinha escondida.
 *
 * Os quatro símbolos (lua, estrela, coração, planta) são clicáveis —
 * na ordem certa, viram o código secreto do site.
 */
export function SecretCardBack({
  interactive = true,
}: {
  interactive?: boolean;
}) {
  const reduce = useReducedMotion();
  const { pushSymbol } = useEggs();

  const SymbolButton = ({
    label,
    symbol,
    className,
    style,
    children,
  }: {
    label: string;
    symbol: "moon" | "star" | "heart" | "plant";
    className: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
  }) =>
    interactive ? (
      <button
        type="button"
        onClick={() => pushSymbol(symbol)}
        aria-label={label}
        className={className}
        style={style}
      >
        {children}
      </button>
    ) : (
      <span className={className} style={style} aria-hidden="true">
        {children}
      </span>
    );

  return (
    <motion.div
      className="relative aspect-[2/3] w-[178px] overflow-hidden rounded-2xl border sm:w-[204px]"
      style={{
        borderColor: "rgba(242,139,188,0.55)",
        background:
          "linear-gradient(160deg, #4A1230 0%, #250A19 48%, #3A0E24 100%)",
        boxShadow:
          "0 0 54px rgba(240,106,166,0.3), 0 0 130px rgba(217,74,140,0.12), 0 26px 64px rgba(5,2,4,0.92)",
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduce ? 0.3 : 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={reduce ? "h-full" : "h-full animate-cardFloat"}>
        {/* Laço no canto de cima. */}
        <Bow
          size={19}
          className="absolute left-3 top-3 text-petal-soft/70"
        />

        <div className="flex h-full flex-col items-center justify-center gap-5">
          <SymbolButton
            label="uma lua"
            symbol="moon"
            className="-m-2 rounded-full p-2 text-petal-light/70 transition-colors duration-500 hover:text-petal-soft"
          >
            <MoonMark size={30} />
          </SymbolButton>

          <SymbolButton
            label="uma estrela"
            symbol="star"
            className="-m-2 rounded-full p-2 text-petal-soft/80 transition-colors duration-500 hover:text-cream"
            style={{ filter: "drop-shadow(0 0 12px rgba(240,106,166,0.7))" }}
          >
            <Sparkle size={17} />
          </SymbolButton>

          <SymbolButton
            label="um coração"
            symbol="heart"
            className="-m-2 rounded-full p-2 text-petal/70 transition-colors duration-500 hover:text-petal-light"
          >
            <Heart size={17} />
          </SymbolButton>
        </div>

        {/* A plantinha do verso. Quase invisível, como manda o figurino. */}
        <SymbolButton
          label="uma plantinha"
          symbol="plant"
          className="absolute bottom-1 right-1 rounded-full p-2.5 text-petal-soft/20 transition-colors duration-500 hover:text-petal-soft/80"
        >
          <Sprout size={14} />
        </SymbolButton>

        <div className="pointer-events-none absolute inset-[10px] rounded-xl border border-petal-soft/15" />
        <TarotCorners inset="5px" size={14} />
      </div>
    </motion.div>
  );
}

/**
 * A virada da carta. Duas faces empilhadas girando em Y — nada de
 * biblioteca extra pra isso.
 */
export function CardFlip({
  flipped,
  back,
  front,
}: {
  flipped: boolean;
  back: React.ReactNode;
  front: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <>{flipped ? front : back}</>;

  return (
    <motion.div
      className="relative"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d", transformPerspective: 1200 }}
    >
      <div style={{ backfaceVisibility: "hidden" }}>{back}</div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {front}
      </div>
    </motion.div>
  );
}
