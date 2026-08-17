"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sprout } from "@/components/eggs/Glyphs";

/**
 * A assinatura. Quase invisível até alguém passar o dedo ou o mouse em
 * cima. Só entra em cena depois da terceira carta.
 *
 * O fade de entrada fica no wrapper e a opacidade de repouso fica na
 * classe do texto: se o Framer animasse a opacidade direto, o estilo
 * inline ganharia do `hover:` e o efeito de revelar sumiria.
 */
export function AuthorFooter({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-3 z-30 flex justify-center px-16 sm:bottom-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <p
            tabIndex={0}
            className="pointer-events-auto inline-flex items-center gap-1.5 text-center text-[0.6rem] leading-tight text-mauve opacity-15 transition-opacity duration-700 hover:opacity-80 focus-visible:opacity-80 sm:text-[0.66rem]"
          >
            <span>feito com decisões questionáveis por um certo arbusto</span>
            <Sprout size={12} className="shrink-0 text-petal-light" />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
