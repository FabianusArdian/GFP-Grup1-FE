import { CreditCard, Banknote, QrCode, Smartphone } from "lucide-react";

export const PAYMENT_METHODS = [
  {
    id: "credit-card",
    icon: CreditCard,
    title: "Kartu Kredit/Debit",
    description: "Visa, Mastercard, JCB"
  },
  {
    id: "bank-transfer",
    icon: Banknote,
    title: "Transfer Bank",
    description: "Semua bank utama"
  },
  {
    id: "e-wallet",
    icon: QrCode,
    title: "E-Wallet",
    description: "GoPay, OVO, DANA"
  },
  {
    id: "mobile-banking",
    icon: Smartphone,
    title: "Mobile Banking",
    description: "Semua aplikasi bank"
  }
] as const;

export type PaymentMethodId = typeof PAYMENT_METHODS[number]["id"];