"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { CreditCard, Building2, Truck } from "lucide-react";

const paymentSchema = Yup.object().shape({
  paymentMethodId: Yup.string().required('Please select a payment method'),
  cardNumber: Yup.string().when('paymentMethodId', {
    is: 'new_card',
    then: (schema) => schema.required('Card number is required'),
  }),
  cardHolder: Yup.string().when('paymentMethodId', {
    is: 'new_card',
    then: (schema) => schema.required('Card holder name is required'),
  }),
  expiryDate: Yup.string().when('paymentMethodId', {
    is: 'new_card',
    then: (schema) => schema.required('Expiry date is required'),
  }),
  cvv: Yup.string().when('paymentMethodId', {
    is: 'new_card',
    then: (schema) => schema.required('CVV is required'),
  }),
});

// Sample saved payment methods
const savedPaymentMethods = [
  {
    id: "1",
    type: "credit_card",
    cardNumber: "**** **** **** 1234",
    cardHolder: "John Doe",
    expiryDate: "12/25",
  },
  {
    id: "2",
    type: "credit_card",
    cardNumber: "**** **** **** 5678",
    cardHolder: "John Doe",
    expiryDate: "06/26",
  },
];

const paymentTypes = [
  {
    id: "credit_card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Pay securely with your credit card",
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: Building2,
    description: "Pay via bank transfer",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: Truck,
    description: "Pay when you receive your order",
  },
];

export function PaymentForm() {
  const [paymentType, setPaymentType] = useState("credit_card");
  const [useNewCard, setUseNewCard] = useState(false);

  return (
    <Formik
      initialValues={{
        paymentMethodId: savedPaymentMethods[0]?.id || 'new_card',
        paymentType: "credit_card",
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
      }}
      validationSchema={paymentSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <Label>Payment Type</Label>
            <RadioGroup
              defaultValue={paymentType}
              onValueChange={(value) => {
                setPaymentType(value);
                setFieldValue('paymentType', value);
              }}
              className="grid grid-cols-3 gap-4"
            >
              {paymentTypes.map((type) => (
                <Label
                  key={type.id}
                  htmlFor={type.id}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                  <type.icon className="mb-3 h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-medium leading-none">{type.name}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {paymentType === "credit_card" && (
            <div className="space-y-4">
              <Label>Select Payment Method</Label>
              <RadioGroup
                defaultValue={values.paymentMethodId}
                onValueChange={(value) => {
                  setFieldValue('paymentMethodId', value);
                  setUseNewCard(value === 'new_card');
                }}
              >
                <div className="grid gap-4">
                  {savedPaymentMethods.map((method) => (
                    <div key={method.id} className="flex items-start space-x-4">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{method.cardNumber}</span>
                          </div>
                          <p className="text-sm">{method.cardHolder}</p>
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiryDate}
                          </p>
                        </Card>
                      </Label>
                    </div>
                  ))}

                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value="new_card" id="new_card" />
                    <Label htmlFor="new_card" className="flex-1 cursor-pointer">
                      <Card className="p-4">
                        <span className="font-medium">Add New Card</span>
                      </Card>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {useNewCard && (
                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Field
                      as={Input}
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && touched.cardNumber && (
                      <p className="text-sm text-destructive">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Card Holder Name</Label>
                    <Field
                      as={Input}
                      name="cardHolder"
                      placeholder="Name on card"
                    />
                    {errors.cardHolder && touched.cardHolder && (
                      <p className="text-sm text-destructive">{errors.cardHolder}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Field
                        as={Input}
                        name="expiryDate"
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && touched.expiryDate && (
                        <p className="text-sm text-destructive">{errors.expiryDate}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Field
                        as={Input}
                        name="cvv"
                        type="password"
                        placeholder="123"
                      />
                      {errors.cvv && touched.cvv && (
                        <p className="text-sm text-destructive">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {paymentType === "bank_transfer" && (
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">
                Please transfer to the following bank account:
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">Bank: Bank Central Asia (BCA)</p>
                <p className="text-sm">Account Number: 1234567890</p>
                <p className="text-sm">Account Name: Local Food Market</p>
              </div>
            </Card>
          )}

          {paymentType === "cod" && (
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">
                Pay in cash when your order is delivered. Additional fee may apply.
              </p>
            </Card>
          )}
        </Form>
      )}
    </Formik>
  );
}