"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function NotificationSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    reviews: true,
    promotions: false,
    newsletter: false,
  });

  const handleSave = () => {
    // Handle saving notification settings
    console.log(settings);
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>New Orders</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications when you get new orders
            </p>
          </div>
          <Switch
            checked={settings.newOrders}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, newOrders: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Order Updates</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about order status changes
            </p>
          </div>
          <Switch
            checked={settings.orderUpdates}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, orderUpdates: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Low Stock Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Receive alerts when products are running low
            </p>
          </div>
          <Switch
            checked={settings.lowStock}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, lowStock: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Customer Reviews</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about new product reviews
            </p>
          </div>
          <Switch
            checked={settings.reviews}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, reviews: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Promotions</Label>
            <p className="text-sm text-muted-foreground">
              Receive updates about promotional features
            </p>
          </div>
          <Switch
            checked={settings.promotions}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, promotions: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Newsletter</Label>
            <p className="text-sm text-muted-foreground">
              Subscribe to our seller newsletter
            </p>
          </div>
          <Switch
            checked={settings.newsletter}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, newsletter: checked }))
            }
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
}