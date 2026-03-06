"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { Scale } from "lucide-react";
import { Heading } from "./ui/typography";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
  const { setLanguage } = useAppStore();
  const { t, language } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  return (
    <nav className="sticky top-4 z-50 container bg-navbar text-navbar-foreground backdrop-blur supports-backdrop-filter:bg-navbar/60 rounded-xl">
      <div className="flex h-16 items-center flex-row justify-between px-4 md:px-8 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Heading as="span" variant="large" className="inline-block mt-0 text-white">
            সত্য
          </Heading>
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleLanguage} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-white">
            {language === "en" ? "বাংলা" : "English"}
          </button>
        </div>
      </div>
    </nav>
  );
}
