const LandingPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="flex gap-4">
            <div className="h-10 w-20 bg-muted animate-pulse rounded" />
            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="h-12 bg-muted animate-pulse rounded mx-auto w-3/4" />
          <div className="h-12 bg-muted animate-pulse rounded mx-auto w-2/3" />
          <div className="h-6 bg-muted animate-pulse rounded mx-auto w-1/2 mt-8" />
          <div className="flex gap-4 justify-center mt-8">
            <div className="h-12 w-32 bg-muted animate-pulse rounded" />
            <div className="h-12 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-12 w-12 bg-muted animate-pulse rounded" />
              <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-4 bg-muted animate-pulse rounded w-full" />
              <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPageSkeleton;
