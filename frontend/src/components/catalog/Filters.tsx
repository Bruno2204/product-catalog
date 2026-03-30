import { ChevronDown } from '@/components/Icons.tsx';
import { useProductsStore } from '@/store/useProducsStore.ts';
import { useEffect, useState } from 'react';

export function Filters() {
  const { search, category, setSearch, setCategory, clearFilters, categories } =
    useProductsStore();

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => {
      // Solo actualizamos el store global después de 400ms
      setSearch(localSearch);
    }, 400);

    return () => clearTimeout(t);
  }, [localSearch, setSearch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <div className='flex flex-col sm:flex-row gap-3 mb-8'>
      <input
        type='text'
        placeholder='Search products...'
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className='flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
      />

      <div className='relative'>
        <select
          value={category?.slug}
          onChange={(e) => setCategory(e.target.value)}
          className='px-2 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 sm:w-52 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none'
        >
          <option value=''>All categories</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center'>
          <ChevronDown />
        </div>
      </div>

      {(search || category) && (
        <button
          onClick={() => clearFilters()}
          className='px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap'
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
