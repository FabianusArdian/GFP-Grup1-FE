"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, MapPin } from "lucide-react";

const addresses = [
  {
    id: "1",
    label: "Home",
    name: "John Doe",
    phone: "081234567890",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12345",
    isDefault: true,
  },
  // Add more addresses...
];

export function AddressList() {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="flex items-start justify-between p-4 border rounded-lg"
        >
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{address.label}</h3>
                {address.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
              </div>
              <p className="text-sm">{address.name}</p>
              <p className="text-sm">{address.phone}</p>
              <p className="text-sm text-muted-foreground">
                {address.address}, {address.city}, {address.province} {address.postalCode}
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