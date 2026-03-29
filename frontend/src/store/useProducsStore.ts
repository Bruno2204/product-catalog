import type { CategoryResults, Product } from '@/types.js';
import { create } from 'zustand';

interface ProductsState {
  products: Product[];
  categories: CategoryResults[];
  category: string;
  search: string;
  query: string;
  total: number;
  skip: number;
  loading: boolean;

  setProducts: (products: Product[]) => void;
  setCategories: (categories: CategoryResults[]) => void;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setQuery: (query: string) => void;
  setTotal: (total: number) => void;
  setSkip: (skip: number) => void;
  setLoading: (loading: boolean) => void;
}
export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  categories: [],
  category: '',
  search: '',
  query: '',
  total: 0,
  skip: 0,
  loading: true,

  setProducts: (products: Product[]) => set({ products }),
  setCategories: (categories: CategoryResults[]) => set({ categories }),
  setCategory: (category: string) => set({ category }),
  setSearch: (search: string) => set({ search }),
  setQuery: (query: string) => set({ query }),
  setTotal: (total: number) => set({ total }),
  setSkip: (skip: number) => set({ skip }),
  setLoading: (loading: boolean) => set({ loading }),
}));
