import { useProducts } from '@/hooks/useProducts.ts';

export function CatalogHeader() {
  const { loading, total } = useProducts();
  return (
    <div className='mb-8'>
      <h1 className='text-2xl font-semibold text-gray-900'>Products</h1>
      <p className='text-sm text-gray-400 mt-1'>
        {loading ? 'Loading...' : `${total} items found`}
      </p>
    </div>
  );
}
