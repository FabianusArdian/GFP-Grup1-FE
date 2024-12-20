"use client";

import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";

interface OrderTimelineProps {
  orderId: string;
  currentStatus: string;
}

const timelineSteps = [
  { status: "pending", label: "Order Placed", icon: Clock },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const statusOrder = ["pending", "processing", "shipped", "delivered"];

export function OrderTimeline({ orderId, currentStatus }: OrderTimelineProps) {
  const currentStepIndex = statusOrder.indexOf(currentStatus);

  if (currentStatus === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="h-5 w-5" />
        <span className="font-medium">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="relative flex justify-between">
      {/* Progress Bar */}
      <div className="absolute top-5 left-0 h-0.5 w-full bg-muted">
        <div
          className="absolute h-full bg-primary transition-all duration-500"
          style={{
            width: `${(currentStepIndex / (statusOrder.length - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Steps */}
      {timelineSteps.map((step, index) => {
        const isCompleted = index <= currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <div
            key={step.status}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                isCompleted
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted bg-background"
              }`}
            >
              <step.icon className="h-5 w-5" />
            </div>
            <span
              className={`text-sm font-medium ${
                isCurrent ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}