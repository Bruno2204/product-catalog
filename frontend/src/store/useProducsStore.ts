import { LIMIT } from '@/consts.ts';
import type { CategoryResults, Product } from '@/types.js';
import { create } from 'zustand';

interface ProductsState {
  allProducts: Product[];
  categories: CategoryResults[];

  // Filter state
  search: string;
  category: CategoryResults | null;
  page: number;

  // UI state
  loading: boolean;
  error: string | null;

  // Derived — computed from allProducts + filters
  filtered: Product[];
  paginated: Product[];
  totalPages: number;
  totalProducts: number;

  setProducts: (products: Product[]) => void;
  setCategories: (categories: CategoryResults[]) => void;
  setCategory: (slug: string) => void;
  setSearch: (search: string) => void;
  startLoading: () => void;
  stopLoading: () => void;
  setError: (error: string | null) => void;

  nextPage: () => void;
  prevPage: () => void;
  clearFilters: () => void;
}

function applyFilters(
  products: Product[],
  search: string,
  category: string,
): Product[] {
  let result = products;

  if (category !== '') {
    result = result.filter((p) => {
      return p.category === category;
    });
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(q));
  }

  return result;
}

function filterProducts(products: Product[], search: string, category: string) {
  const filtered = applyFilters(products, search, category);
  const totalPages = Math.ceil(filtered.length / LIMIT);
  const totalProducts = filtered.length;
  return { filtered, totalPages, totalProducts };
}

function paginateProducts(filtered: Product[], page: number) {
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT);
  return paginated;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  allProducts: [],
  categories: [],
  search: '',
  category: null,
  page: 1,
  totalPages: 0,
  totalProducts: 0,
  loading: false,
  error: null,
  filtered: [],
  paginated: [],

  setCategories: (categories: CategoryResults[]) => set({ categories }),

  startLoading: () => set({ loading: true }),
  stopLoading: () => set({ loading: false }),
  setError: (error: string | null) => set({ error }),

  setProducts: (allProducts: Product[]) => {
    const { search, category } = get();
    const { filtered, totalPages, totalProducts } = filterProducts(
      allProducts,
      search,
      category?.slug || '',
    );
    set({
      allProducts,
      filtered,
      totalPages,
      totalProducts,
      page: 1,
      paginated: paginateProducts(filtered, 1),
    });
  },

  setCategory: (slug: string) => {
    const { allProducts, search, categories } = get();
    const categoryObj = slug
      ? (categories.find((c) => c.slug === slug) ?? null)
      : null;
    const { filtered, totalPages, totalProducts } = filterProducts(
      allProducts,
      search,
      categoryObj?.slug || '',
    );

    set({
      category: categoryObj,
      filtered,
      totalPages,
      totalProducts,
      page: 1,
      paginated: paginateProducts(filtered, 1),
    });
  },

  prevPage: () => {
    const { page, filtered } = get();
    if (page > 1) {
      const paginated = paginateProducts(filtered, page - 1);
      set({ page: page - 1, paginated });
    }
  },

  nextPage: () => {
    const { page, totalPages, filtered } = get();
    if (page < totalPages) {
      const paginated = paginateProducts(filtered, page + 1);
      set({ page: page + 1, paginated });
    }
  },

  clearFilters: () => {
    const { allProducts } = get();
    const { filtered, totalPages, totalProducts } = filterProducts(
      allProducts,
      '',
      '',
    );
    set({
      search: '',
      category: null,
      filtered,
      totalPages,
      totalProducts,
      page: 1,
      paginated: paginateProducts(filtered, 1),
    });
  },

  setSearch: (search: string) => {
    const { allProducts, category } = get();
    const { filtered, totalPages, totalProducts } = filterProducts(
      allProducts,
      search,
      category?.slug || '',
    );
    set({
      search,
      filtered,
      totalPages,
      totalProducts,
      page: 1,
      paginated: paginateProducts(filtered, 1),
    });
  },
}));
