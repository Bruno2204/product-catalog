import type { Product } from '../../types.d.ts';
import { AddToCart } from '../AddToCartButton.tsx';

export function ProductDetails({ product }: { product: Product }) {
  const outOfStock = product.stock === 0;
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className='flex flex-col gap-5'>
      {/* Category */}
      <span className='text-xs text-gray-400 uppercase tracking-wide'>
        {product.category}
      </span>

      {/* Title */}
      <h1 className='text-2xl font-semibold text-gray-900 leading-snug'>
        {product.title}
      </h1>

      {/* Rating + stock */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1'>
          <span className='text-amber-400 text-sm'>
            {'★'.repeat(Math.round(product.rating))}
          </span>
          <span className='text-sm text-gray-400'>
            ({product.rating.toFixed(1)})
          </span>
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            outOfStock
              ? 'bg-red-100 text-red-600'
              : product.stock < 10
                ? 'bg-amber-100 text-amber-700'
                : 'bg-green-100 text-green-700'
          }`}
        >
          {outOfStock
            ? 'Out of stock'
            : product.stock < 10
              ? `Only ${product.stock} left`
              : 'In stock'}
        </span>
      </div>

      {/* Price */}
      <div className='flex items-baseline gap-3'>
        <span className='text-3xl font-bold text-gray-900'>
          ${discountedPrice.toFixed(2)}
        </span>
        {product.discountPercentage > 0 && (
          <>
            <span className='text-lg text-gray-400 line-through'>
              ${product.price.toFixed(2)}
            </span>
            <span className='text-sm font-medium text-green-600'>
              -{product.discountPercentage.toFixed(0)}%
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <p className='text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-5'>
        {product.description}
      </p>

      {/* Brand */}
      <p className='text-sm text-gray-400'>
        Brand:{' '}
        <span className='text-gray-700 font-medium'>{product.brand}</span>
      </p>

      {/* Quantity + Add to cart */}
      <div className='flex items-center gap-3 pt-2'>
        {/* Quantity selector */}
        <AddToCart product={product} />
        {/* Add to cart button */}
      </div>
    </div>
  );
}
