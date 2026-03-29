import ProductCard from '@/components/ProductCard.tsx';
import ProductSkeleton from '@/components/ProductSkeleton.tsx';
import { LIMIT } from '@/consts.ts';
import { useProducts } from '@/hooks/useProducts.ts';

export function ProductsGrid() {
  const { products, loading, query, category } = useProducts();
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {loading ? (
        Array.from({ length: LIMIT }).map((_, i) => <ProductSkeleton key={i} />)
      ) : products.length > 0 ? (
        products.map((p) => <ProductCard key={p.id} product={p} />)
      ) : (
        <div className='col-span-full py-20 text-center text-gray-400'>
          No products found for "{query || category}"
        </div>
      )}
    </div>
  );
}
