import type { Metadata } from "next";
import Link from "next/link";

const title = "uma leitura que eu provavelmente não deveria estar fazendo";
const description =
  "algumas músicas fazem mais sentido quando você sabe para quem foram escolhidas.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Link
        href="/"
        aria-label="voltar ao universo"
        title="voltar ao universo"
        className="fixed z-40 flex h-11 w-11 items-center justify-center rounded-full border border-petal-light/10 bg-ink/55 text-sm text-petal-light/25 backdrop-blur-md transition-colors duration-500 hover:border-petal-light/35 hover:text-petal-light/75 focus-visible:text-petal-light/75"
        style={{
          bottom: "calc(1rem + env(safe-area-inset-bottom))",
          right: "calc(1rem + env(safe-area-inset-right))",
        }}
      >
        ✦
      </Link>
    </>
  );
}
