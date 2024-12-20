"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WishlistGrid } from "./wishlist-grid";

export function WishlistPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Wishlist</h1>

      <Card className="p-6">
        <Input
          placeholder="Search wishlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm mb-6"
        />

        <WishlistGrid search={search} />
      </Card>
    </div>
  );
}