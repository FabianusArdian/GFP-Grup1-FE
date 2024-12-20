"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, CreditCard } from "lucide-react";
import { useAccountData } from "@/lib/hooks/use-account-data";
import type { PaymentMethod } from "@/lib/types/payment";

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
}

export function PaymentMethodList({ paymentMethods }: PaymentMethodListProps) {
  const { deletePaymentMethod } = useAccountData();

  const handleDelete = async (id: string) => {
    try {
      await deletePaymentMethod(id);
    } catch (error) {
      console.error('Failed to delete payment method:', error);
    }
  };

  if (paymentMethods.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No payment methods saved yet</p>
      </div>
    );
  }

  const formatCardNumber = (method: PaymentMethod) => {
    if ('lastFourDigits' in method) {
      return `**** **** **** ${method.lastFourDigits}`;
    }
    return '';
  };

  const formatExpiryDate = (method: PaymentMethod) => {
    if ('expiryMonth' in method && 'expiryYear' in method) {
      return `${method.expiryMonth}/${method.expiryYear}`;
    }
    return '';
  };

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className="flex items-start justify-between p-4 border rounded-lg"
        >
          <div className="flex gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{formatCardNumber(method)}</h3>
                {method.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
              </div>
              {'cardholderName' in method && (
                <p className="text-sm">{method.cardholderName}</p>
              )}
              {'expiryMonth' in method && (
                <p className="text-sm text-muted-foreground">
                  Expires {formatExpiryDate(method)}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDelete(method.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
