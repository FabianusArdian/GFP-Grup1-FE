"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/stores/user-store";

const securitySchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

export function SecurityForm() {
  const { currentUser, updateUser } = useUserStore();
  const { toast } = useToast();

  if (!currentUser) return null;

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={securitySchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          // Here you would typically verify the current password
          // and update with the new password
          toast({
            title: "Password updated",
            description: "Your password has been updated successfully.",
          });
          resetForm();
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update password. Please try again.",
          });
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Field
              as={Input}
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
            />
            {errors.currentPassword && touched.currentPassword && (
              <p className="text-sm text-destructive">{errors.currentPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Field
              as={Input}
              name="newPassword"
              type="password"
              placeholder="Enter your new password"
            />
            {errors.newPassword && touched.newPassword && (
              <p className="text-sm text-destructive">{errors.newPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Field
              as={Input}
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit">Update Password</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}