"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/lib/hooks/use-search";
import { useFilters } from "@/lib/hooks/use-filters";
import { useSellerFilters } from "@/lib/hooks/use-seller-filters";
import { useSellerProductFilters } from "@/lib/hooks/use-seller-product-filters";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SearchBar() {
  const pathname = usePathname();
  const { query, setQuery } = useSearch();
  const { setFilter: setProductFilter } = useFilters();
  const { setFilter: setSellerFilter } = useSellerFilters();
  const { setFilter: setSellerProductFilter } = useSellerProductFilters();

  // Sync search query with appropriate filter based on current page
  useEffect(() => {
    if (pathname.startsWith('/products')) {
      setProductFilter('search', query);
    } else if (pathname.startsWith('/sellers') && pathname.length === 8) {
      setSellerFilter('search', query);
    } else if (pathname.startsWith('/sellers/')) {
      setSellerProductFilter('search', query);
    }
  }, [query, pathname, setProductFilter, setSellerFilter, setSellerProductFilter]);

  return (
    <div className="relative flex w-full max-w-sm items-center">
      <SearchIcon className="absolute left-2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}