import { Inter_Tight, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";

export const fontSans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontBengali = Noto_Serif_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
});
