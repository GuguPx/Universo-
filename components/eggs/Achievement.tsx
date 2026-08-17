"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useEggs } from "@/components/eggs/EasterEggProvider";
import { TarotCorners } from "@/components/TarotOrnaments";

/** Avisinho de conquista. Aparece no alto, some sozinho. */
export function Achievement() {
  const { achievement, dismissAchievement } = useEggs();

  useEffect(() => {
    if (!achievement) return;
    const timer = window.setTimeout(dismissAchievement, 6500);
    return () => window.clearTimeout(timer);
  }, [achievement, dismissAchievement]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          role="status"
          className="pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center px-6 sm:top-20"
          initial={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative rounded-2xl border border-petal-light/30 px-6 py-4 text-center"
            style={{
              background:
                "linear-gradient(160deg, rgba(42,10,26,0.96), rgba(20,8,16,0.96))",
              boxShadow: "0 0 40px rgba(217,74,140,0.2)",
            }}
          >
            <TarotCorners inset="6px" size={12} />
            <p className="font-mono text-[0.68rem] uppercase tracking-widestx text-petal-light">
              {achievement.title}
            </p>
            {achievement.body && (
              <p className="mt-2 font-serif text-[0.85rem] italic text-mauve">
                {achievement.body}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
