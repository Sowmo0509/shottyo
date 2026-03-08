"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { setLanguage } = useAppStore();
  const { language } = useTranslation();

  return (
    <div className="fixed top-[max(0.75rem,env(safe-area-inset-top))] left-0 right-0 z-50 flex justify-center px-3 sm:top-6 sm:px-4 md:top-8">
      <nav className="flex items-center justify-between w-full max-w-7xl h-12 sm:h-14 px-3 pl-4 sm:px-4 sm:pl-6 bg-white border border-black/10 rounded-full shadow-lg ring-1 ring-black/5 text-foreground min-w-0">
        <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded-full py-2 pr-2 -ml-1 transition-opacity hover:opacity-80 min-w-0 shrink-0">
          <span className="text-lg sm:text-xl font-bold tracking-tight truncate">সত্য</span>
        </Link>

        <div className="flex items-center shrink-0">
          <div role="group" aria-label="Language" className="inline-flex items-center p-0.5 sm:p-1 bg-black/5 rounded-full border border-black/10">
            <button type="button" onClick={() => setLanguage("en")} className={cn("rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-xs font-medium transition-all duration-300 ease-out min-h-[44px] sm:min-h-0 touch-manipulation", language === "en" ? "bg-foreground text-background shadow-sm" : "text-foreground/70 hover:text-foreground hover:bg-foreground/10")}>
              EN
            </button>
            <button type="button" onClick={() => setLanguage("bn")} className={cn("rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-xs font-medium transition-all duration-300 ease-out min-h-[44px] sm:min-h-0 touch-manipulation", language === "bn" ? "bg-foreground text-background shadow-sm" : "text-foreground/70 hover:text-foreground hover:bg-foreground/10")}>
              বাংলা
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
