import type { LocalizedString, LocalizedText } from "@/types";
import type { IncidentDetailTranslation } from "./types";

export function getLocalized(
  value: LocalizedString | LocalizedText | undefined,
  language: string
): string {
  if (!value) return "";
  return language === "bn" && value.bn ? value.bn : value.en ?? "";
}

export function getFirstGrapheme(
  text: string,
  language: string
): { firstChar: string; rest: string } {
  if (!text) return { firstChar: "", rest: "" };
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(language, { granularity: "grapheme" });
    const segments = Array.from(segmenter.segment(text));
    if (segments.length > 0) {
      const firstChar = segments[0].segment;
      return { firstChar, rest: text.slice(firstChar.length) };
    }
  }
  return {
    firstChar: text.charAt(0),
    rest: text.slice(1),
  };
}

export function getStatusLabel(
  t: IncidentDetailTranslation,
  status: string
): string {
  switch (status) {
    case "open":
      return t.common.incidents.status.open;
    case "closed":
      return t.common.incidents.status.closed;
    default:
      return t.common.incidents.status.inProgress;
  }
}
