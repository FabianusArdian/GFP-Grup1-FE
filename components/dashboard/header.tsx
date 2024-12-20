"use client";

import { User } from "@/lib/types/user";
import { Store } from "lucide-react";
import { UserNav } from "@/components/layout/nav/user-nav";

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6" />
          <span className="font-semibold">Seller Dashboard</span>
        </div>
        <UserNav />
      </div>
    </header>
  );
}