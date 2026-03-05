import type { Metadata } from "next";
import { fontSans, fontMono, fontBengali } from "@/lib/fonts";
import "./globals.css";
import { HydrationWrapper } from "@/components/HydrationWrapper";

export const metadata: Metadata = {
  title: "Justice Tracker Bangladesh",
  description: "A public-facing justice tracker system for documenting incidents and verdicts in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable} ${fontBengali.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <HydrationWrapper>{children}</HydrationWrapper>
      </body>
    </html>
  );
}
