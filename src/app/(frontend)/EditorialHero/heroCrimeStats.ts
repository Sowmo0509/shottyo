/** Stats for one crime category: filed 2025/2024, not solved 2025/2024, YoY % */
export const HERO_CRIME_STATS = [
  {
    id: "rape",
    titleEn: "Rape cases filed (Bangladesh)",
    titleBn: "ধর্ষণ মামলা দায়ের (বাংলাদেশ)",
    filed2025: 7068,
    filed2024: 2024,
    notSolved2025: 5847,
    notSolved2024: 1618,
    yoyPercent: 249,
    increaseNoteEn: "~2.5× increase from 2024 to 2025",
    increaseNoteBn: "২০২৪ থেকে ২০২৫ পর্যন্ত প্রায় ২.৫ গুণ বৃদ্ধি",
  },
  {
    id: "extortion",
    titleEn: "Extortion cases filed (Bangladesh)",
    titleBn: "চাঁদাবাজি মামলা দায়ের (বাংলাদেশ)",
    filed2025: 3200,
    filed2024: 2100,
    notSolved2025: 2400,
    notSolved2024: 1580,
    yoyPercent: 52,
    increaseNoteEn: "~1.5× increase from 2024 to 2025",
    increaseNoteBn: "২০২৪ থেকে ২০২৫ পর্যন্ত প্রায় ১.৫ গুণ বৃদ্ধি",
  },
  {
    id: "murder",
    titleEn: "Murder cases filed (Bangladesh)",
    titleBn: "খুন মামলা দায়ের (বাংলাদেশ)",
    filed2025: 4100,
    filed2024: 3850,
    notSolved2025: 3100,
    notSolved2024: 2950,
    yoyPercent: 6,
    increaseNoteEn: "~6% increase from 2024 to 2025",
    increaseNoteBn: "২০২৪ থেকে ২০২৫ পর্যন্ত প্রায় ৬% বৃদ্ধি",
  },
  {
    id: "kidnapping",
    titleEn: "Kidnapping cases filed (Bangladesh)",
    titleBn: "অপহরণ মামলা দায়ের (বাংলাদেশ)",
    filed2025: 890,
    filed2024: 620,
    notSolved2025: 650,
    notSolved2024: 430,
    yoyPercent: 43,
    increaseNoteEn: "~43% increase from 2024 to 2025",
    increaseNoteBn: "২০২৪ থেকে ২০২৫ পর্যন্ত প্রায় ৪৩% বৃদ্ধি",
  },
] as const;

export type HeroCrimeStat = (typeof HERO_CRIME_STATS)[number];

export function getCrimeTabLabel(id: HeroCrimeStat["id"], language: string): string {
  if (language === "bn") {
    const labels: Record<HeroCrimeStat["id"], string> = { rape: "ধর্ষণ", extortion: "চাঁদাবাজি", murder: "খুন", kidnapping: "অপহরণ" };
    return labels[id];
  }
  return id.charAt(0).toUpperCase() + id.slice(1);
}
