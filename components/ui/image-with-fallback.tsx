"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "src"> {
  src: string | null;
  fallbackSrc?: string;
}

export function ImageWithFallback({ 
  src, 
  fallbackSrc = "/images/placeholder.jpg",
  alt,
  className,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setError(true);
    setImageSrc(fallbackSrc);
  };

  return (
    <Image
      {...props}
      src={error ? fallbackSrc : (imageSrc || fallbackSrc)}
      alt={alt}
      className={cn("object-cover", className)}
      onError={handleError}
    />
  );
}