"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { setLanguage } = useAppStore();
  const { language } = useTranslation();

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between w-full container h-14 px-2 pl-6 bg-navbar/60 border border-white/10 rounded-full shadow-lg ring-1 ring-black/5 supports-backdrop-filter:bg-navbar">
        <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full px-2 -ml-2 transition-opacity hover:opacity-80">
          <div className="relative flex items-center justify-center">
            <span className="text-xl font-bold tracking-tight text-white/95">সত্য</span>
          </div>
        </Link>

        <div className="flex items-center">
          <div role="group" aria-label="Language" className="inline-flex items-center p-1 bg-white/5 rounded-full border border-white/5">
            <button type="button" onClick={() => setLanguage("en")} className={cn("rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ease-out", language === "en" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5")}>
              EN
            </button>
            <button type="button" onClick={() => setLanguage("bn")} className={cn("rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ease-out", language === "bn" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5")}>
              বাংলা
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
