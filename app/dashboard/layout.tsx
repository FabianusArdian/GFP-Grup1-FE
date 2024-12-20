"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { SellerSidebar } from "@/components/dashboard/seller/sidebar";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout type="seller">
      <div className="flex">
        <SellerSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </DashboardLayout>
  );
}