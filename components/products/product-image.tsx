"use client";

import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface ProductImageProps {
  src: string;
  alt: string;
  type: string;
  className?: string;
}

export function ProductImage({ src, alt, type, className = "" }: ProductImageProps) {
  return (
    <div className={`relative ${className}`}>
      <ImageWithFallback
        src={src}
        alt={alt}
        fill
        className="transition-transform group-hover:scale-105"
      />
      <div className="absolute top-2 right-2">
        <Badge 
          variant={type === 'premium' ? 'default' : 'secondary'} 
          className="capitalize"
        >
          {type}
        </Badge>
      </div>
    </div>
  );
}