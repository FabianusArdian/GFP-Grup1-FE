"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CustomerOverview } from "@/components/account/overview";
import { useUserStore } from "@/lib/stores/user-store";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useUserStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/login?redirect=/account");
      return;
    }

    if (currentUser.role === "seller") {
      toast({
        title: "Access Denied",
        description: "Please use the seller dashboard",
      });
      router.push("/dashboard");
      return;
    }
  }, [currentUser, router, toast]);

  if (!currentUser || currentUser.role === "seller") {
    return null;
  }

  return <CustomerOverview />;
}