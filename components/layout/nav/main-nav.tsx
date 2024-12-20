import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Sellers",
    href: "/sellers",
  },
];

export function MainNav() {
  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}