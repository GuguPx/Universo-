"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Bow, Sparkle, Sprout } from "@/components/eggs/Glyphs";
import { CardFlip } from "@/components/SecretCard";
import { MoonMark, TarotCorners } from "@/components/TarotOrnaments";
import { AdvanceButton } from "@/components/ui/Buttons";
import { drawOracleCard } from "@/lib/oracleDraw";
import type { OracleCard } from "@/data/oracle";

function OracleBack() {
  return (
    <div
      className="relative aspect-[2/3] w-[210px] overflow-hidden rounded-2xl border sm:w-[236px]"
      style={{
        borderColor: "rgba(232, 176, 132, 0.55)",
        background:
          "linear-gradient(160deg, #5A1634 0%, #2A0B1A 46%, #431428 100%)",
        boxShadow:
          "0 0 50px rgba(217,74,140,0.28), 0 0 120px rgba(139,79,196,0.16), 0 24px 60px rgba(5,2,4,0.9)",
      }}
    >
      <div className="h-full animate-cardFloat">
        <Bow
          size={18}
          className="absolute left-3.5 top-3.5 text-petal-soft/55"
        />
        <MoonMark
          size={28}
          className="absolute right-4 top-4 text-lilac/50"
        />

        <div className="flex h-full flex-col items-center justify-center gap-4">
          <span className="sigil text-4xl text-petal-light/80">✦</span>
          <span className="font-serif text-[0.7rem] tracking-[0.35em] text-petal-soft/55">
            ORÁCULO
          </span>
        </div>

        <Sprout
          size={15}
          className="glyph-secret absolute bottom-3 right-3"
        />
        <div className="pointer-events-none absolute inset-[10px] rounded-xl border border-[#E8B084]/20" />
        <TarotCorners inset="6px" size={14} />
      </div>
    </div>
  );
}

function OracleFront({ card }: { card: OracleCard }) {
  return (
    <div
      className="relative flex aspect-[2/3] w-[210px] flex-col items-center overflow-hidden rounded-2xl border px-5 py-6 text-center sm:w-[236px] sm:px-6"
      style={{
        borderColor: "rgba(232, 176, 132, 0.6)",
        background:
          "linear-gradient(165deg, #6B1A3C 0%, #2C0C1C 48%, #4A1632 100%)",
        boxShadow:
          "0 0 54px rgba(240,106,166,0.34), 0 0 130px rgba(198,155,244,0.14), 0 24px 60px rgba(5,2,4,0.92)",
      }}
    >
      <TarotCorners inset="6px" size={14} />
      <p className="eyebrow text-petal-soft/70">
        {card.rarityLabel ?? card.rarity}
      </p>
      <p className="sigil mt-5 text-3xl">{card.symbol}</p>
      <h2 className="mt-4 font-serif text-[1.45rem] leading-tight text-cream sm:text-[1.6rem]">
        {card.title}
      </h2>
      <p className="mt-4 whitespace-pre-line text-[0.78rem] leading-relaxed text-mauve/85 sm:text-[0.82rem]">
        {card.body}
      </p>
      {card.extra && (
        <p className="mt-3 text-[0.72rem] italic leading-relaxed text-petal-light/80">
          {card.extra}
        </p>
      )}
      <Sparkle
        size={13}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-petal-soft/40"
      />
    </div>
  );
}

export function Oracle() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [card, setCard] = useState<OracleCard | null>(null);
  const [nag, setNag] = useState<string | null>(null);
  const [asks, setAsks] = useState(0);

  const consult = () => {
    if (busy) return;
    const nextAsks = asks + 1;
    setAsks(nextAsks);
    setBusy(true);
    setFlipped(false);
    setNag(null);

    const wait = reduce ? 80 : 420;
    window.setTimeout(() => {
      const drawn = drawOracleCard({
        sessionAsks: nextAsks,
        avoidId: card?.id,
      });
      setCard(drawn.card);
      setNag(drawn.nag ?? null);
      setFlipped(true);
      window.setTimeout(() => setBusy(false), reduce ? 80 : 900);
    }, wait);
  };

  return (
    <div className="flex flex-col items-center">
      <CardFlip
        flipped={flipped && !!card}
        back={<OracleBack />}
        front={card ? <OracleFront card={card} /> : <OracleBack />}
      />

      <p className="mt-8 max-w-[28ch] text-center font-serif text-[1.05rem] italic leading-snug text-mauve/75 sm:text-lg">
        consulte fontes extremamente duvidosas sobre o seu destino imediato.
      </p>

      <AdvanceButton
        onClick={consult}
        label={flipped ? "perguntar novamente" : "perguntar ao oráculo"}
        sigil="✦"
        primary
        className={`mt-8 ${busy ? "pointer-events-none opacity-60" : ""}`}
      />

      <div className="mt-5 min-h-[1.6rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          {nag && (
            <motion.p
              key={nag}
              className="max-w-[28ch] text-center font-serif text-sm italic text-petal-light"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {nag}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {card?.specimen && flipped && (
        <motion.div
          className="mt-3 w-full max-w-sm rounded-2xl border border-petal-light/20 bg-ink-soft/60 px-5 py-5 text-center backdrop-blur-xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-mono text-[0.58rem] uppercase tracking-widestx text-mauve/45">
            mensagem do espécime
          </p>
          <p className="mt-2 font-serif text-xl italic text-petal-light">
            {card.specimen}
          </p>
          {card.personal && (
            <p className="mt-3 text-sm leading-relaxed text-mauve/75">
              {card.personal}
            </p>
          )}
        </motion.div>
      )}

      <p className="mt-5 max-w-[34ch] text-center text-[0.68rem] italic leading-relaxed text-mauve/35">
        resultados sem qualquer validade espiritual, jurídica ou científica.
      </p>
    </div>
  );
}
