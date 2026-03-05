import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "bn";

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
      searchQuery: "",
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      statusFilter: null,
      setStatusFilter: (statusFilter) => set({ statusFilter }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ language: state.language }), // only persist language
      skipHydration: true,
    },
  ),
);
