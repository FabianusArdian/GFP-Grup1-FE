"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { OrderStatus } from "./order-status";
import { OrderTimeline } from "./order-timeline";

interface OrderDetailsProps {
  order: {
    id: string;
    customerName: string;
    customerEmail: string;
    date: Date;
    total: number;
    status: string;
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    shippingAddress: {
      name: string;
      phone: string;
      address: string;
      city: string;
      province: string;
      postalCode: string;
    };
    paymentMethod: string;
  };
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const handleStatusChange = (newStatus: string) => {
    // Here you would typically update the order status in your backend
    console.log(`Updating order ${order.id} status to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-medium">#{order.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-medium">{format(order.date, "dd MMM yyyy")}</p>
        </div>
        <OrderStatus 
          orderId={order.id}
          currentStatus={order.status}
          onStatusChange={handleStatusChange}
        />
      </div>

      <OrderTimeline orderId={order.id} currentStatus={order.status} />

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
            </div>
          ))}
          <div className="flex justify-between pt-4 border-t">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">{formatCurrency(order.total)}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Customer Information</h3>
          <p className="font-medium">{order.customerName}</p>
          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Payment Method</h3>
          <p className="font-medium">{order.paymentMethod}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Shipping Address</h3>
          <p className="font-medium">{order.shippingAddress.name}</p>
          <p className="text-sm">{order.shippingAddress.phone}</p>
          <p className="text-sm text-muted-foreground">
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.province} {order.shippingAddress.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
}