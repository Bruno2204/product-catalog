import { Filters } from './Filters.tsx';
import { ProductsGrid } from './ProductsGrid.tsx';
import { Pagination } from './Pagination.tsx';
import { CatalogHeader } from './CatalogHeader.tsx';

export default function CatalogPage() {
  return (
    <main className='max-w-6xl mx-auto px-4 py-8 '>
      <CatalogHeader />

      <Filters />

      <ProductsGrid />

      <Pagination />
    </main>
  );
}
