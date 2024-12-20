"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <Link href="/auth/login">
      <Button variant="ghost" size="sm">
        Login
      </Button>
    </Link>
  );
}