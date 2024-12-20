"use client";

import { Header } from "./header";
import { Footer } from "./footer";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}