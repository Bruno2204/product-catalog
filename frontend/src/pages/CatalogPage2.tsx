import { useEffect, useState } from 'react';
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from '../api/products';
import type { CategoryResults, Product } from '../types';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const LIMIT = 12;

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryResults[]>([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch categories once
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Debounce search — wait 400ms after typing stops
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setSkip(0);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset page when category changes
  useEffect(() => {
    setSkip(0);
  }, [category]);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    const params = { limit: LIMIT, skip };

    const req = query
      ? searchProducts(query, params)
      : category
        ? getProductsByCategory(category, params)
        : getProducts(params);

    req
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .finally(() => setLoading(false));
  }, [query, category, skip]);

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.floor(skip / LIMIT) + 1;

  return (
    <main className='max-w-6xl mx-auto px-4 py-8 '>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>Products</h1>
        <p className='text-sm text-gray-400 mt-1'>
          {loading ? 'Loading...' : `${total} items found`}
        </p>
      </div>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-3 mb-8'>
        <input
          type='text'
          placeholder='Search products...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 sm:w-52 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
        >
          <option value=''>All categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </option>
          ))}
        </select>

        {(search || category) && (
          <button
            onClick={() => {
              setSearch('');
              setCategory('');
              setSkip(0);
            }}
            className='px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap'
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {loading ? (
          Array.from({ length: LIMIT }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))
        ) : products.length > 0 ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <div className='col-span-full py-20 text-center text-gray-400'>
            No products found for &ldquo;{query || category}&rdquo;
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className='flex items-center justify-center gap-3 mt-10'>
          <button
            onClick={() => setSkip((s) => Math.max(0, s - LIMIT))}
            disabled={skip === 0}
            className='px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer'
          >
            Previous
          </button>
          <span className='text-sm text-gray-500'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setSkip((s) => s + LIMIT)}
            disabled={skip + LIMIT >= total}
            className='px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer'
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

/* 
**Checklist before moving on:**

✓ 12 skeleton cards pulse while loading
✓ 4-column grid on desktop, collapses on mobile
✓ "Add to cart" turns green "Added ✓", Navbar badge updates
✓ Search debounces — API called after 400ms pause
✓ Category filter works, "Clear filters" resets both
✓ Pagination Previous/Next work correctly
✓ Empty state message appears for no results

*/
