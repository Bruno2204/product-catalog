import ProductCard from '@/components/catalog/ProductCard';
import ProductSkeleton from '@/components/catalog/ProductSkeleton';
import { LIMIT } from '@/consts.ts';
import { useProductsStore } from '@/store/useProducsStore.ts';

export function ProductsGrid() {
  const { paginated: products, loading, search, category } = useProductsStore();
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {loading ? (
        Array.from({ length: LIMIT }).map((_, i) => <ProductSkeleton key={i} />)
      ) : products.length > 0 ? (
        products.map((p) => <ProductCard key={p.id} product={p} />)
      ) : (
        <div className='col-span-full py-20 text-center text-gray-400'>
          No products found for "{search || category?.name}"
        </div>
      )}
    </div>
  );
}
