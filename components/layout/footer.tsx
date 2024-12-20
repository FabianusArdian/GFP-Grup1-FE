"use client";

import { TransactionBenefits } from "./footer/transaction-benefits";
import { PaymentMethods } from "./footer/payment-methods";
import { FooterLinks } from "./footer/footer-links";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12 bg-accent/20">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 space-y-8 md:space-y-12">
        <TransactionBenefits />
        <PaymentMethods />
        <FooterLinks />
      </div>
    </footer>
  );
}