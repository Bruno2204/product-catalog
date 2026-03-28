import { useEffect, useState } from 'react';
import type { CategoryResults, Product } from '../types';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from '../api/products.ts';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<CategoryResults[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.products);
    });
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleSearch = () => {
    if (selectedCategory) {
      getProductsByCategory(selectedCategory).then((res) => {
        setProducts(res.products);
      });
    } else {
      getProducts().then((res) => {
        setProducts(res.products);
      });
    }
  };
  return (
    <main className='px-5 mt-5'>
      <section className='flex justify-center gap-5 *:border *:border-gray-200 *:rounded-lg *:p-2 mb-5'>
        <input type='text' placeholder='Search' />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className=' *:text-black'
        >
          <option value=''>All</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className='cursor-pointer'>
          Search
        </button>
      </section>
      <section className='products-grid grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full place-items-center gap-5'>
        {products.map((product) => (
          <article
            key={product.id}
            className='flex flex-col items-center justify-around border border-gray-200 rounded-lg aspect-square w-48'
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className='size-24'
            />
            <div className='flex flex-col'>
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <button className='bg-blue-500 rounded-lg mx-auto px-2 cursor-pointer'>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
