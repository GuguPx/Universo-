import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "faz alguns dias | para Vitória",
  description:
    "um contador bastante objetivo sobre uma situação nem um pouco discreta.",
};

export default function DaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
