"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/user-store";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CustomerSidebar } from "@/components/account/sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser } = useUserStore();



  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/login?redirect=/account");
      return;
    }

    if (currentUser.role === "seller") {
      router.push("/dashboard");
      return;
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role === "seller") {
    return null;
  }

  return (
    <DashboardLayout type="consumer">
      <div className="flex">
        <CustomerSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </DashboardLayout>
  );
}