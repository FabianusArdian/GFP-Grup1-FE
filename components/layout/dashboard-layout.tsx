"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { useUserStore } from "@/lib/stores/user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "seller" | "consumer";
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const { currentUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    if (currentUser.role !== type) {
      router.push(type === "seller" ? "/account" : "/dashboard");
    }
  }, [currentUser, router, type]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}