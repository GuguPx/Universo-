import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const title = "uma leitura que eu provavelmente não deveria estar fazendo";
const description =
  "algumas músicas fazem mais sentido quando você sabe para quem foram escolhidas.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "leitura",
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
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#090307",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}>
      {/*
        se você encontrou isso:
        sim, eu realmente fiz um site inteiro pra ela.

        — arbusto
      */}
      <body className="font-sans antialiased">
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--
se você encontrou isso:
sim, eu realmente fiz um site inteiro pra ela.

— arbusto
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
