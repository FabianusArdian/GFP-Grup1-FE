"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useFilters } from "@/lib/hooks/use-filters";
import { 
  Beef, 
  Apple, 
  Wheat, 
  Fish, 
  Coffee, 
  Milk 
} from "lucide-react";

const categories = [
  {
    id: "meat-poultry",
    name: "Meat & Poultry",
    icon: Beef,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/50",
  },
  {
    id: "fresh-produce",
    name: "Fresh Produce",
    icon: Apple,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/50",
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
];

export function CategoryShowcase() {
  const router = useRouter();
  const { setFilter } = useFilters();

  const handleCategoryClick = (categoryId: string) => {
    // Reset all filters first
    setFilter('priceRange', [0, 1000000]);
    setFilter('types', []);
    setFilter('minRating', 0);
    setFilter('search', '');
    
    // Set the selected category
    setFilter('categories', [categoryId]);
    
    // Navigate to products page
    router.push('/products');
  };

  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight mb-8">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className={`p-6 flex flex-col items-center gap-4 ${category.bgColor}`}>
              <category.icon className={`h-8 w-8 ${category.color} transition-transform group-hover:scale-110`} />
              <span className="text-sm font-medium text-center">{category.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}