export interface Address {
  id: string;
  userId: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface CreateAddressInput {
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface UpdateAddressInput extends Partial<CreateAddressInput> {}
