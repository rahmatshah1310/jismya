import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Skeleton className="w-full h-96 rounded-lg mb-4" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-20 h-20 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/3 h-8" />
        <Skeleton className="w-full h-12 rounded-lg" />
        <Skeleton className="w-full h-32 rounded-lg" />
      </div>
    </div>
  );
}

export function CarouselSkeleton() {
  return (
    <div className="flex justify-center items-center w-full py-8">
      <div className="relative w-full  h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden shadow-2xl">
        {/* Image area */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        {/* Overlay mimic */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content placeholders */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="h-8 md:h-12 w-3/4 max-w-lg bg-white/80 rounded-xl animate-pulse mb-4"></div>
          <div className="h-4 w-2/3 max-w-md bg-white/70 rounded-xl animate-pulse mb-6"></div>
          <div className="h-10 w-40 bg-white/80 rounded-2xl animate-pulse"></div>
        </div>

        {/* Pagination dots placeholder */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-20">
          <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></span>
        </div>

        {/* Nav buttons placeholder */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 animate-pulse z-20"></div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 animate-pulse z-20"></div>
      </div>
    </div>
  );
}

export function ProductSwiperSkeleton({ count = 6 }) {
  return (
    <div className="w-full max-w-7xl">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Swiper container skeleton */}
      <div className="relative w-full group/carousel">
        <div className="w-full overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: count }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-72">
                <div className="h-80 bg-gray-200 rounded-xl animate-pulse mb-3"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows skeleton */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(count / 3) }).map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
