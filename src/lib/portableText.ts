/**
 * Helpers for Sanity portable text (block content).
 * Description fields may be legacy LocalizedText (en/bn strings) or LocalizedBlockContent (en/bn block arrays).
 */

/** Minimal type for a portable text block (Sanity block content). */
export interface PortableTextBlock {
  _type: string;
  _key?: string;
  children?: Array<{ _type: string; text?: string }>;
  markDefs?: unknown[];
  style?: string;
  [key: string]: unknown;
}

export type LocalizedBlockContent = {
  en?: PortableTextBlock[];
  bn?: PortableTextBlock[];
};

/** Check if value is block content (array of blocks) rather than a string. */
function isBlockArray(value: unknown): value is PortableTextBlock[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null && "_type" in value[0];
}

/** Get the localized block array for a language. Returns null if not block content or empty. */
export function getDescriptionBlocks(
  value: { en?: unknown; bn?: unknown } | undefined,
  language: string
): PortableTextBlock[] | null {
  if (!value) return null;
  const raw = language === "bn" ? value.bn : value.en;
  if (isBlockArray(raw)) return raw;
  return null;
}

/** Extract plain text from portable text blocks (for previews, line-clamp, etc.). */
export function portableTextToPlainText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.map((c) => (c && typeof c.text === "string" ? c.text : "")).join("");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

/**
 * Get description as plain text. Supports both legacy (en/bn strings) and block content.
 */
export function getDescriptionPlainText(
  value: { en?: string | unknown[]; bn?: string | unknown[] } | undefined,
  language: string
): string {
  if (!value) return "";
  const raw = language === "bn" ? value.bn : value.en;
  if (typeof raw === "string") return raw;
  if (isBlockArray(raw)) return portableTextToPlainText(raw);
  return "";
}
