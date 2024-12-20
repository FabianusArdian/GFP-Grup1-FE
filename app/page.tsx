"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PromoSlider } from '@/components/home/promo-slider';
import { FeaturedSections } from '@/components/home/featured-sections';
import { CategoryShowcase } from '@/components/home/category-showcase';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[2520px] mx-auto">
          {/* Full width slider */}
          <div className="xl:px-20 md:px-10 sm:px-6 px-4 py-8">
            <PromoSlider />
          </div>

          {/* Categories */}
          <div className="bg-accent/10 py-12">
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
              <CategoryShowcase />
            </div>
          </div>

          {/* Featured Sections */}
          <div className="py-12">
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
              <FeaturedSections />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}