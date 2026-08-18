import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oráculo do Arbusto",
  description:
    "consulte fontes extremamente duvidosas sobre o seu destino imediato.",
};

export default function OracleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
