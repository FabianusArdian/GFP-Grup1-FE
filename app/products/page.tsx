import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <aside className="w-full md:w-64 lg:w-72">
              <ProductFilters />
            </aside>
            <div className="flex-1">
              <ProductGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}