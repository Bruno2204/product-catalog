import api from './axios.ts';
import type {
  CategoryResults,
  Product,
  ProductQueryParams,
  ProductsResponse,
} from '../types';

// GET /products?limit=12&skip=0
export async function getProducts(
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0 } = params;
  const response = await api.get<ProductsResponse>('/products', {
    params: { limit, skip },
  });
  return response.data;
}

// GET /products/search?q=phone
export async function searchProducts(
  query: string,
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0 } = params;
  const response = await api.get<ProductsResponse>('/products/search', {
    params: { q: query, limit, skip },
  });
  return response.data;
}

// GET /products/:id
export async function getProduct(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

// GET /products/categories
export async function getCategories(): Promise<CategoryResults[]> {
  const response = await api.get<CategoryResults[]>('/products/categories');
  return response.data;
}

// GET /products/category/:name
export async function getProductsByCategory(
  category: string,
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 12, skip = 0 } = params;
  const response = await api.get<ProductsResponse>(
    `/products/category/${category}`,
    { params: { limit, skip } },
  );
  return response.data;
}
