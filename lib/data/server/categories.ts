import { PRODUCT_CATEGORIES, type ProductCategory } from './products';

export interface CategoryInfo {
  name: ProductCategory;
  description: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  {
    name: "Fresh Produce",
    description: "Sayuran dan buah-buahan segar dari petani lokal",
    icon: "🥬"
  },
  {
    name: "Dairy",
    description: "Produk susu dan olahan susu berkualitas",
    icon: "🥛"
  },
  {
    name: "Bakery",
    description: "Roti dan kue artisan yang dibuat fresh setiap hari",
    icon: "🥖"
  },
  {
    name: "Beverages",
    description: "Minuman premium dan specialty",
    icon: "☕"
  },
  {
    name: "Meat & Poultry",
    description: "Daging segar berkualitas premium",
    icon: "🥩"
  },
  {
    name: "Condiments",
    description: "Bumbu dan sambal tradisional",
    icon: "🌶️"
  },
  {
    name: "Ready to Eat",
    description: "Makanan siap saji berkualitas",
    icon: "🍱"
  },
  {
    name: "Snacks",
    description: "Camilan tradisional dan modern",
    icon: "🍘"
  },
  {
    name: "Breakfast",
    description: "Pilihan sarapan sehat dan bergizi",
    icon: "🥣"
  }
];