export function FeaturesSection() {
  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to discover and purchase local food products.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <FeatureCard
          title="Local Products"
          description="Browse and buy from local food producers in your area."
        />
        <FeatureCard
          title="Secure Payments"
          description="Safe and secure payment processing for all transactions."
        />
        <FeatureCard
          title="Reviews & Ratings"
          description="Read and write reviews to help others make informed decisions."
        />
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <div className="space-y-2">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}