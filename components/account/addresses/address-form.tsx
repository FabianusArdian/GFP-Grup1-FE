"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const addressSchema = Yup.object().shape({
  label: Yup.string().required("Label is required"),
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string().required("Postal code is required"),
  isDefault: Yup.boolean(),
});

interface AddressFormProps {
  onSuccess: () => void;
}

export function AddressForm({ onSuccess }: AddressFormProps) {
  return (
    <Formik
      initialValues={{
        label: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        isDefault: false,
      }}
      validationSchema={addressSchema}
      onSubmit={async (values) => {
        // Handle form submission
        console.log(values);
        onSuccess();
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label>Label</Label>
            <Field
              as={Input}
              name="label"
              placeholder="e.g., Home, Office"
            />
            {errors.label && touched.label && (
              <p className="text-sm text-destructive">{errors.label}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Field
                as={Input}
                name="name"
                placeholder="Full name"
              />
              {errors.name && touched.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Field
                as={Input}
                name="phone"
                placeholder="Phone number"
              />
              {errors.phone && touched.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Field
              as={Input}
              name="address"
              placeholder="Street address"
            />
            {errors.address && touched.address && (
              <p className="text-sm text-destructive">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Field
                as={Input}
                name="city"
                placeholder="City"
              />
              {errors.city && touched.city && (
                <p className="text-sm text-destructive">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Province</Label>
              <Field
                as={Input}
                name="province"
                placeholder="Province"
              />
              {errors.province && touched.province && (
                <p className="text-sm text-destructive">{errors.province}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Postal Code</Label>
            <Field
              as={Input}
              name="postalCode"
              placeholder="Postal code"
            />
            {errors.postalCode && touched.postalCode && (
              <p className="text-sm text-destructive">{errors.postalCode}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Field
              type="checkbox"
              name="isDefault"
              as={Checkbox}
              id="isDefault"
            />
            <Label htmlFor="isDefault">Set as default address</Label>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit">Save Address</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}