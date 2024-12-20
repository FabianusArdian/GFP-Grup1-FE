"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface ProductPageHeaderProps {
  productName: string;
}

export function ProductPageHeader({ productName }: ProductPageHeaderProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: productName, href: "#" },
  ];

  return (
    <div className="mb-8">
      <Breadcrumbs items={breadcrumbItems} />
    </div>
  );
}