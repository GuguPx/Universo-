import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PROJETO Q-2407 | confidencial",
  description: "relatório executivo confidencial. definitivamente corporativo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
