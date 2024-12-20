"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/services/auth";
import { useUserStore } from "@/lib/stores/user-store";
import Cookies from 'js-cookie';
import { AUTH_CONFIG } from "@/lib/config/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ro } from "date-fns/locale";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  role: "consumer",
};

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleAuthResponse } = useUserStore();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await login(values);

      // // Handle successful login
      handleAuthResponse(response);

      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name}!`,
      });


      // Get redirect URL from query params or use default based on role
      const redirect = searchParams.get('redirect') ||
        (response.user.role === "seller" ? "/dashboard" : "/account");

      router.push(redirect);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              onValueChange={(value) => setFieldValue("role", value)}
              defaultValue={initialValues.role}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
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

          <div className="space-y-2">
            <Label>Email</Label>
            <Field
              as={Input}
              name="email"
              type="email"
              placeholder="Enter your email"
              disabled={isLoading}
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
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && touched.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
