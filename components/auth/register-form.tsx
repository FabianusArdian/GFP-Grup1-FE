"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { register } from "@/lib/services/auth";

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "consumer",
};

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const user = await register(values);

      toast({
        title: "Registration successful",
        description: `Welcome ${user.name}! You can now login to your account.`,
      });

      router.push("/auth/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Field
              as={Input}
              name="name"
              placeholder="Enter your full name"
            />
            {errors.name && touched.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Field
              as={Input}
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Field
              as={Input}
              name="password"
              type="password"
              placeholder="Create a password"
            />
            {errors.password && touched.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Field
              as={Input}
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Account Type</Label>
            <Select
              onValueChange={(value) => setFieldValue("role", value)}
              defaultValue={initialValues.role}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consumer">Consumer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && touched.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}