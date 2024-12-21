"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, CreditCard } from "lucide-react";

const paymentMethods = [
  {
    id: "1",
    type: "credit_card",
    cardNumber: "**** **** **** 1234",
    expiryDate: "12/25",
    cardHolder: "John Doe",
    isDefault: true,
  },
  // Add more payment methods...
];

export function PaymentMethodList() {
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
                <h3 className="font-medium">{method.cardNumber}</h3>
                {method.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
              </div>
              <p className="text-sm">{method.cardHolder}</p>
              <p className="text-sm text-muted-foreground">
                Expires {method.expiryDate}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}