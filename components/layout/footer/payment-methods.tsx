"use client";

import { CreditCard, Banknote, QrCode, Smartphone } from "lucide-react";

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Kartu Kredit/Debit",
    description: "Visa, Mastercard, JCB"
  },
  {
    icon: Banknote,
    title: "Transfer Bank",
    description: "Semua bank utama"
  },
  {
    icon: QrCode,
    title: "E-Wallet",
    description: "GoPay, OVO, DANA"
  },
  {
    icon: Smartphone,
    title: "Mobile Banking",
    description: "Semua aplikasi bank"
  }
];

export function PaymentMethods() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Metode Pembayaran</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {paymentMethods.map((method, index) => (
          <div key={index} className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg">
            <method.icon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{method.title}</p>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}