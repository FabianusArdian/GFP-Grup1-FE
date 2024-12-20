import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Register - Local Food Market",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-[400px] p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Join Local Food Market to start shopping or selling
              </p>
            </div>

            <RegisterForm />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?
              </p>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Login to Your Account
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}