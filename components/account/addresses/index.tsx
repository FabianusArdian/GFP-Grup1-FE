"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddressList } from "./address-list";
import { AddressForm } from "./address-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AddressesPage() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        <Button onClick={() => setIsAddingAddress(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      <Card className="p-6">
        <AddressList />
      </Card>

      <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <AddressForm onSuccess={() => setIsAddingAddress(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}