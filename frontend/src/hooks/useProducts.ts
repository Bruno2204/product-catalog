import { useEffect } from 'react';
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from '@/api/products.ts';
import { LIMIT } from '@/consts.ts';
import { useProductsStore } from '@/store/useProducsStore.ts';

export function useProducts() {
  const products = useProductsStore((s) => s.products);
  const categories = useProductsStore((s) => s.categories);
  const category = useProductsStore((s) => s.category);
  const search = useProductsStore((s) => s.search);
  const query = useProductsStore((s) => s.query);
  const total = useProductsStore((s) => s.total);
  const skip = useProductsStore((s) => s.skip);
  const loading = useProductsStore((s) => s.loading);

  const setProducts = useProductsStore((s) => s.setProducts);
  const setCategories = useProductsStore((s) => s.setCategories);
  const setCategory = useProductsStore((s) => s.setCategory);
  const setSearch = useProductsStore((s) => s.setSearch);
  const setQuery = useProductsStore((s) => s.setQuery);
  const setTotal = useProductsStore((s) => s.setTotal);
  const setSkip = useProductsStore((s) => s.setSkip);
  const setLoading = useProductsStore((s) => s.setLoading);

  // Fetch categories once on mount
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Debounce search — only update query 400ms after typing stops
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setSkip(0);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setSkip(0);
  }, [category]);

  // Fetch products whenever query, category, or page changes
  useEffect(() => {
    setLoading(true);
    const params = { skip };

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

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setSkip(0);
  };

  return {
    products,
    loading,
    query,
    categories,
    category,
    search,
    setSearch,
    setCategory,
    skip,
    setSkip,
    total,
    totalPages,
    currentPage,
    handleClearFilters,
  };
}
