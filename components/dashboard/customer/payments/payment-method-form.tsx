"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const paymentMethodSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  cardHolder: Yup.string()
    .required("Card holder name is required"),
  expiryDate: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  isDefault: Yup.boolean(),
});

interface PaymentMethodFormProps {
  onSuccess: () => void;
}

export function PaymentMethodForm({ onSuccess }: PaymentMethodFormProps) {
  return (
    <Formik
      initialValues={{
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        isDefault: false,
      }}
      validationSchema={paymentMethodSchema}
      onSubmit={async (values) => {
        // Handle form submission
        console.log(values);
        onSuccess();
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Field
              as={Input}
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
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
                maxLength={5}
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
                maxLength={4}
              />
              {errors.cvv && touched.cvv && (
                <p className="text-sm text-destructive">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Field
              type="checkbox"
              name="isDefault"
              as={Checkbox}
              id="isDefault"
            />
            <Label htmlFor="isDefault">Set as default payment method</Label>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit">Save Payment Method</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}