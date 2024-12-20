"use client";

import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { StoreSettings } from "./store-settings";
import { BusinessSettings } from "./business-settings";
import { NotificationSettings } from "./notification-settings";

export function SellerSettings() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Store Information</TabsTrigger>
          <TabsTrigger value="business">Business Details</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card className="p-6">
            <StoreSettings />
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card className="p-6">
            <BusinessSettings />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <NotificationSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}