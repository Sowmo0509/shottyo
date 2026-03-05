"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { Scale } from "lucide-react";

export function Navbar() {
  const { language, setLanguage } = useAppStore();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center flex-row justify-between px-4 md:px-8 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Scale className="h-6 w-6" />
          <span className="font-bold inline-block">{language === "bn" ? "জাস্টিস ট্র্যাকার" : "Justice Tracker"}</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleLanguage} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
            {language === "en" ? "বাংলা" : "English"}
          </button>
        </div>
      </div>
    </nav>
  );
}
