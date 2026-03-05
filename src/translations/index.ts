import enCommon from "./en/common.json";
import bnCommon from "./bn/common.json";
import enHome from "./en/home.json";
import bnHome from "./bn/home.json";

export const translations = {
  en: {
    common: enCommon,
    home: enHome,
  },
  bn: {
    common: bnCommon,
    home: bnHome,
  },
} as const;

export type TranslationKeys = typeof translations.en;
