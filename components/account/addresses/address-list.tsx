"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccountData } from "@/lib/hooks/use-account-data";
import type { Address } from "@/lib/types/address";

interface AddressListProps {
  addresses: Address[];
}

export function AddressList({ addresses }: AddressListProps) {
  const { deleteAddress } = useAccountData();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id);
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No addresses saved yet</p>
      </div>
    );
  }

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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDelete(address.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
