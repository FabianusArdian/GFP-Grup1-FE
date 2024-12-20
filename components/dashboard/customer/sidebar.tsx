"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  CreditCard,
  MapPin,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Overview",
    href: "/account",
    icon: User,
  },
  {
    title: "Orders",
    href: "/account/orders",
    icon: ShoppingBag,
  },
  {
    title: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    title: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    title: "Payment Methods",
    href: "/account/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/account/profile",
    icon: Settings,
  },
];

export function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}