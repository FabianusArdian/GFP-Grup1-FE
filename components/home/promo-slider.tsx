"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const promos = [
  {
    id: 1,
    title: "Summer Fresh Deals",
    description: "Get up to 30% off on fresh local produce",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    title: "Organic Collection",
    description: "Discover our premium organic selection",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    title: "Local Artisans",
    description: "Support your local food artisans",
    image: "https://images.unsplash.com/photo-1536510233921-8e5043fce771?auto=format&fit=crop&q=80&w=2000",
  },
];

export function PromoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {promos.map((promo) => (
          <div
            key={promo.id}
            className="relative h-full w-full flex-shrink-0"
            style={{
              backgroundImage: `url(${promo.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{promo.title}</h3>
              <p className="mt-2 text-sm sm:text-base md:text-lg max-w-md">{promo.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={() => setCurrent((prev) => (prev - 1 + promos.length) % promos.length)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40"
        onClick={() => setCurrent((prev) => (prev + 1) % promos.length)}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {promos.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              current === index ? "bg-white" : "bg-white/50"
            )}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}