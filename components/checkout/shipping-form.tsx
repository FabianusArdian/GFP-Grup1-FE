"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const shippingSchema = Yup.object().shape({
  addressId: Yup.string().required('Please select an address'),
  name: Yup.string().when('addressId', {
    is: 'new',
    then: (schema) => schema.required('Name is required'),
  }),
  phone: Yup.string().when('addressId', {
    is: 'new',
    then: (schema) => schema.required('Phone is required'),
  }),
  address: Yup.string().when('addressId', {
    is: 'new',
    then: (schema) => schema.required('Address is required'),
  }),
  city: Yup.string().when('addressId', {
    is: 'new',
    then: (schema) => schema.required('City is required'),
  }),
  province: Yup.string().when('addressId', {
    is: 'new',
    then: (schema) => schema.required('Province is required'),
  }),
  postalCode: Yup.string().when('addressId', {
    is: 'new',
    then: (schema) => schema.required('Postal code is required'),
  }),
  notes: Yup.string(),
});

// Sample saved addresses
const savedAddresses = [
  {
    id: "1",
    label: "Home",
    name: "John Doe",
    phone: "081234567890",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12345",
  },
  {
    id: "2",
    label: "Office",
    name: "John Doe",
    phone: "081234567891",
    address: "Jl. Gatot Subroto No. 456",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12346",
  },
];

export function ShippingForm() {
  const [useNewAddress, setUseNewAddress] = useState(false);

  return (
    <Formik
      initialValues={{
        addressId: savedAddresses[0]?.id || 'new',
        name: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        notes: "",
      }}
      validationSchema={shippingSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <Label>Select Shipping Address</Label>
            <RadioGroup
              defaultValue={values.addressId}
              onValueChange={(value) => {
                setFieldValue('addressId', value);
                setUseNewAddress(value === 'new');
              }}
            >
              <div className="grid gap-4">
                {savedAddresses.map((addr) => (
                  <div key={addr.id} className="flex items-start space-x-4">
                    <RadioGroupItem value={addr.id} id={addr.id} />
                    <Label htmlFor={addr.id} className="flex-1 cursor-pointer">
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{addr.label}</span>
                        </div>
                        <p className="text-sm">{addr.name}</p>
                        <p className="text-sm">{addr.phone}</p>
                        <p className="text-sm text-muted-foreground">
                          {addr.address}, {addr.city}, {addr.province} {addr.postalCode}
                        </p>
                      </Card>
                    </Label>
                  </div>
                ))}

                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="flex-1 cursor-pointer">
                    <Card className="p-4">
                      <span className="font-medium">Add New Address</span>
                    </Card>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {useNewAddress && (
            <div className="space-y-4 border-t pt-4">
              {/* New address form fields remain the same */}
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
                  as={Textarea}
                  name="address"
                  placeholder="Street address"
                />
                {errors.address && touched.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
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
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Field
              as={Textarea}
              name="notes"
              placeholder="Additional notes for delivery"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}