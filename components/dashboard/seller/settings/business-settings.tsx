"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const businessSchema = Yup.object().shape({
  businessName: Yup.string().required("Business name is required"),
  taxId: Yup.string().required("Tax ID is required"),
  bankName: Yup.string().required("Bank name is required"),
  accountNumber: Yup.string().required("Account number is required"),
  accountHolder: Yup.string().required("Account holder name is required"),
});

export function BusinessSettings() {
  const { toast } = useToast();

  return (
    <Formik
      initialValues={{
        businessName: "Green Valley Farm Corporation",
        taxId: "123456789",
        bankName: "Bank Central Asia",
        accountNumber: "1234567890",
        accountHolder: "John Doe",
      }}
      validationSchema={businessSchema}
      onSubmit={async (values) => {
        try {
          // Handle form submission
          console.log(values);
          toast({
            title: "Business settings updated",
            description: "Your business information has been updated successfully.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update business settings. Please try again.",
          });
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label>Business Name</Label>
            <Field
              as={Input}
              name="businessName"
              placeholder="Enter your business name"
            />
            {errors.businessName && touched.businessName && (
              <p className="text-sm text-destructive">{errors.businessName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tax ID</Label>
            <Field
              as={Input}
              name="taxId"
              placeholder="Enter your tax ID"
            />
            {errors.taxId && touched.taxId && (
              <p className="text-sm text-destructive">{errors.taxId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Bank Name</Label>
            <Field
              as={Input}
              name="bankName"
              placeholder="Enter your bank name"
            />
            {errors.bankName && touched.bankName && (
              <p className="text-sm text-destructive">{errors.bankName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Field
                as={Input}
                name="accountNumber"
                placeholder="Enter your account number"
              />
              {errors.accountNumber && touched.accountNumber && (
                <p className="text-sm text-destructive">{errors.accountNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Account Holder Name</Label>
              <Field
                as={Input}
                name="accountHolder"
                placeholder="Enter account holder name"
              />
              {errors.accountHolder && touched.accountHolder && (
                <p className="text-sm text-destructive">{errors.accountHolder}</p>
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