"use client";

import Link from "next/link";
import { Store } from "lucide-react";
import { MainNav } from "./nav/main-nav";
import { SearchBar } from "./nav/search";
import { UserNav } from "./nav/user-nav";
import { CartButton } from "./nav/cart-button";
import { ThemeToggle } from "./nav/theme-toggle";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background",
        "border-b"
      )}
    >
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Store className="h-6 w-6" />
            <span className="font-bold hidden sm:inline-block">Local Food Market</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <MainNav />
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <CartButton />
            <UserNav />
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-3 space-y-3">
              <SearchBar />
              <MainNav />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}