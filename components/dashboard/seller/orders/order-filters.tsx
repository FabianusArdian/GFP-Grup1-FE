"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RotateCcw } from "lucide-react";

interface OrderFiltersProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export function OrderFilters({ filter, onFilterChange }: OrderFiltersProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 lg:px-3"
            onClick={() => onFilterChange("all")}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Status</Label>
            <RadioGroup
              value={filter}
              onValueChange={onFilterChange}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Orders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="processing" id="processing" />
                <Label htmlFor="processing">Processing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="completed" />
                <Label htmlFor="completed">Completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cancelled" id="cancelled" />
                <Label htmlFor="cancelled">Cancelled</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </Card>
  );
}