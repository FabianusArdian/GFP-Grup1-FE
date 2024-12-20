"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderStatus as OrderStatusType } from "@/lib/types/order";
import { useOrderStatus } from "@/lib/hooks/use-order-status";
import { StatusHistory } from "./status-history";
import { StatusUpdateForm } from "./status-update-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface OrderStatusProps {
  orderId: string;
  currentStatus: OrderStatusType;
}

const getStatusColor = (status: OrderStatusType) => {
  switch (status) {
    case "delivered":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export function OrderStatus({ orderId, currentStatus }: OrderStatusProps) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { isUpdating, updateStatus, getHistory } = useOrderStatus(orderId);
  const statusHistory = getHistory();

  const handleStatusUpdate = async (newStatus: OrderStatusType, note: string) => {
    await updateStatus(newStatus, note);
    setShowUpdateForm(false);
  };

  return (
    <div className="flex items-center gap-4">
      <Badge variant={getStatusColor(currentStatus)}>
        {currentStatus}
      </Badge>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            View History
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Status History</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <StatusHistory history={statusHistory} />
          </div>
        </SheetContent>
      </Sheet>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowUpdateForm(true)}
        disabled={isUpdating}
      >
        Update Status
      </Button>

      <Dialog open={showUpdateForm} onOpenChange={setShowUpdateForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <StatusUpdateForm
            currentStatus={currentStatus}
            onUpdate={handleStatusUpdate}
            onCancel={() => setShowUpdateForm(false)}
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}