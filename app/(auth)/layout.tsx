import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import GlassPane from "@/components/GlassPane";

const inter = Inter({
  variable: "--font-inter",
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthRootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="h-full w-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
