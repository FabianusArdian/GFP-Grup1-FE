import { Seller } from './types/seller';

export const sellers: Seller[] = [
  {
    id: "1",
    name: "Green Valley Farm",
    description: "Peternakan organik dengan berbagai produk segar berkualitas premium. Menerapkan praktik pertanian berkelanjutan dan ramah lingkungan.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400",
    location: "Bogor",
    province: "Jawa Barat",
    category: "Farmers",
    joinedDate: new Date("2022-01-15"),
    totalProducts: 25,
    badges: ["Verified", "Organic Certified", "Premium Seller"]
  },
  {
    id: "2",
    name: "Artisan Bakery",
    description: "Bakery artisan dengan resep tradisional Eropa. Menggunakan bahan-bahan premium dan teknik authentic untuk menghasilkan roti berkualitas.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400",
    location: "Bandung",
    province: "Jawa Barat",
    category: "Bakers",
    joinedDate: new Date("2022-03-20"),
    totalProducts: 15,
    badges: ["Verified", "Premium Seller"]
  },
  {
    id: "3",
    name: "Mountain Apiaries",
    description: "Penghasil madu dan produk lebah premium dari pegunungan Indonesia. Praktik pemanenan berkelanjutan dengan kualitas terjamin.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400",
    location: "Malang",
    province: "Jawa Timur",
    category: "Farmers",
    joinedDate: new Date("2022-06-10"),
    totalProducts: 8,
    badges: ["Verified", "Eco-Friendly"]
  },
  {
    id: "4",
    name: "Premium Meats",
    description: "Spesialis daging premium dengan standar kualitas tertinggi. Sourcing langsung dari peternak terpilih dengan jaminan kualitas.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400",
    location: "Surabaya",
    province: "Jawa Timur",
    category: "Butchers",
    joinedDate: new Date("2022-04-05"),
    totalProducts: 12,
    badges: ["Verified", "Premium Seller", "Quality Guaranteed"]
  },
  {
    id: "5",
    name: "Dairy Master",
    description: "Produsen susu dan keju premium dengan standar internasional. Menggunakan susu dari sapi grass-fed untuk kualitas terbaik.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&q=80&w=400",
    location: "Yogyakarta",
    province: "DI Yogyakarta",
    category: "Dairy Producers",
    joinedDate: new Date("2022-02-28"),
    totalProducts: 18,
    badges: ["Verified", "Premium Seller"]
  },
  {
    id: "6",
    name: "Gayo Coffee Co",
    description: "Penghasil kopi specialty dari dataran tinggi Gayo. Praktik perdagangan langsung dengan petani untuk kualitas terbaik.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80&w=400",
    location: "Denpasar",
    province: "Bali",
    category: "Beverages",
    joinedDate: new Date("2022-05-15"),
    totalProducts: 10,
    badges: ["Verified", "Direct Trade", "Premium Seller"]
  }
];