import Link from "next/link";
import { CorporateReport } from "@/components/CorporateReport";

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-[#e6e7e1] text-[#202938]">
      <div
        aria-hidden="true"
        className="fixed inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(31,75,122,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(31,75,122,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Link
        href="/dias"
        className="fixed left-3 top-3 z-40 flex min-h-[42px] items-center border-2 border-[#1f2937] bg-[#fffdf5] px-3 font-mono text-[0.58rem] font-bold uppercase tracking-wider text-[#1f2937] shadow-[3px_3px_0_#1f2937] transition-transform hover:-translate-y-0.5 sm:left-5 sm:top-5"
      >
        ← encerrar relatório
      </Link>

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-16 pt-20 sm:px-8 sm:pt-24">
        <CorporateReport />
      </div>
    </main>
  );
}
