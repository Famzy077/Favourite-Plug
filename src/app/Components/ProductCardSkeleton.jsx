import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="overflow-hidden bg-white border border-gray-300 rounded-lg shadow">
        {/* Image Skeleton */}
        <div className="flex justify-center w-full py-3 overflow-hidden bg-white h-[148px] max-sm:h-[124px]">
          <Skeleton width={120} height={120} className="max-sm:!h-[100px] max-sm:!w-[100px]" />
        </div>
        
        {/* Content Skeleton */}
        <div className="p-4 pb-2 bg-gray-200 max-sm:py-2">
          {/* Product Name */}
          <Skeleton height={16} width="75%" className="mb-2" />
          
          {/* Price */}
          <Skeleton height={16} width="50%" className="mb-2" />
          
          {/* Button */}
          <Skeleton height={32} width="100%" className="mt-2" borderRadius={6} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
