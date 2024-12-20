import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SellerGrid } from '@/components/sellers/seller-grid';
import { SellerFilters } from '@/components/sellers/seller-filters';

export default function SellersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 py-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <aside className="w-full md:w-64 lg:w-72">
              <SellerFilters />
            </aside>
            <div className="flex-1">
              <SellerGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}