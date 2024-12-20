"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { useToast } from "@/hooks/use-toast";

const storeSchema = Yup.object().shape({
  storeName: Yup.string().required("Store name is required"),
  description: Yup.string().required("Store description is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  profileImage: Yup.string(),
});

export function StoreSettings() {
  const { toast } = useToast();

  return (
    <Formik
      initialValues={{
        storeName: "Green Valley Farm",
        description: "Fresh organic produce from local farmers",
        phone: "081234567890",
        email: "contact@greenvalley.com",
        address: "Jl. Sudirman No. 123",
        city: "Jakarta",
        province: "DKI Jakarta",
        profileImage: "",
      }}
      validationSchema={storeSchema}
      onSubmit={async (values) => {
        try {
          // Handle form submission
          console.log(values);
          toast({
            title: "Store settings updated",
            description: "Your store information has been updated successfully.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update store settings. Please try again.",
          });
        }
      }}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <Label>Store Profile Image</Label>
            <ImageUpload
              value={values.profileImage}
              onChange={(url) => setFieldValue("profileImage", url)}
            />
            {errors.profileImage && touched.profileImage && (
              <p className="text-sm text-destructive">{errors.profileImage}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Store Name</Label>
            <Field
              as={Input}
              name="storeName"
              placeholder="Enter your store name"
            />
            {errors.storeName && touched.storeName && (
              <p className="text-sm text-destructive">{errors.storeName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Field
              as={Textarea}
              name="description"
              placeholder="Describe your store"
            />
            {errors.description && touched.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Field
                as={Input}
                name="phone"
                placeholder="Store phone number"
              />
              {errors.phone && touched.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Field
                as={Input}
                name="email"
                type="email"
                placeholder="Store email address"
              />
              {errors.email && touched.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Field
              as={Textarea}
              name="address"
              placeholder="Store address"
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

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}