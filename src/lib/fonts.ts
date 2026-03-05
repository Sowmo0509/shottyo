import { Poppins, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";

export const fontSans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontBengali = Noto_Serif_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
});
