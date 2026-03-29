import { useProductsStore } from '@/store/useProducsStore.ts';

export function CatalogHeader() {
  const { loading, totalProducts, search, category } = useProductsStore();
  return (
    <div className='mb-8'>
      <h1 className='text-2xl font-semibold text-gray-900'>Products</h1>
      <p className='text-sm text-gray-400 mt-1'>
        {loading
          ? 'Loading...'
          : `${totalProducts} items found` +
            (search || category
              ? ' for "' + (search || category?.name) + '"'
              : '')}
      </p>
    </div>
  );
}
