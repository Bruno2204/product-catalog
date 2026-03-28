export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductQueryParams {
  limit?: number;
  skip?: number;
  search?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews: Review[];
  returnPolicy: ReturnPolicy;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export enum AvailabilityStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
}

export enum Category {
  Beauty = 'beauty',
  Fragrances = 'fragrances',
  Furniture = 'furniture',
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export enum ReturnPolicy {
  NoReturnPolicy = 'No return policy',
  The7DaysReturnPolicy = '7 days return policy',
  The90DaysReturnPolicy = '90 days return policy',
}

export interface Review {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
export interface CategoryResults {
  slug: string;
  name: string;
  url: string;
}
