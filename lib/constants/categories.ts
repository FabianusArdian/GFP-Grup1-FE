import { 
  Beef, 
  Apple, 
  Wheat, 
  Fish, 
  Coffee, 
  Milk 
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "fresh-produce",
    name: "Fresh Produce",
    icon: Apple,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/50",
  },
  {
    id: "meat-poultry",
    name: "Meat & Poultry",
    icon: Beef,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/50",
  },
  {
    id: "bakery",
    name: "Bakery",
    icon: Wheat,
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    id: "seafood",
    name: "Seafood",
    icon: Fish,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: Coffee,
    color: "text-brown-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/50",
  },
  {
    id: "dairy",
    name: "Dairy",
    icon: Milk,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/50",
  },
] as const;

export type CategoryId = typeof CATEGORIES[number]["id"];