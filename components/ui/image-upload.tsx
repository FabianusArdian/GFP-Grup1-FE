"use client";

import { useState } from "react";
import { Button } from "./button";
import { ImageWithFallback } from "./image-with-fallback";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(url);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative w-32 h-32">
          <ImageWithFallback
            src={preview}
            alt="Preview"
            fill
            className="rounded-lg"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground text-center">
              Click to upload
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}