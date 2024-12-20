"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PaymentMethodList } from "./payment-method-list";
import { PaymentMethodForm } from "./payment-method-form";
import { useAccountData } from "@/lib/hooks/use-account-data";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PaymentMethodsPage() {
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const { paymentMethods, isLoading } = useAccountData();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Methods</h1>
        <Button onClick={() => setIsAddingPayment(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <Card className="p-6">
        <PaymentMethodList paymentMethods={paymentMethods} />
      </Card>

      <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <PaymentMethodForm onSuccess={() => setIsAddingPayment(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
