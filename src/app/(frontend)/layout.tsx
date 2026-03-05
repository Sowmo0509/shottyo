import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
    </TooltipProvider>
  );
}
