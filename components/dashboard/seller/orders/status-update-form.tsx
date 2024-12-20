"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/lib/types/order";

interface StatusUpdateFormProps {
  currentStatus: OrderStatus;
  onUpdate: (status: OrderStatus, note: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function StatusUpdateForm({ 
  currentStatus, 
  onUpdate, 
  onCancel,
  isLoading 
}: StatusUpdateFormProps) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [note, setNote] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>New Status</Label>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as OrderStatus)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select new status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.value === currentStatus}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Note (Optional)</Label>
        <Textarea
          placeholder="Add a note about this status change..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => onUpdate(status, note)}
          disabled={status === currentStatus || isLoading}
        >
          {isLoading ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}