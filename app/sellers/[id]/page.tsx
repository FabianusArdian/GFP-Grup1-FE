import { sellers } from "@/lib/data/server/sellers";
import { SellerProducts } from "@/components/sellers/seller-products";
import { BaseLayout } from "@/components/layout/base-layout";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string }
}

export default function SellerPage({ params }: Props) {
  const seller = sellers.find(s => s.id === params.id);

  if (!seller) {
    notFound();
  }

  return (
    <BaseLayout>
      <SellerProducts seller={seller} />
    </BaseLayout>
  );
}

// Required for static export
export function generateStaticParams() {
  return sellers.map((seller) => ({
    id: seller.id,
  }));
}