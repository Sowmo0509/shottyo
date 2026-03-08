import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Convert Western digits (0-9) in a string or number to Bengali numerals (০-৯). */
export function convertToBengaliDigits(value: string | number): string {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return value.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)] ?? d);
}
