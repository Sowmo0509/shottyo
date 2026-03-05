"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export function HydrationWrapper({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const language = useAppStore((state) => state.language);

  useEffect(() => {
    useAppStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-lang", language);
    }
  }, [language]);

  return <div className={`flex flex-col flex-1 transition-opacity duration-300 ease-in-out ${isHydrated ? "opacity-100" : "opacity-0"}`}>{children}</div>;
}
