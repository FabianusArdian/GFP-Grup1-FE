import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Your Local Food Market
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Discover and support local food producers. Fresh, authentic, and delivered to your doorstep.
        </p>
        <div className="space-x-4">
          <Link href="/market">
            <Button size="lg">Browse Market</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline">
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}