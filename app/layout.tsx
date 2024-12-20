"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { THEMES } from "@/lib/constants/theme";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          defaultTheme={THEMES.SYSTEM}
          enableSystem
          attribute="class"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}