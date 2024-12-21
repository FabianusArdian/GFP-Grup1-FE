"use client";

import { FeaturedProducts } from "./sections/featured-products";
import { FeaturedShops } from "./sections/featured-shops";

export function FeaturedSections() {
  return (
    <div className="space-y-16">
      <FeaturedShops />
      <FeaturedProducts />
    </div>
  );
}