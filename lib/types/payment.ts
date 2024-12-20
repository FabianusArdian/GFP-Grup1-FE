/**
 * Payment method types supported by the system
 */
export type PaymentMethodType = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'e_wallet'
  | 'cash_on_delivery';

/**
 * Card brands supported for card payments
 */
export type CardBrand = 
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'jcb';

/**
 * Base payment method interface
 */
interface BasePaymentMethod {
  id: string;
  userId: string;
  type: PaymentMethodType;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Card payment method details
 */
export interface CardPaymentMethod extends BasePaymentMethod {
  type: 'credit_card' | 'debit_card';
  brand: CardBrand;
  lastFourDigits: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
}

/**
 * Bank transfer payment method details
 */
export interface BankTransferMethod extends BasePaymentMethod {
  type: 'bank_transfer';
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

/**
 * E-wallet payment method details
 */
export interface EWalletMethod extends BasePaymentMethod {
  type: 'e_wallet';
  provider: string;
  accountId: string;
}

/**
 * Cash on delivery payment method
 */
export interface CashOnDeliveryMethod extends BasePaymentMethod {
  type: 'cash_on_delivery';
}

/**
 * Union type of all payment methods
 */
export type PaymentMethod = 
  | CardPaymentMethod 
  | BankTransferMethod 
  | EWalletMethod 
  | CashOnDeliveryMethod;

/**
 * Payment status enum
 */
export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

/**
 * Payment transaction interface
 */
export interface PaymentTransaction {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethodId: string;
  status: PaymentStatus;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Input type for adding a new payment method
 */
export type AddPaymentMethodInput = Omit<
  PaymentMethod,
  'id' | 'userId' | 'createdAt' | 'updatedAt'
>;

/**
 * Input type for updating an existing payment method
 */
export type UpdatePaymentMethodInput = Partial<AddPaymentMethodInput>;
