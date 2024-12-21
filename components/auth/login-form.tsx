"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
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
import { login } from "@/lib/services/auth";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  role: "consumer",
};

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const user = await login(values);

      toast({
        title: "Login berhasil",
        description: `Selamat datang kembali, ${user.name}!`,
      });

      // Redirect based on user role
      if (user.role === "seller") {
        router.push("/dashboard");
      } else {
        router.push("/account");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat login",
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
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
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
              placeholder="email@example.com"
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
              placeholder="********"
            />
            {errors.password && touched.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}