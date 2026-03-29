import { Filters } from './Filters.tsx';
import { ProductsGrid } from './ProductsGrid.tsx';
import { Pagination } from './Pagination.tsx';
import { CatalogHeader } from './CatalogHeader.tsx';
import { useEffect } from 'react';
import { getCategories, getProducts } from '@/api/products.ts';
import { useProductsStore } from '@/store/useProducsStore.ts';

export default function CatalogPage() {
  const setProducts = useProductsStore((s) => s.setProducts);
  const setCategories = useProductsStore((s) => s.setCategories);
  // Fetch categories once on mount
  useEffect(() => {
    getCategories().then(setCategories);
    getProducts().then((res) => setProducts(res.products));
  }, []);
  return (
    <main className='max-w-6xl mx-auto px-4 py-8 '>
      <CatalogHeader />

      <Filters />

      <ProductsGrid />

      <Pagination />
    </main>
  );
}
