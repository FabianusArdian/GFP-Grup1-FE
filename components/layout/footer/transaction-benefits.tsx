"use client";

import { ShieldCheck, Clock, HeartHandshake } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Transaksi Aman",
    description: "Pembayaran dilindungi dengan sistem keamanan terkini"
  },
  {
    icon: Clock,
    title: "Proses Cepat",
    description: "Pesanan diproses dengan cepat dan konfirmasi instan"
  },
  {
    icon: HeartHandshake,
    title: "Garansi Pembeli",
    description: "Jaminan uang kembali untuk pembelian yang tidak sesuai"
  }
];

export function TransactionBenefits() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-4 p-4 bg-accent/50 rounded-lg">
          <div className="rounded-lg bg-primary/10 p-3">
            <benefit.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}