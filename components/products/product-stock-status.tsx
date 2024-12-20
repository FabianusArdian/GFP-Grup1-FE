import { Badge } from "@/components/ui/badge";
import { getStockStatus } from "@/lib/utils/product";

interface ProductStockStatusProps {
  stock: number;
}

export function ProductStockStatus({ stock }: ProductStockStatusProps) {
  const status = getStockStatus(stock);
  
  return (
    <Badge variant={status.color}>
      {status.label}
    </Badge>
  );
}