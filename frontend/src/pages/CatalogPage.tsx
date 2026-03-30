import { Filters } from '../components/catalog/Filters.tsx';
import { ProductsGrid } from '../components/catalog/ProductsGrid.tsx';
import { Pagination } from '../components/catalog/Pagination.tsx';
import { CatalogHeader } from '../components/catalog/CatalogHeader.tsx';

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
