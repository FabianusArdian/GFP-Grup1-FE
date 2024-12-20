"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/stores/user-store";
import { ProfileForm } from "./profile-form";
import { SecurityForm } from "./security-form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function ProfileSettings() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <ProfileForm />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <SecurityForm />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}