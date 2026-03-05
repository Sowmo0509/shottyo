import { useAppStore } from "@/store/useAppStore";
import { translations, TranslationKeys } from "@/translations";

export function useTranslation() {
  const language = useAppStore((state) => state.language);

  const t = translations[language] || translations.en;

  return { t, language };
}
