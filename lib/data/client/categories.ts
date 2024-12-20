"use client";

import { categories as serverCategories } from "../server/categories";
export type { CategoryInfo } from "../server/categories";

// Re-export for client components
export const categories = serverCategories;