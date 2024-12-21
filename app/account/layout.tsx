"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CustomerSidebar } from "@/components/dashboard/customer/sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout type="consumer">
      <div className="flex">
        <CustomerSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </DashboardLayout>
  );
}