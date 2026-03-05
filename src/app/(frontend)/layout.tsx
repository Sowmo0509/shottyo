import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <TooltipProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
      </TooltipProvider>
    </Providers>
  );
}
