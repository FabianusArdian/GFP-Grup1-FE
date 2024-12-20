import { formatCurrency } from "@/lib/utils/currency";

interface ProductPriceProps {
  price: number;
  className?: string;
}

export function ProductPrice({ price, className = "text-sm font-medium text-primary" }: ProductPriceProps) {
  return (
    <p className={className}>
      {formatCurrency(price)}
    </p>
  );
}